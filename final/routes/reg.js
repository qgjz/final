var express = require('express');
var nodemailer = require('nodemailer');
var conn = require('./conn');
var router = express.Router();

router.get('/',function(req,res){
    res.render('reg',{});
})

router.post('/mail',function(req,res){
    var transporter = nodemailer.createTransport({
        service:'qq',
        auth:{
            user:'568695093@qq.com',
            pass:'tpsfgmlrrgrzbdde'
        }
    });
    var option={
        from:"568695093@qq.com",
        to:req.body.email,
        subject:"验证码",
        html:"<h2>注册验证码为：" + req.body.Captcha + "</h2>"
    };
    transporter.sendMail(option, function (err, info) {
        if (err) {
            console.log(err);
            return;
        }
    });
});

router.post('/regis',function(req,res){
    var connection = conn.connect();
    var sql = "select * from user where username = ?";
    var sql1 = "insert into user values( ? , ? , '0')";
    connection.query(sql,[req.body.email],function(err,result){
        if(result.length == 0){
            connection.query(sql1,[req.body.email,req.body.pwd],function(err,result){
                res.send("注册成功！");
            });
        }   
        else{
            res.send("该账号已存在");
        }  
    });
});

module.exports = router;