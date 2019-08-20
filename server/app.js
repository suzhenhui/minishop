const express = require("express");
const pool = require("./pool");
const qs = require("querystring");
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser=require("cookie-parser");
const jwt = require('jsonwebtoken');
const fs=require('fs');
const path = require('path');
const config = require('./config')
var app = express();

const urls = ['/user/login','/user/reg','/home/banner','/home/index','/home/productlist','/category/list','/products/detail'];


const cors = require('cors')

app.use(cors({
    origin: ["http://127.0.0.1:8080","http://localhost:8080","http://localhost:7004","http://szh.zjchuanbo.com"],
    credentials:true
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

var userRouter = require('./routes/user');
var homeRouter = require('./routes/home')
var categoryRouter = require('./routes/category')
var productsRouter = require('./routes/products')
var cartRouter = require("./routes/cart")
var addressRouter = require("./routes/address")
var order = require('./routes/order')
var search = require('./routes/search')

app.use(cookieParser());

app.use((req,res,next)=>{
    let url = '';
    if(req.url.indexOf('?') != -1){
        url = req.url.split('?')[0]
    }else{
        url = req.url;
    }
    if(urls.indexOf(url) != -1){
        next()
    }else{
        let userToken = req.headers.token;
        //token鉴权接口
        let cert = fs.readFileSync(path.resolve(__dirname,'./jwt_pub.pem'))
        try{
            const decode = jwt.verify(userToken,cert)
            req.user = decode.id
            next()
        }catch (e) {
           // console.log(e.message)
            if(e.message == 'jwt expired'){
                res.send({
                    error_code: 10002,
                    msg: '登录已过期,请重新登录'
                })
            }else{
                res.send({
                    error_code: 10001,
                    msg: 'Token 无效,请重新登录'
                })
            }

        }
    }
})

app.use('/user',userRouter)
app.use('/home',homeRouter)
app.use('/category',categoryRouter)
app.use('/products',productsRouter)
app.use('/cart',cartRouter)
app.use('/address',addressRouter)
app.use('/order',order)
app.use('/search',search)

app.listen(8101)

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));


