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

const urls = ['/user/login','/home/banner','/home/index'];

const cors = require('cors')

app.use(cors({
    origin: ["http://127.0.0.1:8080","http://localhost:8080"],
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

// app.use((req,res,next)=>{
//     if(urls.indexOf(req.url) != -1){
//         next()
//     }else{
//         let userToken = req.headers.token;
//         //token鉴权接口
//         let cert = fs.readFileSync(path.resolve(__dirname,'./jwt_pub.pem'))
//         try{
//             const decode = jwt.verify(userToken,cert)
//             next()
//         }catch (e) {
//             res.send({
//                 error_code: 401,
//                 msg: '登录已过期,请重新登录'
//             })
//         }
//     }
// })

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


