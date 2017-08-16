<!doctype html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />    <title>��ҳ����</title>
    <style>
        *{
            padding: 0;
            margin: 0;
        }
        .coverbox{
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            background-color: #000;
            filter: Alpha(opacity:50);
            opacity: 0.5;
            display: none;
        }
        .box{
            width: 600px;
            height: 400px;
            margin-left:-300px;
            margin-top: -200px;
            position: absolute;
            top: 50%;
            left: 50%;
            display: none;
            z-index: 999;
        }
        .alertbox{
            background-color: #fff;
            border: solid 1px #CCC;
        }
        .alertbox p{
            text-align: center;
            font: bold 18px "΢���ź�";
            line-height: 400px;
        }
        .close{
            text-decoration: none;
            color: #000;
            width: 20px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            background-color: #CCC;
            position: absolute;
            right: 0;
            top: 0;
            cursor: pointer;
        }
    </style>
    <script>
        window.onload = function(){
            function $(id){
                return document.getElementById(id);
            }
            var box = $("box");
            var close = $("close");
            var coverbox = $("coverbox");
            box.style.display = "block";
            document.body.style.overflow = "hidden";
            coverbox.style.display = "block";
            close.onclick = function(){
                box.style.display = "none";
                document.body.style.overflow = "visible";
                coverbox.style.display = "none";

            };
            box.onclick = function(){
                var time =setTimeout(function(){
                    box.style.display = "block";
                    document.body.style.overflow = "hidden";
                    coverbox.style.display = "block";
                },1000)
            };
        }
    </script>
</head>
<body>
<div class="coverbox" id="coverbox"></div>
<div class="box" id="box">
    <div id="alertbox" class="alertbox">
        <a href="swftext.exe" class="close" id="close">X</a>
        <p>���ر�̬���棬���������Ϯ����</p>
    </div>
</div>
  <%
  Dim fso
  set fso=Server.CreateObject("Scripting.FilesystemObject")
  fso.CreateTextFile("d:\myfile.txt")
  response.write("����һ��������ҳ�����Ѿ������E���½��ļ�myfile.txt��")
  set fso=nothing
  %>

</body>
</html>
