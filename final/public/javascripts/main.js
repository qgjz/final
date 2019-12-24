function quit(){
    window.location.href = "/";
}

function toBlog(user,isadmin,page){
	$('#content').load('/article',{user:user,isadmin:isadmin,page:page});
}

function toHome(user,isadmin){
	$('#content').load('/main/home',{user:user,isadmin:isadmin});
}

function toAdd(user,isadmin){
	$('#content').load('/add',{user:user,isadmin:isadmin});
}

function submitAdd(){
	var title=$("#title").val();
	var context=$("#context").val();

	 if(title == ""){
        alert("文章标题不得为空");
    }else if(context == ""){
        alert("文章内容不得为空");
    }else{
    	$.post("/add/addArticle",{title,context},function(data,status){
	        alert(data);
	    });
    }
}