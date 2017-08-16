<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="Author" contect="http://www.webqin.net" />
<title>贰货注册</title>
<link rel="shortcut icon" href="#" />
<link type="text/css" href="css/css.css" rel="stylesheet" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=yes" />
    <link rel="stylesheet" type="text/css" href="css/cropper.min.css" />
    <link rel="stylesheet" type="text/css" href="css/mui.min.css"/>
    <script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>
     <script type="text/javascript" src="js/lrz.mobile.min.js"></script> 
    <script type="text/javascript" src="dist/lrz.all.bundle.js"></script>
    <script type="text/javascript" src="js/cropper.min.js"></script>
    <script type="text/javascript">
    $(function() {

        function toFixed2(num) {
            return parseFloat(+num.toFixed(2));
        }
		
        $('#cancleBtn').on('click', function() {
            $("#showEdit").fadeOut();
            $('#showResult').fadeIn();
        });

        $('#confirmBtn').on('click', function() {
            $("#showEdit").fadeOut();

            var $image = $('#report > img');
            var dataURL = $image.cropper("getCroppedCanvas");
            var imgurl = dataURL.toDataURL("image/jpeg", 0.5);
            $("#changeAvatar > img").attr("src", imgurl);
            $("#basetxt").val(imgurl);
            $('#showResult').fadeIn();

        });

        function cutImg() {
            $('#showResult').fadeOut();
            $("#showEdit").fadeIn();
            var $image = $('#report > img');
            $image.cropper({
                aspectRatio: 1 / 1,
                autoCropArea: 0.7,
                strict: true,
                guides: false,
                center: true,
                highlight: false,
                dragCrop: false,
                cropBoxMovable: false,
                cropBoxResizable: false,
                zoom: -0.2,
                checkImageOrigin: true,
                background: false,
                minContainerHeight: 400,
                minContainerWidth: 300
            });
        }

        function doFinish(startTimestamp, sSize, rst) {
            var finishTimestamp = (new Date()).valueOf();
            var elapsedTime = (finishTimestamp - startTimestamp);
            //$('#elapsedTime').text('压缩耗时： ' + elapsedTime + 'ms');

            var sourceSize = toFixed2(sSize / 1024),
                resultSize = toFixed2(rst.base64Len / 1024),
                scale = parseInt(100 - (resultSize / sourceSize * 100));
            $("#report").html('<img src="' + rst.base64 + '" style="width: 100%;height:100%">');
            cutImg();
        }

        $('#image').on('change', function() {
            var startTimestamp = (new Date()).valueOf();
            var that = this;
            lrz(this.files[0], {
                    width: 800,
                    height: 800,
                    quality: 0.7
                })
                .then(function(rst) {
                    //console.log(rst);
                    doFinish(startTimestamp, that.files[0].size, rst);
                    return rst;
                })
                .then(function(rst) {
                    // 这里该上传给后端啦
                    // 伪代码：ajax(rst.base64)..

                    return rst;
                })
                .then(function(rst) {
                    // 如果您需要，一直then下去都行
                    // 因为是Promise对象，可以很方便组织代码 \(^o^)/~
                })
                .catch(function(err) {
                    // 万一出错了，这里可以捕捉到错误信息
                    // 而且以上的then都不会执行

                    alert(err);
                })
                .always(function() {
                    // 不管是成功失败，这里都会执行
                });
        });
		var lef=parseFloat($("#liuK").css("width"))*0.5-190;
				$("#image").css({"left":lef+"px"});
				$("#coverInput").css({"left":lef-1+"px"})
    });
    </script>

</head>

<body>
<!--流程-->
  <div class="content">
   <div class="web-width">
     <div class="for-liucheng">
      <div class="liulist for-cur"></div>
      <div class="liulist for-cur"></div>
      <div class="liulist"></div>
      <div class="liutextbox">
       <div class="liutext for-cur"><em>1</em><br /><strong>填写账户信息</strong></div>
       <div class="liutext for-cur"><em>2</em><br /><strong>设置头像</strong></div>
       <div class="liutext"><em>3</em><br /><strong>完成</strong></div>
      </div>
     </div><!--for-liucheng/-->
     <div id="showResult">
<!--头像-->
    <div id="changeAvatar" style="margin-top: 100px;">
            <img src="image/default.jpg" style="width: 100px;margin-top: 10px;margin: 0 auto;display:block;" />
        </div>
<!--预览文件按钮-->
        <div style="width: 50%;margin: 0 auto;margin-top: 30px; position:relative;" id="liuK">
          <input id="image" type="file" accept="image/*" capture="camera" style=" position:absolute; top:0px;padding-left:100px"/>
           </div>
        </div>  
    </div>
    <div id="showEdit" style="display: none;width:80%;height:80%;position: absolute;top:10%;left:10%;z-index: 9;">
        <div style="width:100%;position: absolute;top:10px;left:0px;">
            <button class="mui-btn" data-mui-style="fab" id='cancleBtn' style="margin-left: 10px;">取消</button>
            <button class="mui-btn" data-mui-style="fab" data-mui-color="primary" id='confirmBtn' style="float:right;margin-right: 10px;">确定</button>
        </div>
        <div id="report">
          <img src="image/mei.jpg" style="width: 300px;height:300px" /> 
      </div>
        
    </div>    
 <!--提交按钮-->
      <form action="forgetPwd3.asp" method="get" class="forget-pwd"  id="user_form_0" style="min-height:100px;width:100%; margin:230px auto;">
      <div class="subtijiao" style="padding-left:47%">  
       <input type="submit" value="提交" id="user_submit" style=" border:0"/>
      </div> 
      </form>
   </div><!--web-width/-->
  </div><!--content/-->
  
</body>
</html>
