const express = require('express')
const router = express.Router()
const pool=require('../pool')
const {totalPriceList,getDefaultAddress,getLocalTime} = require('../common/common')

router.post('/orderprice',async function (req,res) {
    let orderProducts = JSON.parse(req.body.order_product)
    let data = await totalPriceList(orderProducts)
    let address = await getDefaultAddress()
    data.address = address;
    res.send(data)
})

router.post('/payorder',function (req,res) {
    let orderNo = req.body.orderNo;
    let tid = req.body.tid;
    let pay_time = (new Date()).getTime();
    let uid = 1
    let sql = "update table_order set order_status = 1 , pay_status = ? , pay_time = ? where order_no = ? and uid=?"
    pool.query(sql,[tid,pay_time,orderNo,uid],(err,result)=>{
        if(result.affectedRows>0){
            res.send({
                err_code:0
            })
        }
    })
})

router.get('/list',function (req,res) {
    let {status,page,per_page} = req.query;
    let uid=1;
    if(page<=0 || page==undefined) page = 1;
    if(per_page== undefined) per_page=10;
    let start = (page-1) * per_page;
    if(status == '10' || status==undefined){
        var sql = "select id,order_no,order_status,product_count,order_amount_total,logistics_fee,create_time from table_order where uid = "+uid+" order by id desc LIMIT "+start+","+per_page+""
    }else{
        var sql = "select id,order_no,order_status,product_count,order_amount_total,logistics_fee,create_time from table_order where uid = "+uid+" and order_status="+status+" order by id desc LIMIT "+start+","+per_page+""
    }
    pool.query(sql,async (err,result)=>{
        if(err) throw err;
        let more = false;
        
        if(result.length==0){
            res.send({
                err_code:0,
                paged:{total: 0, page: page, size: per_page,more:more},
                data:[]
            })
        }else{
            let total = await getCount();
            let products = await getDetails(result);
            let laetPage = Math.ceil(total / per_page); // 总条数除以每页多少条=》一共能分多少页
            if(laetPage > page) more = true;
            res.send({
                err_code:0,
                paged:{total: total, page: page, size: per_page,more:more},
               // products:products,
                data:products
            })
        }
        
        function getCount() {
            if(status == '10' || status==undefined){
                var sql1 = "select count(1) as total from table_order where uid = "+uid+" "
            }else{
                var sql1 = "select count(1) as total from table_order where uid = "+uid+" and order_status="+status+""
            }
            return new Promise((resolve,reject)=>{
                pool.query(sql1,(err,result)=>{
                    if(err){
                        reject(err)
                    }
                    if(result){
                        resolve(result[0].total)
                    }
                })
            })

        }

        function getDetails(arr) {
            let newArr = arr.map(val=>{
                return val.order_no
            })
            let str = newArr.join(',')

            return new Promise((resolve,reject)=>{
                let sql = "select a.id as aid,a.goods_id,a.order_no,a.goods_name,a.goods_price,a.number,a.subtotal,a.goods_img,b.id,b.order_status,b.create_time,b.order_amount_total from table_orderdetail as a left join table_order as b on a.order_no = b.order_no" +
                    " where a.order_no in ("+str+") order by a.id desc"
                pool.query(sql,(err,result)=> {
                    var arr = []
                    // console.log(result)
                    var map = {};
                    result.forEach(function (item,index) {
                       // map['orderNo'] = item.order_no;
                        //map['productTotalNum'] = 0;
                        // map['status'] = item.order_status
                        // map['createTime']=item.create_time
                        var tempArr = []  /// 代表一个订单里面的所有产品
                        var tempObj = {}  /// 代表一个订单里面的单一产品对象，放tempArr里面
                        tempObj['name'] = item.goods_name;
                        tempObj['imgs'] = item.goods_img;
                        tempObj['num'] = item.number;
                        tempArr.push(tempObj);
                        if(!map[item.order_no]){
                            arr.push({
                                orderNo:item.order_no,
                                createTime:item.create_time,
                                status:item.order_status,
                                totalAmt:item.order_amount_total,
                                pros:tempArr
                            })
                            map[item.order_no]=true;
                        }else{
                            arr.forEach(function (val,i) {
                                if(val.orderNo == item.order_no){
                                    arr[i].pros.push(tempObj)
                                }
                            })
                        }

                    })

                    resolve(arr)
                })

            })
        }
    })

})

