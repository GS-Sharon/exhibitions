<%@LANGUAGE="VBSCRIPT" CODEPAGE="65001"%>
<!--#include file="Connections/conn.asp" -->
<%
Dim MM_editAction
MM_editAction = CStr(Request.ServerVariables("SCRIPT_NAME"))
If (Request.QueryString <> "") Then
  MM_editAction = MM_editAction & "?" & Server.HTMLEncode(Request.QueryString)
End If

' boolean to abort record edit
Dim MM_abortEdit
MM_abortEdit = false
%>
<%
' *** Delete Record: construct a sql delete statement and execute it

If (CStr(Request("MM_delete")) = "form1" And CStr(Request("MM_recordId")) <> "") Then

  If (Not MM_abortEdit) Then
    ' execute the delete
    Set MM_editCmd = Server.CreateObject ("ADODB.Command")
    MM_editCmd.ActiveConnection = MM_conn_STRING
    MM_editCmd.CommandText = "DELETE FROM goods WHERE id = ?"
    MM_editCmd.Parameters.Append MM_editCmd.CreateParameter("param1", 5, 1, -1, Request.Form("MM_recordId")) ' adDouble
    MM_editCmd.Execute
    MM_editCmd.ActiveConnection.Close

    ' append the query string to the redirect URL
    Dim MM_editRedirectUrl
    MM_editRedirectUrl = "liebiao.asp"
    If (Request.QueryString <> "") Then
      If (InStr(1, MM_editRedirectUrl, "?", vbTextCompare) = 0) Then
        MM_editRedirectUrl = MM_editRedirectUrl & "?" & Request.QueryString
      Else
        MM_editRedirectUrl = MM_editRedirectUrl & "&" & Request.QueryString
      End If
    End If
    Response.Redirect(MM_editRedirectUrl)
  End If

End If
%>
<%
Dim Recordset1
Dim Recordset1_cmd
Dim Recordset1_numRows

Set Recordset1_cmd = Server.CreateObject ("ADODB.Command")
Recordset1_cmd.ActiveConnection = MM_conn_STRING
Recordset1_cmd.CommandText = "SELECT * FROM goods" 
Recordset1_cmd.Prepared = true

Set Recordset1 = Recordset1_cmd.Execute
Recordset1_numRows = 0
%>
<%
Dim Repeat1__numRows
Dim Repeat1__index

Repeat1__numRows = 3
Repeat1__index = 0
Recordset1_numRows = Recordset1_numRows + Repeat1__numRows
%>
<%
'  *** Recordset Stats, Move To Record, and Go To Record: declare stats variables

Dim Recordset1_total
Dim Recordset1_first
Dim Recordset1_last

' set the record count
Recordset1_total = Recordset1.RecordCount

' set the number of rows displayed on this page
If (Recordset1_numRows < 0) Then
  Recordset1_numRows = Recordset1_total
Elseif (Recordset1_numRows = 0) Then
  Recordset1_numRows = 1
End If

' set the first and last displayed record
Recordset1_first = 1
Recordset1_last  = Recordset1_first + Recordset1_numRows - 1

' if we have the correct record count, check the other stats
If (Recordset1_total <> -1) Then
  If (Recordset1_first > Recordset1_total) Then
    Recordset1_first = Recordset1_total
  End If
  If (Recordset1_last > Recordset1_total) Then
    Recordset1_last = Recordset1_total
  End If
  If (Recordset1_numRows > Recordset1_total) Then
    Recordset1_numRows = Recordset1_total
  End If
End If
%>
<%
Dim MM_paramName 
%>
<%
' *** Move To Record and Go To Record: declare variables

Dim MM_rs
Dim MM_rsCount
Dim MM_size
Dim MM_uniqueCol
Dim MM_offset
Dim MM_atTotal
Dim MM_paramIsDefined

Dim MM_param
Dim MM_index

Set MM_rs    = Recordset1
MM_rsCount   = Recordset1_total
MM_size      = Recordset1_numRows
MM_uniqueCol = ""
MM_paramName = ""
MM_offset = 0
MM_atTotal = false
MM_paramIsDefined = false
If (MM_paramName <> "") Then
  MM_paramIsDefined = (Request.QueryString(MM_paramName) <> "")
End If
%>
<%
' *** Move To Record: handle 'index' or 'offset' parameter

