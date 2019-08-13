const express = require("express")
const router = express.Router();
const pool = require("../pool")
const map = require("../map")

router.get('/province',(req,res)=>{
    let sql = "select district_id,pid,district,level from rc_district where pid=1"
    pool.query(sql,(err,result)=>{
        if(err){
            res.send({
                error_code: 500,
                msg:err
            })
        }else{
            res.send({
                error_code:0,
                data:result
            })
        }
    })
})

router.get('/cities',(req,res)=>{
    let id = req.query.id;
    let province = [];
    let city = []
    let cIndex = '';

    map.forEach((item,index)=>{
        if(item.id == id){
            cIndex=index
        }
        province.push({items:{id:item.id,name:item.name}})
    })

    if(id){
        let mapCity = map[cIndex].city;
        res.send({
            error_code:0,
            data:mapCity
        })
    }else{
        res.send({
            error_code:0,
            data:province
        })
    }
})

router.post('/add',async (req,res) =>{
    let {id,name,tel,address,area,areaName} = req.body;
    let uid=1;
    let is_default =1 ;
    let sql2 = "update table_address set is_default = 0 where uid=?"
    let sql = "insert into table_address(uid,uname,tel,address,area_name,area_code,is_default) values (?,?,?,?,?,?,?)"
    let sql3 = "update table_address set uname = ?,tel=?,address=?,area_name=?,area_code=?,is_default=? where id=?"

    let updateDefault = await new Promise((resolve,reject) => {
        pool.query(sql2,[uid],(err,result)=>{
            if(result.affectedRows>0){
                resolve({err_code:0})
            }
        })
    })

    if(updateDefault.err_code == 0){
        if(id){
            pool.query(sql3,[name,tel,address,areaName,area,is_default,id],(err,result)=>{
                if(result.affectedRows>0){
                    res.send({
                        err_code:0
                    })
                }
            })
        }else {
            pool.query(sql,[uid,name,tel,address,areaName,area,is_default],(err,result)=>{
                if(result.affectedRows>0){
                    res.send({
                        err_code:0
                    })
                }
            })
        }
    }
})

router.get('/list',(req,res)=>{
    let uid=1
    let sql = "select id,tel,address,area_name,area_code,is_default,uname from table_address where uid=? order by is_default desc"
    pool.query(sql,[uid],(err,result)=>{
        if(result){
            res.send({
                err_code:0,
                list:result
            })
        }
    })
})

router.get('/default',async (req,res)=>{
    let id = req.query.id;
    let uid = 1;
    let sql = "update table_address set is_default = 0 where uid=?"
    let sql2 = "update table_address set is_default = 1 where id=?"

    let updateDefault = await new Promise((resolve,reject) => {
        pool.query(sql,[uid],(err,result)=>{
            if(result.affectedRows>0){
                resolve({err_code:0})
            }
        })
    })

    if(updateDefault.err_code == 0) {
        pool.query(sql2, [id], (err, result) => {
            if (result.affectedRows > 0) {
                res.send({
                    err_code: 0
                })
            }
        },err=>{
            res.send({
                err_code:500,
                msg:err
            })
        })
    }
})

module.exports = router