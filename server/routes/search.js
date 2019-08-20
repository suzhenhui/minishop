const express = require("express")
const router = express.Router();
const pool = require("../pool")

router.get('/getDefaultKey',(req,res)=>{
    res.send({"hotKeys":[
        {"isHighLight":"true","keyWord":"打印机","linkType":"6","linkValue":"https://m.benlai.com/zt/190807sz.html"},
        {"isHighLight":"true","keyWord":"电磁炉","linkType":"6","linkValue":"https://m.benlai.com/zt/0730hofotomato.html"},
        {"isHighLight":"false","keyWord":"养生壶","linkType":"6","linkValue":"https://m.benlai.com/zt/00415swy.html"},
        {"isHighLight":"false","keyWord":"电饭煲","linkType":"1"},
        {"isHighLight":"false","keyWord":"大闸蟹","linkType":"1"},
        {"isHighLight":"false","keyWord":"笔记本","linkType":"1"},
        {"isHighLight":"false","keyWord":"椰青","linkType":"1"},
        {"isHighLight":"false","keyWord":"李玉双有机稻花香","linkType":"1"}
    ], "defaultKey":"泰国山竹包邮价59元5斤"})
})

module.exports = router;