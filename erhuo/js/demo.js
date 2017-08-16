// JavaScript Document
$(function(){
	var u1,u2,u3;
//用户名验证
	$("#username").focus(function(){
	$("#use .tips").css({"display":"block"});
	$("#use .tipsError").css({"display":"none"});
	});
	
	$("#username").blur(function(){
	var s=$("#username")[0].value;
	var patrn=/[a-zA-Z0-9_]{6,12}/; 
	if(s==""){
		$("#use .tipsError")[0].innerHTML="用户名不能为空";
		$("#use .tips").css({"display":"none"})
		$("#use .tipsError").css({"display":"block"});
		u1=false
		}   
	else if (!patrn.exec(s))
		{
		$("#use .tipsError")[0].innerHTML="用户名格式不符合";
		$("#use .tips").css({"display":"none"})
		$("#use .tipsError").css({"display":"block"});
		u1=false
			}
	else{
		$("#use .tips").css({"display":"none"})
		$("#use .tipsError").css({"display":"none"});
		u1=true;
		}
		});
//手机验证
	$("#phone").focus(function(){
	$("#phon .tips").css({"display":"block"});
	$("#phon .tipsError").css({"display":"none"});
	});
	
	$("#phone").blur(function(){
	var s1=$("#phone")[0].value;
	var patrn1=/^1[3|5|7|8|][0-9]{9}$/; 
	if(s1==""){
		$("#phon .tipsError")[0].innerHTML="手机号码不能为空";
		$("#phon .tips").css({"display":"none"})
		$("#phon .tipsError").css({"display":"block"});
		u2=false
		}   
	else if (!patrn1.exec(s1))
		{
		$("#phon .tipsError")[0].innerHTML="手机格式不符合";
		$("#phon .tips").css({"display":"none"})
		$("#phon .tipsError").css({"display":"block"});
		u2=false
			}
	else{
		$("#phon .tips").css({"display":"none"})
		$("#phon .tipsError").css({"display":"none"});
		u2=true;
		}
		});
//邮箱验证
	$("#mail").focus(function(){
	$("#mai .tips").css({"display":"block"});
	$("#mai .tipsError").css({"display":"none"});
	});
	
	$("#mail").blur(function(){
	var s2=$("#mail")[0].value;
	var patrn2=/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/; 
	if(s2==""){
		$("#mai .tipsError")[0].innerHTML="邮箱不能为空";
		$("#mai .tips").css({"display":"none"})
		$("#mai .tipsError").css({"display":"block"});
		u3=false
		}   
	else if (!patrn2.exec(s2))
		{
		$("#mai .tipsError")[0].innerHTML="邮箱格式不符合";
		$("#mai .tips").css({"display":"none"})
		$("#mai .tipsError").css({"display":"block"});
		u3=false
			}
	else{
		$("#mai .tips").css({"display":"none"})
		$("#mai .tipsError").css({"display":"none"});
		u3=true;
		}
		});	
var u4,u5;
//密码验证不为空
	$("#pwd").focus(function(){
	$("#pw .tips").css({"display":"block"});
	$("#pw .tipsError").css({"display":"none"});
	});
	$("#pwd").blur(function(){
	var pwTex1=$("#pwd")[0].value;
	if(pwTex1==""){
		$("#pw .tips").css({"display":"none"});
		$("#pw .tipsError").css({"display":"block"});
		u4=false
		}
	else{
		$("#pw .tips").css({"display":"none"});
		$("#pw .tipsError").css({"display":"none"});
		u4=true;
		}
		});	
//确认密码与密码是否相同
$("#pwd2").focus(function(){
	$("#conPw .tips").css({"display":"block"});
	$("#conPw .tipsError").css({"display":"none"})
	});
$("#pwd2").blur(function(){
		var pwTex1=$("#pwd")[0].value;
		var pwTex2=$("#pwd2")[0].value;
		if(pwTex1==""){
		$("#conPw .tipsError")[0].innerHTML="确认密码不能为空";
		$("#conPw .tips").css({"display":"none"})
		$("#conPw .tipsError").css({"display":"block"});
		u5=false
		}
	else if(pwTex1!=pwTex2){
		$("#conPw .tipsError")[0].innerHTML="确认密码与密码不符合";
		$("#conPw .tips").css({"display":"none"})
		$("#conPw .tipsError").css({"display":"block"});
		u5=false
		}
	else{
		$("#conPw .tipsError").css({"display":"none"});
		$("#conPw .tips").css({"display":"none"})
		u5=true
		}
	});
//验证无误允许提交
		})
