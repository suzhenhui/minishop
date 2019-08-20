const express = require("express")
const router = express.Router();
const pool = require("../pool")

router.get('/list',function (req,res) {
    let {page,per_page,category,keyword} = req.query;
   // console.log(req.query)
    if(page<=0) page = 1;
    let start = (page-1) * per_page;
    if(category != ''){
        var sql = "SELECT id,goods_type_id,name,title,img,sub_img,price,stock,status FROM table_goods where goods_type_id="+category+" LIMIT "+start+","+per_page+""
    }else if(keyword != ''){
        var sql = "SELECT id,goods_type_id,name,title,img,sub_img,price,stock,status FROM table_goods where name like '%"+keyword+"%' LIMIT "+start+","+per_page+""
    }else{
        var sql = "SELECT id,goods_type_id,name,title,img,sub_img,price,stock,status FROM table_goods LIMIT "+start+","+per_page+""
    }
    pool.query(sql,async (err,result)=>{
        if(err) throw err;
        let getCount = new Promise((resolve,reject)=>{
            if(category == ''){
                var sql1 = "SELECT count(*) as total FROM table_goods"
            }else{
                var sql1 = "SELECT count(*) as total FROM table_goods where goods_type_id="+category
            }
            pool.query(sql1,(err,result)=>{
                resolve(result[0].total)
            })
        })

        let total = await getCount;
        let laetPage = Math.ceil(total / per_page);
        let more = true;
        if(laetPage <= page) more = false

        res.send({
            code:200,
            paged:{total: total, page: page, size: per_page,more:more},
            products:result
        })
    })

})

router.get('/detail',function (req,res) {
    let {productId} = req.query;
    sql = "select id,goods_type_id,name,full_name,title,img,sub_img,price,stock,status,detail from table_goods where id = ?"
    pool.query(sql,productId,(err,result)=>{
        let photos = result[0].sub_img.split(',')
        res.send({
            code: 200,
            product:{
                id:result[0].id,
                goods_type_id: result[0].goods_type_id,
                name:result[0].name,
                fullname:result[0].full_name,
                title:result[0].title,
                img:result[0].img,
                photos: photos,
                price:result[0].price,
                stock: result[0].stock,
                status: result[0].status,
                detail: result[0].detail
            }
        })
    })
})

module.exports = router;