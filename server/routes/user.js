var express = require('express');
var router = express.Router();
const fs=require('fs');
const path = require('path');
const pool = require("../pool");
const jwt = require('jsonwebtoken');
const config = require("../config")
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        let type = file.originalname.split('.')
        cb(null, Date.now() + '.' + type[1]);
    }
})
const upload = multer({storage:storage})
const images = require("images");

// 登陆接口
router.post('/login', function (req, res,next) {
    var uname = req.body.username;
    var upwd = req.body.password;
    var sql = "select * from table_user where username=? and password = ?"
    pool.query(sql,[uname,upwd],(err,result)=>{
        let cert = fs.readFileSync(path.resolve(__dirname, '../jwt.pem'));
        let data={};
        if(err) throw err;
        if(result.length>0){
            let userToken = jwt.sign({
                id: result[0].customer_id,
                username: result[0].username
            },cert,{
                algorithm: 'RS256',
                expiresIn: '15min'
            })
            data.code=200;
            data.msg='success'
            data.userToken = userToken
            data.data =  {
                id:result[0].customer_id,
                username: result[0].username
            }
            res.send(data)
        }else{
            data.error_code = 400;
            data.msg = '账号或密码输入有误'
            res.send(data)
        }
    })
})

router.post('/headimg',upload.single('file'),function (req,res) {
   // console.log(req)
    images(req.file.path).save(req.file.path, {
        quality : 50
    });
    res.send({
        err_code: 0,
        head_url: config.static_upload_url+req.file.filename
    })
})

module.exports = router;