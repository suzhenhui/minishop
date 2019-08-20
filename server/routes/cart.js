const express = require('express')
const router = express.Router()
const pool = require("../pool")

router.get('/add',function (req,res) {
    let {productId,amount} = req.query;
    //let token = req.headers.token;
    let userId = 1;
    sql = "insert into table_cart(goods_id,goods_number,member_id,is_delete) values (?,?,?,?)"
    sql2 = "select id,goods_id,member_id,goods_number from table_cart where goods_id=? and member_id=? and is_delete=0"
    sql3 = "update table_cart set goods_number=? where id=?"

    pool.query(sql2,[productId,userId],(err,result)=>{
        if(result.length>0){
            updateNums(result[0].id,result[0].goods_number)
        }else{
            insertNums()
        }
    })

    function updateNums(id,nums){
        nums++;
        pool.query(sql3,[nums,id],(err,result)=>{
            if(result.affectedRows>0){
                res.send({
                    code: 200,
                    product_id: productId,
                    user_id: userId
                })
            }else{
                res.send(err)
            }
        })
    }

    function insertNums(){
        pool.query(sql,[productId,amount,userId,0],(err,result)=>{
            if(err) throw err;
            if(result.affectedRows>0){
                res.send({
                    code: 200,
                    product_id: productId,
                    user_id: userId
                })
            }else{
                res.send(err)
            }
        })
    }
})

router.get('/quantity',function (req,res) {
    sql = "select sum(goods_number) as nums from table_cart where member_id = ? and is_delete=0"
    pool.query(sql,[1],(err,result)=>{
        if(result.length>0){
            res.send({
                code:200,
                quantity: result[0].nums
            })
        }else{
            res.send(err)
        }
    })
})

router.get('/list',function (req,res) {
    let uid = req.user
    sql = "select table_cart.id,goods_id,goods_number,name,full_name,price,stock,img,status from table_cart left join table_goods on table_cart.goods_id = table_goods.id where member_id=? and is_delete=false"
    pool.query(sql,[uid],(err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send({
                goods:result
            })
        }
    })
})

router.post('/price',async function (req,res) {
    let {order_product} = req.body
    order_product = JSON.parse(order_product)
    let num = '',total_price=0;
    let params = {};
    order_product.forEach((item,index) => {
        num += item.goods_id + ','
        params[item.goods_id] = {
            goods_num: item.goods_num
        }
    })
    num = num.slice(0,num.length-1)

    let totalList = await getPros(num)
    for(var prop in totalList){
        total_price += params[prop].goods_num * params[prop].price
    }
    res.send({
        code:200,
        order_price:{
            "total_price": total_price
        }
    })

    // 获取商品对应价格
    function getPros(num) {
        let sql = "select id,price from table_goods where id in ("+num+")"
        return new Promise((resolve,reject)=>{
            pool.query(sql,(err,result)=>{
                //console.log(result)
                result.forEach((item,index)=>{
                    params[item.id].price = item.price
                })
                resolve(params)
            })
        })

    }

})

router.post('/delete', function (req,res) {
    let id = req.body.id;
    let reg = new RegExp(/\[|\]/,"g");
    id = id.replace(reg,'')
    let useId = 1;
    let sql = "delete from table_cart where goods_id in ("+id+") and member_id="+useId
    pool.query(sql,(err,result)=>{
        if(result.affectedRows>0){
            res.send({
                code:200,
                msg:'ok'
            })
        }else{
            res.send(err)
        }
    })
})


router.post('/update',function (req,res) {
    let {id,amount} = req.body;
    sql="update table_cart set goods_number = ? where id = ?"
    pool.query(sql,[amount,id],(err,result)=>{
        if(err){
            res.send({
                error_code:500,
                msg: err
            })
            return;
        }
        if(result.affectedRows>0){
            res.send({
                error_code:0
            })
        }
    })
})

router.post('/checkout',async (req,res)=>{
    let {addressId,cartGoodsId} = req.body;
   // console.log(cartGoodsId)
    let orderNo =randomNumber();
   // console.log(orderNo)
    let uid = req.user;
    let order_status = 0;
    let product_amount_total = 100; //商品总价
    let order_amount_total = 100; //订单金额
    let logistics_fee = 0; // 运费
    let create_time = (new Date()).getTime();
    let goodsId = cartGoodsId.slice(1,cartGoodsId.length-1);
    let product_count = goodsId?goodsId.split(',').length:0; //商品项目数量
    let totalList = await getSubTotalGoods()
   // console.log(totalList)
    let tempList = totalList.list;
    let totalPrice = totalList.total;

    let insertStatus = await insertOrderDetail(tempList)
    let clearCart = await deleteCart(goodsId)
    if(insertStatus == 1 && clearCart == 1){
        let sql = "insert into table_order(uid,order_no,order_status,product_count,product_amount_total,order_amount_total,logistics_fee,address_id,create_time) values (?,?,?,?,?,?,?,?,?)"
        pool.query(sql,[uid,orderNo,order_status,product_count,totalPrice,totalPrice,logistics_fee,addressId,create_time],(err,result)=>{
            if(result.affectedRows>0){
                res.send({
                    err_code:0,
                    order:{
                        orderNo: orderNo,
                        totalPay: totalPrice
                    }
                })
            }
        })
    }

    function deleteCart(ids) {
        return new Promise((resolve,reject)=>{
            let sql = "update table_cart set is_delete = true where id in ("+ids+")"
            pool.query(sql,(err,result)=>{
                // console.log(ids)
                // console.log(result)
                if(result.affectedRows>0){
                    resolve(1)
                }
            },err=>{
                reject(err)
            })
        })
    }

    function insertOrderDetail(arr) {
        return new Promise((resolve,reject)=>{
            let len=arr.length;
            arr.forEach((item,index)=> {
                let sql = "insert into table_orderdetail(order_no,goods_id,goods_name,goods_price,number,subtotal,goods_img) values (?,?,?,?,?,?,?)"
                pool.query(sql, [orderNo, item.goods_id, item.full_name, item.price, item.goods_number, item.sub_total,item.img], (err, result) => {
                    if (err) throw err;
                    if(index == len-1){
                        resolve(1)
                    }
                })
            })
        })
    }

    function getSubTotalGoods() {
        let sql = "select a.id,a.goods_id,a.goods_number,b.id,b.full_name,b.name,b.price,b.img from table_cart as a left join table_goods as b on a.goods_id=b.id where a.member_id="+uid+" and a.id in ("+goodsId+")"
        return new Promise((resolve,reject)=>{
            pool.query(sql,(err,result)=>{
                if(result){
                    let total = 0;
                    result.forEach(item=>{
                        item.sub_total = item.goods_number*item.price;
                        total += item.sub_total;
                    })
                    let msg = {}
                    msg.total = total;
                    msg.list = result;
                    resolve(msg)
                }
            },err=>{
                reject(err)
            })
        })
    }
    
    function randomNumber() {
        const now = new Date();
        let year = setDateFmt(now.getFullYear());
        let month = setDateFmt(now.getMonth()+1);
        let day = setDateFmt(now.getDate());
        let hour = setDateFmt(now.getHours());
        let minutes = setDateFmt(now.getMinutes());
        let seconds = setDateFmt(now.getSeconds());
        let random = Math.round(Math.random()*100+100)
        return year.toString()+month.toString()+day.toString()+hour.toString()+minutes.toString()+seconds.toString()+random.toString();

        function setDateFmt(str) {
            str = str.toString();
            if(str.length==1){
                str = '0'+str;
            }
            return str;
        }
    }


})

module.exports = router