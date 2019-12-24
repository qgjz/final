var before = "";
var rule = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

function standardPost (url,args) 
{
    var form = $("<form method='post'></form>");
    form.attr({"action":url});
    for (arg in args)
    {
        var input = $("<input type='hidden'>");
        input.attr({"name":arg});
        input.val(args[arg]);
        form.append(input);
    }
    $("html").append(form);
    form.submit();
}

function regi(){

    var email = document.getElementById("email");
    var btn = document.getElementById("send_captcha");
    var code = document.getElementById("code");
    var pwd = document.getElementById("pwd");
    var pwd_again = document.getElementById("pwd_again");

    var Captcha=getCookie("Captcha");

    if(Captcha){
        if(!rule.test(email.value))
            alert("请输入正确的邮箱格式");
        else if(email.value != before)
            alert("请使用之前发送验证码的邮箱进行注册");
        else if(Captcha != code.value)
            alert("请输入正确的验证码");
        else if(pwd.value.length < 6)
            alert("密码长度至少为6位");
        else if(pwd_again.value != pwd.value)
            alert("确认密码需和密码一致");
        else{
            $.post("/reg/regis",{ email : email.value , pwd : pwd.value },function(data){
                if(data=="注册成功！")
                    standardPost('/main',{user:email.value});
            });
        }        
    }
    else{
        alert("请先获取验证码");
    }
}

function mail(){

    var time = 180;

    var email = document.getElementById("email");
    var btn = document.getElementById("send_captcha");
    var code = document.getElementById("code");
    var pwd = document.getElementById("pwd");
    var pwd_again = document.getElementById("pwd_again");

    if( rule.test(email.value) ){
         btn.setAttribute('disabled',true);

        var Captcha="";
        for(var i=0;i<6;i++){
            Captcha=Captcha+Math.floor(Math.random()*10)
        }

        setCookie("Captcha",Captcha,3 * 60 * 1000);

        before = email.value;

        $.post("/reg/mail" , { email : $('#email').val() , Captcha : Captcha } , function(data){} , "text");

        var timer=setInterval(function(){
            if(time == 0){
                btn.removeAttribute('disabled');
                btn.innerHTML='发送验证码';
                clearInterval(timer);
                time = 180;
            }
            else{
                btn.innerHTML=time+"秒后可再次发送";
                time--;
            }
        },1000);  
    }else{
        alert("请输入正确的邮箱格式");
    }
}

function mov(){
    $(location).prop('href', '/');
}


function setCookie(cname,cvalue,exdays)
{
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname)
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) 
    {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
}