router.post('/get',function (req,res) {
    let order_no = req.body.order;
    let sql = "select a.id,a.order_no,a.order_status,a.create_time,a.pay_time,a.order_amount_total,a.address_id,a.pay_status,b.id,b.tel,b.uname,b.address,b.area_name from table_order as a left join table_address as b on a.address_id = b.id where a.order_no = ?"
    pool.query(sql,[order_no],async (err,result)=>{
        let detail = await getList(order_no)
        let tradeCount = detail.reduce((prev,curr,index)=>{
            return (prev.number?prev.number:prev)+curr.number
        },0)
        let infoLabels = [];
        if(result[0].order_status == 0 || result[0].order_status == 5){
            infoLabels = [
                {title:'订单编号',content:result[0].order_no},
                {title:'下单时间',content:getLocalTime(Number(result[0].create_time))}
            ]
        }else{
            infoLabels = [
                {title:'订单编号',content:result[0].order_no},
                {title:'下单时间',content:getLocalTime(Number(result[0].create_time))},
                {title:'支付时间',content:getLocalTime(Number(result[0].pay_time))},
                {title:'支付方式',content:getPayStatus(result[0].pay_status)}
            ]
        }
        res.send({
            address:{
                contact:result[0].uname,
                fullAddress:result[0].area_name + result[0].address,
                phone: result[0].tel
            },
            infoLabels:infoLabels,
            productList:detail,
            priceList:[
                {title:'商品金额',amount: "¥"+result[0].order_amount_total,operator: ""},
                {amount: "¥0.00",operator: "+",title: "运费"}
            ],
            orderNo:result[0].order_no,
            tradeCount: tradeCount,
            totalAmt: result[0].order_amount_total,
            status: result[0].order_status
        })
    })

    function getPayStatus(val) {
        console.log(val)
        if(val == 0){
            return '支付宝支付'
        }else if(val == 1){
            return '微信支付'
        }
    }
    function getList(order_no) {
        let sql = "select id,goods_id,order_no,goods_name,goods_price,number,subtotal,goods_img from table_orderdetail where order_no = ?"
        return new Promise((resolve,reject)=>{
            pool.query(sql,[order_no],(err,result)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })

    }
})

router.post('/confirm',function (req,res) {
    let orderNo = req.body.orderNo;
    if(orderNo){
        let sql = "update table_order set order_status = 3 where order_no = ?"
        pool.query(sql,[orderNo],(err,result)=>{
            if(result.affectedRows>0){
                res.send({
                    err_code:0,
                    status: 4
                })
            }
        })
    }else{
        res.send({
            err_code:400,
            msg:'参数错误'
        })
    }
})

router.post('/subtotal',function (req,res) {
    let uid = 1
    let sql = "select order_status as status,count(*) as nums from table_order where uid = ? GROUP BY order_status"
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        let obj = {}
        result.forEach(item => {
            obj[item.status] = item.nums;
        })
        res.send({
            err_code: 0,
            subtotal:{
                pay: obj[0],    //待支付
                paid: obj[1],      //待收货
                cart: obj[2],      //待收货
                receiving: obj[3],  //待评价
                change: obj[5]      //退换货
            }
        })
    })
})

router.post('/cancel',function (req,res) {
    let order_id = req.body.order;
    let value = req.body.cancelValue;
    let sql = "update table_order set order_status = 5 , cancel_value = ? where order_no=?"
    pool.query(sql,[value,order_id],(err,result)=>{
        if(result.affectedRows>0){
            res.send({
                err_code:0
            })
        }
    })
})

module.exports=router;