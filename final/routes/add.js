var express = require('express');
var conn = require('./conn');
var router = express.Router();

router.post('/',function(req,res){
    res.render('add',{user:req.body.user,isadmin:req.body.isadmin});
});

router.post('/addArticle',function(req,res){
    var connection = conn.connect();
    var sql = "insert into article values(null,?,?);";
    connection.query(sql,[req.body.title,req.body.context],function(err,result){
        res.send("发布成功！");
    });
});

module.exports = router;