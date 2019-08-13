const express=require('express')
const pool = require('../pool')

const totalPriceList = async (products) => {
    let ids = '',total_price=0;
    products.forEach((item,index) => {
        ids += item.goods_id + ','
    })
    ids = ids.slice(0,ids.length-1)
    let totalList = await getPros(ids)
    //console.log(totalList)
    for(var prop of totalList){
        total_price += prop.price * prop.quantity;
    }
    return {
        productList:totalList,
        priceList:[{
            title: '商品金额',
            amount: total_price,
            operator: ""
        },{
            title: '运费',
            amount: 0.00,
            operator: "+"
        }],
        totalAmt: total_price
    };

    // 获取商品对应价格
    function getPros(num) {
        let sql = "select id,price,full_name,img,stock,status from table_goods where id in ("+num+")"
        return new Promise((resolve,reject)=>{
            pool.query(sql,(err,result)=>{
                //params.productList = result;
                result.forEach((item,index)=>{
                    //params[item.id].price = item.price
                    products.forEach((item2,index) => {
                        if(item.id == item2.goods_id){
                            item.quantity = item2.goods_num
                        }
                    })
                })
                resolve(result)
            })
        })
    }
}


const getDefaultAddress = async () => {
    let uid=1
    let sql = "select id,uname,tel,address,area_name from table_address where uid=? and is_default=1"
    return new Promise((resolve,reject)=>{
        pool.query(sql,[uid],(err,result)=>{
            if(result.length>0){
                resolve({
                    address:result[0].address,
                    contact: result[0].uname,
                    fullAddress:result[0].area_name + result[0].address,
                    phone:result[0].tel,
                    id:result[0].id
                })
            }else{
                resolve(null)
            }
        },err=>{
            reject(err)
        })
    })

}

const getLocalTime = (timestamp) => {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0'+date.getDate():date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
    return Y+M+D+h+m+s;
}

module.exports = {
    totalPriceList,
    getDefaultAddress,
    getLocalTime
}