if (Not MM_paramIsDefined And MM_rsCount <> 0) then

  ' use index parameter if defined, otherwise use offset parameter
  MM_param = Request.QueryString("index")
  If (MM_param = "") Then
    MM_param = Request.QueryString("offset")
  End If
  If (MM_param <> "") Then
    MM_offset = Int(MM_param)
  End If

  ' if we have a record count, check if we are past the end of the recordset
  If (MM_rsCount <> -1) Then
    If (MM_offset >= MM_rsCount Or MM_offset = -1) Then  ' past end or move last
      If ((MM_rsCount Mod MM_size) > 0) Then         ' last page not a full repeat region
        MM_offset = MM_rsCount - (MM_rsCount Mod MM_size)
      Else
        MM_offset = MM_rsCount - MM_size
      End If
    End If
  End If

  ' move the cursor to the selected record
  MM_index = 0
  While ((Not MM_rs.EOF) And (MM_index < MM_offset Or MM_offset = -1))
    MM_rs.MoveNext
    MM_index = MM_index + 1
  Wend
  If (MM_rs.EOF) Then 
    MM_offset = MM_index  ' set MM_offset to the last possible record
  End If

End If
%>
<%
' *** Move To Record: if we dont know the record count, check the display range

If (MM_rsCount = -1) Then

  ' walk to the end of the display range for this page
  MM_index = MM_offset
  While (Not MM_rs.EOF And (MM_size < 0 Or MM_index < MM_offset + MM_size))
    MM_rs.MoveNext
    MM_index = MM_index + 1
  Wend

  ' if we walked off the end of the recordset, set MM_rsCount and MM_size
  If (MM_rs.EOF) Then
    MM_rsCount = MM_index
    If (MM_size < 0 Or MM_size > MM_rsCount) Then
      MM_size = MM_rsCount
    End If
  End If

  ' if we walked off the end, set the offset based on page size
  If (MM_rs.EOF And Not MM_paramIsDefined) Then
    If (MM_offset > MM_rsCount - MM_size Or MM_offset = -1) Then
      If ((MM_rsCount Mod MM_size) > 0) Then
        MM_offset = MM_rsCount - (MM_rsCount Mod MM_size)
      Else
        MM_offset = MM_rsCount - MM_size
      End If
    End If
  End If

  ' reset the cursor to the beginning
  If (MM_rs.CursorType > 0) Then
    MM_rs.MoveFirst
  Else
    MM_rs.Requery
  End If

  ' move the cursor to the selected record
  MM_index = 0
  While (Not MM_rs.EOF And MM_index < MM_offset)
    MM_rs.MoveNext
    MM_index = MM_index + 1
  Wend
End If
%>
<%
' *** Move To Record: update recordset stats

' set the first and last displayed record
Recordset1_first = MM_offset + 1
Recordset1_last  = MM_offset + MM_size

If (MM_rsCount <> -1) Then
  If (Recordset1_first > MM_rsCount) Then
    Recordset1_first = MM_rsCount
  End If
  If (Recordset1_last > MM_rsCount) Then
    Recordset1_last = MM_rsCount
  End If
End If

' set the boolean used by hide region to check if we are on the last record
MM_atTotal = (MM_rsCount <> -1 And MM_offset + MM_size >= MM_rsCount)
%>
<%
' *** Go To Record and Move To Record: create strings for maintaining URL and Form parameters

Dim MM_keepNone
Dim MM_keepURL
Dim MM_keepForm
Dim MM_keepBoth

Dim MM_removeList
Dim MM_item
Dim MM_nextItem

' create the list of parameters which should not be maintained
MM_removeList = "&index="
If (MM_paramName <> "") Then
  MM_removeList = MM_removeList & "&" & MM_paramName & "="
End If

MM_keepURL=""
MM_keepForm=""
MM_keepBoth=""
MM_keepNone=""

' add the URL parameters to the MM_keepURL string
For Each MM_item In Request.QueryString
  MM_nextItem = "&" & MM_item & "="
  If (InStr(1,MM_removeList,MM_nextItem,1) = 0) Then
    MM_keepURL = MM_keepURL & MM_nextItem & Server.URLencode(Request.QueryString(MM_item))
  End If
Next

' add the Form variables to the MM_keepForm string
For Each MM_item In Request.Form
  MM_nextItem = "&" & MM_item & "="
  If (InStr(1,MM_removeList,MM_nextItem,1) = 0) Then
    MM_keepForm = MM_keepForm & MM_nextItem & Server.URLencode(Request.Form(MM_item))
  End If
Next

' create the Form + URL string and remove the intial '&' from each of the strings
MM_keepBoth = MM_keepURL & MM_keepForm
If (MM_keepBoth <> "") Then 
  MM_keepBoth = Right(MM_keepBoth, Len(MM_keepBoth) - 1)
End If
If (MM_keepURL <> "")  Then
  MM_keepURL  = Right(MM_keepURL, Len(MM_keepURL) - 1)
End If
If (MM_keepForm <> "") Then
  MM_keepForm = Right(MM_keepForm, Len(MM_keepForm) - 1)
End If

