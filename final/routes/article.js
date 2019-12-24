var express = require('express');
var conn = require('./conn');
var router = express.Router();

var limit=5;

router.post('/',function(req,res){
	var connection = conn.connect();
    var sql = "select * from article";
    connection.query(sql,function(err,result){

    	var page=req.body.page;
    	
    	var len=result.length;

    	console.log(len,req.body.user,req.body.isadmin,req.body.page);

    	var pages=Math.ceil(len/limit);
    	var arr=[];
    	for(var i=1;i<=pages;i++){
    		arr.push(i);
    	}

    	res.render('article',{result:result.slice((page-1)*limit, Math.min(page*limit,len)) ,page:page, pages:arr ,user:req.body.user,isadmin:req.body.isadmin});
    });
})

module.exports = router;