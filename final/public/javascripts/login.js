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

function login(){
    var user = document.getElementById("user");
    var pwd = document.getElementById("pwd");

    if(user.value == ""){
        alert("请输入用户名");
    }
    else if(pwd.value == ""){
        alert("请输入密码");
    }else{
        $.post("/log" , { user:user.value , pwd:pwd.value } , function(data,status){
            if(data!="请输入正确的密码"&&data!="请输入正确的用户名"){
                if(data.isadmin==1)
                    standardPost('/main',{user:data.user , isadmin:data.isadmin });
                else
                    standardPost('/main',{user:data.user , isadmin:null });
            }
            else
                alert(data);
        });        
    }
}

function mov(){
    $(location).prop('href', '/reg');
}