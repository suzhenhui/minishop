const express = require("express")
const router = express.Router();
const pool = require("../pool")

router.get('/getDefaultKey',(req,res)=>{
    res.send({"hotKeys":[
        {"isHighLight":"true","keyWord":"山竹","linkType":"6","linkValue":"https://m.benlai.com/zt/190807sz.html"},
        {"isHighLight":"true","keyWord":"熊蜂是什么蜂","linkType":"6","linkValue":"https://m.benlai.com/zt/0730hofotomato.html"},
        {"isHighLight":"false","keyWord":"三文鱼","linkType":"6","linkValue":"https://m.benlai.com/zt/00415swy.html"},
        {"isHighLight":"false","keyWord":"西州蜜瓜","linkType":"1"},
        {"isHighLight":"false","keyWord":"大闸蟹","linkType":"1"},
        {"isHighLight":"false","keyWord":"葡萄","linkType":"1"},
        {"isHighLight":"false","keyWord":"椰青","linkType":"1"},
        {"isHighLight":"false","keyWord":"李玉双有机稻花香","linkType":"1"}
    ], "defaultKey":"泰国山竹包邮价59元5斤"})
})

module.exports = router;