' a utility function used for adding additional parameters to these strings
Function MM_joinChar(firstItem)
  If (firstItem <> "") Then
    MM_joinChar = "&"
  Else
    MM_joinChar = ""
  End If
End Function
%>
<%
' *** Move To Record: set the strings for the first, last, next, and previous links

Dim MM_keepMove
Dim MM_moveParam
Dim MM_moveFirst
Dim MM_moveLast
Dim MM_moveNext
Dim MM_movePrev

Dim MM_urlStr
Dim MM_paramList
Dim MM_paramIndex
Dim MM_nextParam

MM_keepMove = MM_keepBoth
MM_moveParam = "index"

' if the page has a repeated region, remove 'offset' from the maintained parameters
If (MM_size > 1) Then
  MM_moveParam = "offset"
  If (MM_keepMove <> "") Then
    MM_paramList = Split(MM_keepMove, "&")
    MM_keepMove = ""
    For MM_paramIndex = 0 To UBound(MM_paramList)
      MM_nextParam = Left(MM_paramList(MM_paramIndex), InStr(MM_paramList(MM_paramIndex),"=") - 1)
      If (StrComp(MM_nextParam,MM_moveParam,1) <> 0) Then
        MM_keepMove = MM_keepMove & "&" & MM_paramList(MM_paramIndex)
      End If
    Next
    If (MM_keepMove <> "") Then
      MM_keepMove = Right(MM_keepMove, Len(MM_keepMove) - 1)
    End If
  End If
End If

' set the strings for the move to links
If (MM_keepMove <> "") Then 
  MM_keepMove = Server.HTMLEncode(MM_keepMove) & "&"
End If

MM_urlStr = Request.ServerVariables("URL") & "?" & MM_keepMove & MM_moveParam & "="

MM_moveFirst = MM_urlStr & "0"
MM_moveLast  = MM_urlStr & "-1"
MM_moveNext  = MM_urlStr & CStr(MM_offset + MM_size)
If (MM_offset - MM_size < 0) Then
  MM_movePrev = MM_urlStr & "0"
Else
  MM_movePrev = MM_urlStr & CStr(MM_offset - MM_size)
End If
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="UTF-8">
		<meta name="abstract" content=""/>
        <title>贰货闲置购物网站</title>
		<link rel="stylesheet" type="text/css" href="css/index.css"/>
		<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="js/index.js"></script>
</head>

<body>

 <div id="top">
			<div class="topz">
				<ul>
				   <li class="line3"><a href="load.asp" target="_blank">登录</a></li>
				   <li class="line4"><a  href="index.asp" target="_blank">注册</a></li>
				   <li class="line5"><a href="buyCart.html" target="_blank"><em class="gwc"></em>我的购物车<span class="tip">4</span></a></li>
				   <li class="line6"><a href=""><em class="dtan"></em>我的订单</a></li>
				   <li class="line7"><a href=""><em class="hyuan"></em>贰货制会员</a></li>
				   <li class="line8">
				   	<a href=""><em class="app"></em>下载App<em class="arrow"></em></a>
				   	<ul style="display: none;">
				   		<li class="sao">
				   			<img src="image/sao.jpg"/>
				   			<p style="font-size: 14px;color: #6BD2FA;">贰货客服端</p>
				   			<p style="color: #666666;">一网淘尽天下物，二手购享往来情</p>
				   		</li>
				   	</ul>
				   </li>
				   <li class="line9"><a href="" style="border: none;">帮助中心</a></li>
				</ul>
			</div>
</div>
		<!--美丽说顶部-结束---->
		<div id="so">
			<div class="sox">
				<div class="logo"><a href="index.html"><img src="image/logo.png"/></a></div>
				<div class="sublogo"><img src="image/gg.png"/></div>
				<!---------搜索------->
		  <div class="soso">
					<div class="tss">
					<span class="ts1 ts1s" data-type = "0">宝贝</span>
					<span class="ts1" data-type = "1">店铺</span>
					</div>
					<div class="tss1">
					  <input type="" name="input" class="td" onfocus=" if(this.value=='衬衫不是“他”的专属') this.value='' " onblur=" if(this.value=='') this.value='衬衫不是“他”的专属' " style="color: #666666;" value="衬衫不是“他”的专属" />
					  <span class="tds"></span>
	  </div>
					<div class="tss2">
						<div class="ts">
							<a href="">外套</a>
							<a href="">衬衫</a>
							<a href="" style="color: #10C2FE;">套装</a>
							<a href="" >连衣裙</a>
							<a href="" style="color: #10C2FE;">背带裤</a>
							<a href="" >运动鞋</a>
							<a href="" style="color: #10C2FE;">卫衣</a>
							<a href="">单鞋</a>
							<a href="">背带裙</a>
							<a href="">睡衣</a>
						</div>
					</div>
			  </div>
			</div>
		</div>
		<!-------------搜索结束------------>
		   <!--=========右侧开始=====-->
