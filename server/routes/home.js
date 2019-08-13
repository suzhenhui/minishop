const express = require('express')
const router = express.Router();
const pool = require('../pool')

router.get('/banner',function (req,res) {
    res.send({
        "banners": [
            {
                "id": 0,
                "photo": {
                    "width": null,
                    "height": null,
                    "thumb": "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/11738/26/10452/191740/5c7f9d29E2e7dd029/95fc884029435315.jpg",
                    "large": "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/11738/26/10452/191740/5c7f9d29E2e7dd029/95fc884029435315.jpg!cr_1125x549_0_72!q70.jpg.dpg"
                },
                "link": "http://mall.gxzhenzhi.net/h5/#/hd/xc1905",
                "title": "",
                "sort": "1"
            },
            {
                "id": 1,
                "photo": {
                    "width": null,
                    "height": null,
                    "thumb": "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/54870/13/3044/99903/5d0cf8cfEf99db1b1/fc413d7f05b93eaf.jpg",
                    "large": "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/54870/13/3044/99903/5d0cf8cfEf99db1b1/fc413d7f05b93eaf.jpg"
                },
                "link": "http://mall.gxzhenzhi.net/h5/#/bankHD/BankEvent",
                "title": "",
                "sort": "2"
            },
            {
                "id": 2,
                "photo": {
                    "width": null,
                    "height": null,
                    "thumb": "http://shop.gxzhenzhi.net/data/afficheimg/20190620bdcxfj.jpg",
                    "large": "http://shop.gxzhenzhi.net/data/afficheimg/20190620bdcxfj.jpg"
                },
                "link": "http://mall.gxzhenzhi.net/h5/#/product?id=425",
                "title": "",
                "sort": "3"
            }
        ],
        "error_code": 0
    })
})

router.get('/productlist',function (req,res) {
    let sql = "SELECT id,goods_type_id,name,img,price,stock FROM table_goods ORDER BY rand() LIMIT 8"
    pool.query(sql,(err,result)=>{
        let goodProducts=result.slice(0,4),
        newProducts=result.slice(4,result.length);
        res.send({
            code:200,
            goodProducts: goodProducts,
            newProducts:newProducts
        })
    })
})

module.exports = router;