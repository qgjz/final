var express = require('express');
var conn = require('./conn');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/log',function(req,res){

    var connection=conn.connect();
    var sql = "select * from user student where username = ?";
    connection.query(sql,[req.body.user],function(err,result){
        if(result.length != 0){
            if(req.body.pwd != result[0].password){
                res.send("请输入正确的密码");
            }else{
                res.send({user:req.body.user , isadmin : result[0].isadmin});
            }
        }else{
            res.send("请输入正确的用户名");
        }
    });
});

module.exports = router;