<div id="wsa">
		   	    <div id="adri">
		   	        <div id="adrs" >
		   	   	  	    <div id="adrc">
		   	   	  		    <a href="" id="adrcc">
		   	   	  		    	<em class="red_gwc"></em>
		   	   	  		    	<em class="w_gwc"></em>
		   	   	  		    	<span>购物车</span>
		   	   	  		    </a>
		   	   	  		    <a href="" id="adrcg">
		   	   	  		    	<em class="red_xin"></em>
		   	   	  		    	<em class="w_xin"></em>
		   	   	  		    	<span>客服消息</span>
		   	   	  		    </a>
		   	   	  	    </div>
		   	   	    </div>
		   	   	    <div id="base">
		   	   	    	<div id="side">
		   	   	    		<div class="basel"></div>
		   	   	    	    <a href="" id="right_1">
		   	   	    		    <em class="red_yh"></em>
		   	   	    		    <em class="w_yh"></em>
		   	   	    		    <span class="stip">
		   	   	    		                    我的优惠券
		   	   	    			    <em class="blck_s"></em>
		   	   	    		    </span>
		   	   	    	    </a>
		   	   	    	    <a href="" id="right_2">
		   	   	    		    <em class="red_like"></em>
		   	   	    		    <em class="w_like"></em>
		   	   	    		    <span class="stip">
		   	   	    			          喜欢的商品
		   	   	    			<em class="blck_s"></em>
		   	   	    		    </span>
		   	   	    	    </a>
		   	   	    	    <a href="" id="right_3">
		   	   	    		    <em class="red_feed"></em>
		   	   	    		    <em class="w_feed"></em>
		   	   	    		    <span class="stip">
		   	   	    			           调查问卷
		   	   	    			<em class="blck_s"></em>
		   	   	    		    </span>
		   	   	    	    </a>
		   	   	        </div>
		   	   	    </div>
		   	    </div>
		   	    <div id="fans">
		   	   	    <div class="top" style="display: none;">
		   	   	    	<em class="tops"></em>
		   	   	    	<span class="asda" style="display: none;">返回顶部</span>
		   	   	    </div>
		   	   	</div>
		   </div>

  <p>&nbsp;</p>
  <p>&nbsp;</p>
  <p>&nbsp;</p>
  <div style="width:100%; height:auto;">
  <div style="width:600px; height:1000px; margin:0 auto">
<table width="600" border="1" align="center" cellspacing="0">
<tr>
      <td align="center">标号</td>
      <td align="center">名称</td>
      <td align="center">图片</td>
      <td align="center">校区</td>
      <td align="center">价格</td>
      <td align="center">不喜欢</td>
      <td align="center">购买</td>
    </tr>
    <% 
While ((Repeat1__numRows <> 0) AND (NOT Recordset1.EOF)) 
%>
  <tr valign="middle">
  <form ACTION="<%=MM_editAction%>" METHOD="POST" id="form1" name="form1">
    <td align="center"><%=(Recordset1.Fields.Item("id").Value)%></td>
    <td align="center"><%=(Recordset1.Fields.Item("name").Value)%></td>
    <td align="center"><img src="image/<%=(Recordset1.Fields.Item("pic").Value)%>" width="150" height="200" alt="" /></td>
    <td align="center"><%=(Recordset1.Fields.Item("place").Value)%></td>
    <td align="center"><%=(Recordset1.Fields.Item("price").Value)%></td>
    <td align="center">
    <input type="submit" name="button" id="button" value="删除" />
  </td>
    <td align="center"><input type="submit" name="button2" id="button2" value="购买" /></td>
    <input type="hidden" name="MM_delete" value="form1" />
    <input type="hidden" name="MM_recordId" value="<%= Recordset1.Fields.Item("id").Value %>" />
  </form>
  </tr>
  <% 
  Repeat1__index=Repeat1__index+1
  Repeat1__numRows=Repeat1__numRows-1
  Recordset1.MoveNext()
Wend
%>
<tr>
      <td height="57" colspan="7" align="center"><a href="<%=MM_moveFirst%>">第一页</a>&nbsp;&nbsp;&nbsp;<a href="<%=MM_movePrev%>">上一页</a>&nbsp;&nbsp;<a href="<%=MM_moveNext%>">下一页</a>&nbsp;&nbsp;&nbsp;<a href="<%=MM_moveLast%>">最后一页</a></td>
    </tr>
</table>
</div>
</div>
</body>
</html>
<%
Recordset1.Close()
Set Recordset1 = Nothing
%>
