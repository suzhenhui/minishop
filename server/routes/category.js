const express = require('express')
const router = express.Router();
const pool = require('../pool')
const config = require('../config')

router.get('/list',function (req,res) {
    let sql = 'select id,pid,name,img from table_category'
    var arr = []
    pool.query(sql,(err,result)=>{
       // console.log(result)
        result.forEach((item,index)=>{
            arr[index]={id:item['id'],name:item['name'],pid:item['pid'],img:config.static_img_url+item['img']}
        })

        res.send(tree(arr))

        function tree(data) {
            var map = {};
            data.forEach(function (item) {
                map[item.id] = item;       //这里的ID根据数据库的字段
            });
            console.log(map)
            var val = [];
            data.forEach(function (item) {
                var parent = map[item.pid];      //这里是父级ID---pid
                if (parent) {
                    (parent.children || (parent.children = [])).push(item);
                    parent.children.sort(function () {
                        return Math.random() - 0.5
                    })
                } else {
                    val.push(item);
                }
            });
            return val;
        }
    })

})

module.exports = router;