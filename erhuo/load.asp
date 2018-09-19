<%@LANGUAGE="VBSCRIPT"%>
<!--#include file="Connections/conn.asp" -->
<%
Dim Recordset1__MMColParam
Recordset1__MMColParam = "1"
If (Request.QueryString("name") <> "") Then 
  Recordset1__MMColParam = Request.QueryString("name")
End If
%>
<%
Dim Recordset1
Dim Recordset1_cmd
Dim Recordset1_numRows

Set Recordset1_cmd = Server.CreateObject ("ADODB.Command")
Recordset1_cmd.ActiveConnection = MM_conn_STRING
Recordset1_cmd.CommandText = "SELECT * FROM users WHERE name = ?" 
Recordset1_cmd.Prepared = true
Recordset1_cmd.Parameters.Append Recordset1_cmd.CreateParameter("param1", 200, 1, 255, Recordset1__MMColParam) ' adVarChar

Set Recordset1 = Recordset1_cmd.Execute
Recordset1_numRows = 0
%>
<%
' *** Validate request to log in to this site.
MM_LoginAction = Request.ServerVariables("URL")
If Request.QueryString <> "" Then MM_LoginAction = MM_LoginAction + "?" + Server.HTMLEncode(Request.QueryString)
MM_valUsername = CStr(Request.Form("mobile"))
If MM_valUsername <> "" Then
  Dim MM_fldUserAuthorization
  Dim MM_redirectLoginSuccess
  Dim MM_redirectLoginFailed
  Dim MM_loginSQL
  Dim MM_rsUser
  Dim MM_rsUser_cmd
  
  MM_fldUserAuthorization = ""
  MM_redirectLoginSuccess = "zhecehoushouye.asp"
  MM_redirectLoginFailed = "load.asp"

  MM_loginSQL = "SELECT name, password"
  If MM_fldUserAuthorization <> "" Then MM_loginSQL = MM_loginSQL & "," & MM_fldUserAuthorization
  MM_loginSQL = MM_loginSQL & " FROM users WHERE name = ? AND password = ?"
  Set MM_rsUser_cmd = Server.CreateObject ("ADODB.Command")
  MM_rsUser_cmd.ActiveConnection = MM_conn_STRING
  MM_rsUser_cmd.CommandText = MM_loginSQL
  MM_rsUser_cmd.Parameters.Append MM_rsUser_cmd.CreateParameter("param1", 200, 1, 255, MM_valUsername) ' adVarChar
  MM_rsUser_cmd.Parameters.Append MM_rsUser_cmd.CreateParameter("param2", 200, 1, 255, Request.Form("passwd")) ' adVarChar
  MM_rsUser_cmd.Prepared = true
  Set MM_rsUser = MM_rsUser_cmd.Execute

  If Not MM_rsUser.EOF Or Not MM_rsUser.BOF Then 
    ' username and password match - this is a valid user
    Session("MM_Username") = MM_valUsername
    If (MM_fldUserAuthorization <> "") Then
      Session("MM_UserAuthorization") = CStr(MM_rsUser.Fields.Item(MM_fldUserAuthorization).Value)
    Else
      Session("MM_UserAuthorization") = ""
    End If
    if CStr(Request.QueryString("accessdenied")) <> "" And false Then
      MM_redirectLoginSuccess = Request.QueryString("accessdenied")
    End If
    MM_rsUser.Close
    Response.Redirect(MM_redirectLoginSuccess)
  End If
  MM_rsUser.Close
  Response.Redirect(MM_redirectLoginFailed)
End If
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>贰货登录</title>

<link href="css/style.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>

</head>
<body>
<div class="wrap">
	<div class="banner-show" id="js_ban_content">
		<div class="cell bns-01">
			<div class="con">
			</div>
		</div>
 <!--第一张幻灯片-->
		<div class="cell bns-02" style="display:none;">
			<div class="con">
				<a href="#" target="_blank" class="banner-link">
				<i>圈子</i></a> </div>
		</div>
 <!--第二张幻灯片-->
		<div class="cell bns-03" style="display:none;">
			<div class="con">
				<a href="#" target="_blank" class="banner-link">
				<i>企业云</i></a> </div>
		</div>
	</div>
 <!--幻灯片按钮-->
	<div class="banner-control" id="js_ban_button_box">
		<a href="javascript:;" class="left">左</a>
		<a href="javascript:;" class="right">右</a>
	</div>
<script type="text/javascript">
;(function(){
	
	var defaultInd = 0;
	var list = $('#js_ban_content').children();
	var count = 0;
	var change = function(newInd, callback){
		if(count) return;
		count = 2;
		$(list[defaultInd]).fadeOut(400, function(){
			count--;
			if(count <= 0){
				if(start.timer) window.clearTimeout(start.timer);
				callback && callback();
			}
		});
		$(list[newInd]).fadeIn(400, function(){
			defaultInd = newInd;
			count--;
			if(count <= 0){
				if(start.timer) window.clearTimeout(start.timer);
				callback && callback();
			}
		});
	}
	
	var next = function(callback){
		var newInd = defaultInd + 1;
		if(newInd >= list.length){
			newInd = 0;
		}
		change(newInd, callback);
	}
	
	var start = function(){
		if(start.timer) window.clearTimeout(start.timer);
		start.timer = window.setTimeout(function(){
			next(function(){
				start();
			});
		}, 8000);
	}
	
	start();
	
	$('#js_ban_button_box').on('click', 'a', function(){
		var btn = $(this);
		if(btn.hasClass('right')){
			//next
			next(function(){
				start();
			});
		}
		else{
			//prev
			var newInd = defaultInd - 1;
			if(newInd < 0){
				newInd = list.length - 1;
			}
			change(newInd, function(){
				start();
			});
		}
		return false;
	});
	
})();
</script>

<script type="text/javascript">
var FancyForm=function(){
	return{
		inputs:".reg-form input",
		setup:function(){
			var a=this;
			this.inputs=$(this.inputs);
			a.inputs.each(function(){
				var c=$(this);
				a.checkVal(c)
			});
			a.inputs.live("keyup blur",function(){
				var c=$(this);
				a.checkVal(c);
			});
		},checkVal:function(a){
			a.val().length>0?a.parent("div").addClass("val"):a.parent("div").removeClass("val")
		}
	}
}();
</script>

	<div class="container">
		<div class="register-box" style=" padding-top:60px;">
			<div class="reg-slogan">
				用户登录</div>
			<div class="reg-form" id="js-form-mobile" style=" margin-top:10px">
<form ACTION="<%=MM_LoginAction%>" name="signupForm" METHOD="POST" id="signupForm">
				<br />
				<br />
				<div class="cell">
					<label for="js-mobile_ipt">填写用户名</label>
					<input type="text" name="mobile" id="js-mobile_ipt" class="text" maxlength="11" />
				</div>
				<div class="cell">
					<label for="js-mobile_pwd_ipt">输入密码</label>
					<input type="password" name="passwd" id="js-mobile_pwd_ipt" class="text" />
                    	</div>
				<div class="bottom">
				  <input type="submit" name="button" id="button" value="提交" style=" width:100%; background-color:#F60; height:50px; color:white; font-size:20px text-align:center" />
	</div>
                      <input type="hidden" name="MM_insert" value="signupForm">
            </form>
		</div>
	</div>
</div>


<script type="text/javascript">
$(document).ready(function() {
	FancyForm.setup();
});
</script>

</div></body>
</html>
<%
Recordset1.Close()
Set Recordset1 = Nothing
%>
