/**
 * Created by asus-pc on 2017/1/4.
 */
//function $(id){
//    return document.getElementById(id);
//}
//function getStyle(obj,attr){
//    if(obj.currentStyle){
//        return obj.currentStyle[attr];
//    }else{
//        return window.getComputedStyle(obj,null)[attr];
//    }
//}
////缓动动画函数
//function animate(obj,json,fn){
//    clearInterval(obj.timer);
//    obj.timer = setInterval(function(){
//        for(var attr in json){
//            var flag = true;
//            var current = (attr == "opacity") ? parseInt(parseFloat(getStyle(obj,attr))*100) || 0: parseInt(getStyle(obj,attr));
//            var step = (json[attr] - current) / 10;
//            step = step > 0 ? Math.ceil(step) : Math.floor(step);
//            if(attr == "opacity"){
//                if("opacity" in obj.style){
//                    obj.style.opacity = (current + step) / 100;
//                }else{
//                    obj.style.filter = "Alpha(opacity = "+(current + step)*10+")";
//                }
//            }else if(attr == "zIndex"){
//                obj.style.zIndex = json[attr];
//            }else{
//                obj.style[attr] = current + step + "px";
//            }
//            if(current != json[attr]){
//                flag = false;
//            }
//        }
//        if(flag){
//            clearInterval(obj.timer);
//            if(fn){
//                fn();
//            }
//        }
//    },10);
//}
////当前图片缓动，目标图片迅速移动并再进行缓动到0的位置
//function sport(obj,iNow,iNow1,target){
//    //当前图片缓动
//    animate(obj[iNow],{left : target});
//    //目标图片迅速移动
//    obj[iNow1].style.left = -target + "px";
//    //目标图片缓动到0的目标位置
//    animate(obj[iNow1],{left : 0})
//}
//window.onload = function(){
//    var js_slider = $("js_slider");
//    var slider_main = $("slider_main_block");
//    var imgs = slider_main.children;
//    var slider_ctrl = $("slider_ctrl");
//
//    //遍历生成按钮
//    for(var i=0; i<imgs.length; i++){
//        var span = document.createElement("span");
//        span.className = "slider-ctrl-con";
//        span.innerHTML = imgs.length - i;
//        slider_ctrl.insertBefore(span,slider_ctrl.children[1]);
//    }
//    //为第一个按钮添加current样式
//    var spans = slider_ctrl.children;
//    spans[1].setAttribute("class","slider-ctrl-con current");
//    //设置移动的路程
//    var scrollWidth = js_slider.clientWidth;//注意这里是不带边框的，所以无需用offsetWidth
//
//    //将所有的图片都放在右侧位置，除了第一张
//    for(var j=1; j<imgs.length; j++){
//        imgs[j].style.left = scrollWidth + "px";
//    }
//    //进行遍历添加点击事件
//    var iNow = 0;//当做检测当前图片的索引号
//    for(var k in spans){
//        spans[k].index = k;
//        spans[k].onclick = function(){
//            clearInterval(timer);
//            if(this.className == "slider-ctrl-prev"){//如果检测的点击事件是向前一张点击
//                ////当前图片缓慢走向右侧
//                //animate(imgs[iNow],{left : scrollWidth});
//                ////iNow自减
//                //--iNow < 0 ? iNow = imgs.length -1 : iNow;
//                ////前一张图片迅速移动到左侧的位置
//                //imgs[iNow].style.left = -scrollWidth + "px";
//                ////前一张图片缓慢的走到0的位置
//                //animate(imgs[iNow],{left : 0});
//                sport(imgs,iNow,--iNow < 0 ? iNow = imgs.length - 1 : iNow,scrollWidth);
//            }else if(this.className == "slider-ctrl-next"){//如果检测的是后一张点击
//                ////当前图片缓动到左侧
//                //animate(imgs[iNow],{left : -scrollWidth});
//                ////iNow自增
//                //++iNow > imgs.length-1 ? iNow = 0 : iNow;
//                ////目标图片迅速移动到右侧
//                //imgs[iNow].style.left = scrollWidth + "px";
//                ////目标图片进行缓动
//                //animate(imgs[iNow],{left : 0});
//                sport(imgs,iNow,++iNow > imgs.length - 1 ? iNow = 0 : iNow , -scrollWidth);
//            }else{
//                //如果点击的按钮的索引大于之前的索引
//                var that = this.innerHTML - 1;
//                if(that > iNow){
//                    ////当前图片进行缓动
//                    //animate(imgs[iNow],{left : -scrollWidth});
//                    ////iNow等于当前的索引号
//                    //iNow = this.index - 1;
//                    ////目标图片迅速移动到右侧
//                    //imgs[iNow].style.left = scrollWidth + "px";
//                    ////目标图片进行缓动
//                    //animate(imgs[iNow],{left : 0});
//                    sport(imgs,iNow,iNow = that,-scrollWidth)
//                }else if(that < iNow){//即不包括等于iNow的时候，因为这是时不需要东爱护的
//                    ////当前图片缓动
//                    //animate(imgs[iNow],{left : scrollWidth});
//                    ////iNow等于当前索引号
//                    //iNow = this.index;
//                    ////目标图片就迅速移动到左侧
//                    //imgs[iNow].style.left = -scrollWidth + "px";
//                    ////目标图片缓动到0的位置
//                    //animate(imgs[iNow],{left : 0});
//                    sport(imgs,iNow,iNow = that,scrollWidth);
//                }
//            }
//            //为按钮添加current样式
//            for(var i=0; i<imgs.length ; i++){
//                spans[i+1].className = "slider-ctrl-con";
//            }
//            spans[iNow+1].className = "slider-ctrl-con current";
//            timer = setInterval(autoSport,3000);
//        };
//    }
//    //设置自动播放函数
//    function autoSport(){
//        sport(imgs,iNow,++iNow > imgs.length - 1 ? iNow = 0 : iNow,-scrollWidth);
//        for(var i=0; i<imgs.length; i++){
//            spans[i+1].className = "slider-ctrl-con";
//        }
//        spans[iNow + 1].className = "slider-ctrl-con current";
//    }
//    var timer = null;
//    timer = setInterval(autoSport,3000);
//};


//案例一：鼠标展示
//function $(id){
//    return document.getElementById(id);
//}
//window.onload = function(){
//    var pic = $("pic");
//    var pics = pic.children[0].children;
//    var con = $("con");
//    var con_ul = con.children[0];
//    //遍历生成cns
//    for(var i=0; i<pics.length;i++){
//        var newcon = document.createElement("li");
//        var smallPic = document.createElement("img");
//        smallPic.src = "image/0"+(i+1)+".jpg";
//        newcon.appendChild(smallPic);
//        con_ul.appendChild(newcon);
//    }
//    //为每一个con添加点击事件
//    var cons = con_ul.children;
//    pics[0].style.display = "block";
//    for(var j=0; j<cons.length; j++){
//        cons[j].index = j;
//        cons[j].onclick = function(){
//            for(var i=0; i<pics.length; i++){
//                pics[i].style.display = "none";
//            }
//            pics[this.index].style.display = "block";
//        }
//    }
//};



//案例二：点击隐藏文字
//function $(id){
//    return document.getElementById(id);
//}
//window.onload = function(){
//    var bar = $("bar");
//    var text = bar.children[0];
//    var but = bar.children[1];
//    text.onfocus = function(){
//        if(text.value == "请输入..."){
//            text.value = "";
//            text.style.color = "#000";
//        }
//    };
//    text.onblur = function(){
//        if(text.value == ""){
//            text.value = "请输入...";
//            text.style.color = "#ccc";
//        }
//    }
//};



//案例三：简单验证成绩表单
//function $(id){
//    return document.getElementById(id);
//}
//window.onload = function(){
//    var box =  $("box");
//    var inpu = box.children[0];
//    var check = box.children[1];
//    inpu.onblur = function(){
//        var val = inpu.value;
//        check.style.display = "inline-block";
//        if(val == ""){
//            check.style.backgroundImage = "url(image/wrong.png)";
//            check.className = "check wrong";
//            check.innerHTML = "内容不能为空";
//        }else if(isNaN(val)){
//            check.style.backgroundImage = "url(image/wrong.png)";
//            check.className = "check wrong";
//            check.innerHTML = "请输入数字";
//        }else if(val > 150 || val < 0){
//            check.style.backgroundImage = "url(image/wrong.png)";
//            check.className = "check wrong";
//            check.innerHTML = "请输入正确的范围";
//        }else{
//            check.style.backgroundImage = "url(image/right.png)";
//            check.className = "check right";
//            check.innerHTML = "输入的内容正确";
//        }
//    }
//};


//仿淘宝搜索框
//function $(id){
//    return document.getElementById(id);
//}
//window.onload = function(){
//    var inpu = $("inpu");
//    var dic = $("dic");
//    inpu.oninput = inpu.onpropertychange = function(){
//        dic.style.display = "none";
//    };
//    inpu.onblur = function(){
//        if(inpu.value == ""){
//            dic.style.display = "block";
//        }
//    }
//}


//案例五：全选和反选
//function $(id){
//    return document.getElementById(id);
//}
//window.onload = function(){
//    var but1 = $("but1");
//    var but2 = $("but2");
//    var but3 = $("but3");
//    var lis = $("group").children;
//    but1.onclick = function(){
//        for(var i=0; i<lis.length; i++){
//            lis[i].children[0].checked = "checked";
//        }
//    };
//    but2.onclick = function(){
//        for(var i=0; i<lis.length; i++){
//            lis[i].children[0].checked = "";
//        }
//    };
//    but3.onclick = function(){
//        for(var i=0; i<lis.length; i++){
//            console.log(lis[i].children[0].checked)
//            if(lis[i].children[0].checked == "checked"){
//                lis[i].children[0].checked = "";
//            }else{
//                lis[i].children[0].checked = "checked";
//            }
//        }
//    };
//};


//案例六：下拉菜单更换皮肤
//function $(id){
//    return document.getElementById(id);
//}
////关于浏览器获得宽度和宽度的兼容
//function getBrowser(){
//    if(window.innerWidth){//现代浏览器的最新获取方法，但是IE不支持
//        return {
//            width: window.innerWidth,
//            height: window.innerHeight
//        }
//    }else if(document.compatMode == "CSS1Compat"){//IE6以上
//        return {
//            width: document.documentElement.clientWidth,
//            height: document.documentElement.clientHeight
//        }
//    }else{//IE5、没有DTD的网页、chrome
//        return {
//            width: document.body.clientWidth,
//            height: document.body.clientHeight
//        }
//    }
//}
//function changePic(obj,json){
//    for(var attr in json){
//        obj.setAttribute(attr,json[attr]);
//    }
//}
//window.onload = function(){
//    var sele = $("sele");
//    var pic = $('box').children[0];
//    var width = getBrowser().width;
//    var height = getBrowser().height;
//    changePic(pic,{src: "image/1.jpg", width: width ,height:height});
//    sele.onchange = function(){
//        changePic(pic,{src: "image/"+ this.value +".jpg",width: width, height: height});
//    };
//};


//案例七：星座运势
//function $(id){
//    return document.getElementById(id);
//}
//window.onload = function(){
//    var box = $("box");
//    var box_middle = box.children[1];
//    var box_text = box.children[2];
//    var box_text_li = box_text.children[0].children;
//    var box_pic = box_middle.children[0];
//    var box_sele = box_middle.children[1];
//    var box_yunshi = box_middle.children[2];
//    var box_yunshi_yellow = box_yunshi.children[0].children[1];
//    var arr = [2,1,3,4,5,2,3,1,1,2,5,4];
//    box_sele.onchange = function(){
//        box_pic.style.backgroundPosition = "0 "+ -this.value*50 +"px";
//        for(var i=0; i<box_text_li.length; i++){
//            box_text_li[i].style.display = "none";
//        }
//        box_text_li[this.value].style.display = "block";
//        box_yunshi_yellow.style.width = arr[this.value]*16 + "px";
//    }
//};

//案例八：动态生成小圆点
//function $(id){
//    return document.getElementById(id);
//}
//window.onload =function(){
//    var box = $("box");
//    var pics = box.children[0].children;
//    var con = box.children[1];
//    //动态生成小圆点
//    for(var i=0; i<pics.length; i++){
//        var newcon = document.createElement("li");
//        newcon.innerHTML = i + 1;
//        con.appendChild(newcon);
//    }
//    //为圆点添加点击事件
//    var cons = con.children;
//    for(var i=0; i<cons.length; i++){
//        cons[i].index = i;
//        cons[i].onclick = function(){
//          //被点击的圆点发生改变
//            for(var i=0; i<cons.length; i++){
//                cons[i].className = "";
//                pics[i].style.display = "none";
//            }
//            this.className = "change";
//            pics[this.index].style.display = "block";
//        };
//    }
//    var conw = pics.length * 30;
//    con.style.marginLeft = -conw / 2 + "px";
//};

//****案例九：微博发布
//function $(id){
//    return document.getElementById(id);
//}
//window.onload = function(){
//    var box = $("box");
//    var text = box.children[0];
//    var but = box.children[1];
//    var ps = null;
//    but.onclick = function(){
//        var newp = document.createElement("p");
//        newp.innerHTML = text.value;
//        var cancel = document.createElement("span");
//        cancel.innerHTML = "删除";
//        cancel.className = "cancel";
//        newp.appendChild(cancel);
//        ps = box.getElementsByTagName("p");
//        if(ps.length == 0){
//            box.appendChild(newp);
//        }else{
//            box.insertBefore(newp,ps[0]);
//        }
//        text.value = "";
//        //添加删除事件
//        var spans = box.getElementsByTagName("span");//注意这个spans的点击事件要卸载but的点击事件以后，因为只有but点击才会有spans的存在
//        for(var i=0; i<spans.length; i++){
//            spans[i].index = i;
//            spans[i].onclick = function(){
//                box.removeChild(this.parentNode);
//            }
//        }
//    };
//
//};


//案例十：展示今日日期和倒计时
//function $(id){
//    return document.getElementById(id);
//}
//window.onload = function(){
//    var box = $("box");
//    var datee = box.children[0];
//    var datee_p = datee.children[0];
//    var datee_dd = datee.children[1];
//    var daoshu = box.children[1];
//    var datearr = ["日","一","二","三","四","五","六"];//date从0开始，0代表星期日
//    var year,month,date,day,cha,days,hours,minutes,second;
//    setInterval(function(){
//        var time = new Date();
//        year = time.getFullYear();
//        month = time.getMonth();
//        date = time.getDate();
//        day = time.getDay();
//        datee_p.innerHTML = year + "年" + (month + 1) + "月" + date + "日  星期" + datearr[day] ;
//        datee_dd.innerHTML = date;
//        var newyear = new Date("2017/1/28"); //设置日期以年/月/日 时:分:秒来表示
//        cha = newyear.getTime() - time.getTime();
//        days = Math.floor(cha/(1000*60*60*24));
//        hours = Math.floor(cha/(1000*60*60) % 24);
//        minutes = Math.floor(cha/(1000*60) % 60);
//        second = Math.floor(cha/1000 % 60);//先将时间差化为分钟再进行取余，结果是分钟......剩余不足一分钟的秒数
//        daoshu.innerHTML = "距离过年还有" + days + "天" + hours + "小时" + minutes + "分钟" + second + "秒";
//    },1000);
//};

//案例十一：时钟效果
//function $(id){
//    return document.getElementById(id);
//}
//window.onload = function(){
//   var time,hour,minute,second,msecond;
//    var box = $("box");
//    var shi = box.children[0];
//    var fen = box.children[1];
//    var miao = box.children[2];
//   var timer = null;
//    timer = setInterval(function(){
//        time = new Date();
//        msecond = time.getMilliseconds();  //为了让秒钟行走的更加精确，这里需要将秒数精确到小数，所以需要使用到Milliseconds，即Milliseconds * 1000 =
//        // second，下面精确级别的hour等的获取方法类似
//        hour = time.getHours() + minute / 60;
//        minute = time.getMinutes() + second / 60;
//        second = time.getSeconds() + msecond / 1000;
//        shi.style.WebkitTransform = "rotate("+ hour % 12 * 30 +"deg)"; //时针是以每格30度单位行走的，而分针跟秒针都是以6度单位行走的
//        fen.style.WebkitTransform = "rotate("+ minute * 6 +"deg)";
//        miao.style.WebkitTransform = "rotate("+ (second * 6) +"deg)";
//        shi.style.MozTransform = "rotate("+ hour % 12 * 30 +"deg)";
//        fen.style.MozTransform = "rotate("+ minute * 6 +"deg)";
//        miao.style.MozTransform = "rotate("+ (second * 6) +"deg)";
//    },1);
//};


//案例十二：五秒关闭的广告
//function $(id){
//    return document.getElementById(id);
//}
//方法一：
//window.onload = function(){
//    var left = $("left");
//    var right = $("right");
//    var timer = null;
//    var key = 0;
//    timer = setInterval(function(){
//        ++key;
//        if(key == 5){
//            left.style.display = "none";
//            right.style.display = "none";
//            clearInterval(timer);
//        }
//    },1000);
//};
//方法二：
//window.onload = function(){
//    //隐藏函数
//    function hide(obj){
//        obj.style.display = "none";
//    }
//    var timer = null;
//    timer = setTimeout(function(){
//        hide(left);
//        hide(right);
//    },5000);
//};


//案例十三：小米手机上下自动滚动广告
//function $(id){
//    return document.getElementById(id);
//}
//var timer = null;
//var key = 0;
//function autoMove(obj,fn){
//    timer = setInterval(function(){
//        fn();
//        if(key >= 0 && key <= 1070){//要减去box自身的高度
//            console.log(key);
//            obj.style["backgroundPosition"] = "0 "+ -key +"px";
//        }else{
//            clearInterval(timer);
//        }
//    },10);
//}
//window.onload = function(){
//    var box = $("box");
//    var top = box.children[0];
//    var bottom = box.children[1];
//    top.onmouseover = function(){
//        clearInterval(timer);
//        autoMove(box,function(){++key});
//    };
//    bottom.onmouseover = function(){
//        clearInterval(timer);
//        autoMove(box,function(){--key});
//    };
//    box.onmouseout = function(){
//        clearInterval(timer);
//    };
//};


//案例十四：无缝滚动
//function $(id){
//    return document.getElementById(id);
//}
//window.onload = function(){
//    var box = $("box");
//    var imgul = box.children[0];
//    var timer = null;
//    var key = 0;
//    function autoPlay(obj){
//        ++key;
//        console.log(obj.offsetLeft)
//        if(obj.offsetLeft >= -1200 && obj.offsetLeft <= 0){//目标值要减去box的宽度
//            obj.style["left"] = -key + "px";
//        }else{
//            obj.style["left"] = "0px";
//            key = 0;
//        }
//    }
//    timer = setInterval(function(){
//        autoPlay(imgul);
//    },10);
//    box.onmouseover = function(){
//        clearInterval(timer);
//    };
//    box.onmouseout = function(){
//        timer = setInterval(function(){
//            autoPlay(imgul);
//        },10);
//    }
//};


//案例十五：焦点图
//function $(id){
//    return document.getElementById(id);
//}
////匀速运动函数
//var leader = 0;
//function sameSpeed(obj,step,target){
//    step = target > leader ? step : -step;
//    leader += step;//或者使用offsetLeft，这样就可以不用声明leader
//    obj.style.left = -leader + "px";
//}
//window.onload = function(){
//    var box = $("box");
//    var imgul = box.children[0];
//    var imgs = imgul.children;
//    var conul = box.children[1];
//    var timer= null;
//    //根据图片数量生成圆点
//    for(var i=0; i<imgs.length; i++){
//        var newcon = document.createElement("li");
//        newcon.innerHTML = i + 1;
//        conul.appendChild(newcon);
//    }
//    var cons = conul.children;
//    for(var j=0; j<cons.length; j++){
//        cons[j].index = j;
//        cons[j].onclick = function(){
//            clearInterval(timer);
//            for(var i=0; i<cons.length; i++){
//                cons[i].className = "";
//            }
//            this.className = "change";
//            var that = this.index;
//            timer = setInterval(function(){
//                if(leader != that * 490){
//                    sameSpeed(imgul,10,that * 490);
//                }else{
//                    clearInterval(timer);
//                }
//            },10);
//        }
//    }
//};


//案例十六：左右轮播
//function $(id){
//    return document.getElementById(id);
//}
////匀速运动函数
//var leader = target = 0;
//function sameSpeed(obj,step){
//    step = target > leader ? step : -step;
//    leader += step;
//    obj.style.left = -leader + "px";
//}
//window.onload = function(){
//    var box = $("box");
//    var imgul = box.children[0];
//    var imgs = imgul.children;
//    var vv = box.children[1];
//    var conul = vv.children[0];
//    var key = 0;
//    var timer = null;
//    //动态生成圆点
//    for(var i=0 ; i<imgs.length; i++){
//        var newcon = document.createElement("li");
//        newcon.innerHTML = imgs.length - i;
//        newcon.className = "olcon";
//        conul.insertBefore(newcon,conul.children[1]);
//    }
//    var cons = conul.children;
//    conul.style.width = (cons.length - 2) * 30 + "px";
//    for(var j=0; j<cons.length; j++){
//        cons[j].index = j;
//        cons[j].onclick = function(){
//            if(this.className == "rightcon"){
//                ++key;
//                key = key > imgs.length - 1 ? 0 : key;
//                target = key * 520;
//                timer = setInterval(function(){
//                    if(leader != target){
//                        sameSpeed(imgul,10);
//                    }else{
//                        clearInterval(timer);
//                    }
//                },10);
//            }else if(this.className == "leftcon"){
//                --key;
//                key = key < 0 ? imgs.length - 1 : key;
//                target = key * 520;
//                timer = setInterval(function(){
//                    if(leader != target){
//                        sameSpeed(imgul,10);
//                    }else{
//                        clearInterval(timer);
//                    }
//                },10);
//            }else{
//                key = this.index - 1;
//                target = key * 520;
//                timer = setInterval(function(){
//                    if(leader != target){
//                        sameSpeed(imgul,10);
//                    }else{
//                        clearInterval(timer);
//                    }
//                },10);
//            }
//            for(var i=1; i<imgs.length+1; i++){
//                cons[i].className = "olcon";
//            }
//            cons[key+1].className = "olcon change";
//        }
//    }
//};

//案例十七：筋斗云
//function $(id) {
//    return document.getElementById(id);
//}
//var leader = target = 0;
//function animate (obj){
//    leader += (target - leader) / 10;
//    obj.style.backgroundPosition = leader + "px 0";
//}
//function stop (event){
//    if(event && event.stopPropagetion){
//        return event.stopPropagation();
//    }else{
//        return event.cancelBubble = true;
//    }
//}
//window.onload = function (){
//    var box = $("box");
//    var lisul = box.children[0];
//    var lis = box.getElementsByTagName("li");
//    var boxL = box.offsetLeft;
//    var timer = null;
//    var x = 0;
//    //遍历lis并为其添加onmouseover事件
//    for(var i=0; i<lis.length; i++){
//        lis[i].onmouseover = function (){
//            console.log("lis")
//            clearInterval(timer);
//            target = this.offsetLeft - boxL;
//            timer = setInterval(function(){
//                if(leader != target){//因为lis是box的子元素，所以触发onmouseover的事件同时也触发了父元素的onmouseout事件，但是会县粗发父元素的再触发子元素的，所以target的最终值会被子元素的给覆盖，也就是子元素的事件值
//                    animate(lisul);
//                }
//                //}else{//关不掉的，因为leader会无限接近于target但不可能等于
//                //    clearInterval(timer);
//                //}
//            },10);
//        };
//        lis[i].onclick = function (){
//            x = target;
//        };
//    }
//    box.onmouseout = function (){//因为定时器关不掉，所以只要改变target值就会运动
//        console.log("box")
//        target = x;
//    }
//};


//案例十九：点击跟随鼠标
//function $(id) {
//    return document.getElementById(id);
//}
//function getStyle(obj,attr) {
//    if(obj.currentStyle){
//        return obj.currentStyle[attr];
//    }else{
//        return window.getComputedStyle(obj,null)[attr];
//    }
//}
//window.onload = function (){
//    var x = 0;
//    var y = 0;
//    var super1 = $("super");
//    var leaderX = 0, leaderY = 0,targetX = 0, targetY = 0;
//    var timer = null;
//    var step = 5;
//    document.onclick = function (event){
//        clearInterval(timer);
//        event = event || window.event;
//        x = event.clientX;
//        y = event.clientY;
//        targetX = x;
//        targetY = y;
//        //timer = setInterval(function(){//匀速运动，如果其中一个条件达到另外一个会继续执行，但前一个条件不改变
//        //    var stepX = targetX > leaderX ? step : -step;
//        //    var stepY = targetY > leaderY ? step : -step;
//        //    leaderX += stepX;
//        //    leaderY += stepY;
//        //    super1.style.left = leaderX + "px";
//        //    super1.style.top = leaderY + "px";
//        //    if(Math.abs(targetX - leaderX) <= Math.abs(step)){
//        //        super1.style.left = targetX + "px";
//        //    }
//        //    if(Math.abs(targetY - leaderY) <= Math.abs(step)){
//        //        super1.style.top = targetY + "px";
//        //    }
//        //    if(leaderX == targetX && leaderY == targetY){
//        //        clearInterval(timer);
//        //    }
//        //},10);
//
//
//        //timer = setInterval(function(){//缓动动画
//        //    leaderX += (targetX - leaderX) / 10;
//        //    leaderY += (targetY - leaderY) / 10;
//        //    super1.style.left = leaderX + "px";
//        //    super1.style.top = leaderY + "px";
//        //},10);
//    }
//};

//案例二十：放大镜
//function $(id) {
//    return document.getElementById(id);
//}
//window.onload = function() {
//    var box = $("box");
//    var smallbox = box.children[0];
//    var bigbox = box.children[1];
//    var yellowblock = smallbox.children[0];
//    smallbox.onmouseover = function() {
//        yellowblock.style.display = "block";
//        bigbox.style.display = "block";
//        smallbox.onmousemove = function(event){
//            event = event || window.event;
//            var x = event.clientX;
//            var y = event.clientY;
//            if(x <= box.offsetLeft + yellowblock.offsetWidth / 2){//注意使用box的offsetLeft时，当页面缩放或者滚动时会有bug，所以最好还是用固定的margin值
//                x = 0;
//            }else if(x >= box.offsetLeft + smallbox.offsetWidth - yellowblock.offsetWidth / 2){
//                x = smallbox.offsetWidth - yellowblock.offsetWidth;
//            }else{
//                x = x - box.offsetLeft - yellowblock.offsetWidth / 2;
//            }
//            if(y <= box.offsetTop + yellowblock.offsetHeight / 2){
//                y = 0;
//            }else if(y >= box.offsetTop + smallbox.offsetHeight - yellowblock.offsetHeight / 2){
//                y = smallbox.offsetHeight - yellowblock.offsetHeight;
//            }else{
//                y = y - box.offsetTop - yellowblock.offsetHeight / 2;
//            }
//            yellowblock.style.left = x + "px";
//            yellowblock.style.top = y  + "px";
//            bigbox.style.backgroundPosition = -x*(bigbox.offsetWidth/smallbox.offsetWidth) + "px " + -y*(bigbox.offsetHeight/smallbox.offsetHeight) + "px";//如果是利用大图片和小图片的比例若在有过多的空白时，可以利用大小盒子的比例来减少空白
//        }
//    };
//    smallbox.onmouseout = function() {
//        yellowblock.style.display = "none";
//        bigbox.style.display = "none";
//    }
//};


//案例二十一:拖动水平条
//function $(id) {
//    return document.getElementById(id);
//}
//function preventSelect() {
//    if(window.getSelection){
//        return window.getSelection().removeAllRanges();
//    }else{
//        return document.selection.empty();
//    }
//}
//window.onload = function() {
//    var greybar = $("greybar");
//    var bluebar = greybar.children[0];
//    var but = greybar.children[1];
//    var barL = null;
//    var p = document.getElementsByTagName("p")[0];
//    but.onmousedown = function() {
//        document.onmousemove = function(event){
//            event = event || window.event;
//            var x = event.clientX;
//            var y = event.clientY;
//            if(x <= greybar.offsetLeft){
//                barL = 0;
//            }else if(x >= greybar.offsetLeft + greybar.offsetWidth){
//                barL = greybar.offsetWidth - but.offsetWidth / 2;
//            }else{
//                var barL = x - greybar.offsetLeft - but.offsetWidth / 2;
//            }
//            but.style.left =  barL + "px";
//            bluebar.style.width = barL + 5 + "px";
//            p.innerHTML = "已经拖放了" + (bluebar.offsetWidth / greybar.offsetWidth*100).toFixed(1) + "%";
//            preventSelect();
//        };
//    };
//    document.onmouseup = function() {
//        document.onmousemove = null; //鼠标松开取消拖动事件
//    };
//};

//案例二十二：固定导航栏
//function $(id) {
//    return document.getElementById(id);
//}
//function Scroll() {
//    if(window.pageXOffset != null){
//        return {//现代浏览器
//            scrollX: window.pageXOffset,
//            scrollY: window.pageYOffset
//        }
//    }else if(document.compatMode == "CSS1Compat"){//IE7-8和火狐
//        return {
//            scrollX: document.documentElement.scrollLeft,
//            scrollY: document.documentElement.scrollTop
//        }
//    }else{//支持IE5、没有DTD声明的网页、chrome
//        return {
//            scrollX: document.body.scrollLeft,
//            scrollY: document.body.scrollTop
//        }
//    }
//}
//window.onload = function() {
//    var top = $("top");
//    var nav = $("nav");
//    window.onscroll = function() {
//        if(Scroll().scrollY >= top.offsetHeight){
//            nav.className = "scroll";
//        }else{
//            nav.className = "nav";
//        }
//    }
//};
//

//案例二十三：两侧跟随广告
//function $(id) {
//    return document.getElementById(id);
//}
//function getStyle(obj,attr) {
//    if(obj.currentStyle){
//        return obj.currentStyle[attr];
//    }else{
//        return window.getComputedStyle(obj,null)[attr];
//    }
//}
//function animate(obj,json,fn) {
//    clearInterval(obj.timer);
//    obj.timer = setInterval(function(){
//        for(var attr in json){
//            var flag = true;
//            var current = attr == "opacity" ? parseInt(parseFloat(getStyle(obj,attr))*100) || 0 : parseInt(getStyle(obj,attr));
//            var step = (json[attr] - current) / 10;
//            step = step > 0 ? Math.ceil(step) : Math.floor(step);
//            if(attr == "opacity"){
//                if("opacity" in obj.style){
//                    obj.style[attr] = (current + step) / 100 ;
//                }else{
//                    obj.style[attr] = current + step * 10 ;
//                }
//            }else if(attr == "zIndex"){
//                obj.style[attr] = json[attr];
//            }else{
//                obj.style[attr] = current + step + "px";
//            }
//            if(current != json[attr]){
//                flag = false;
//            }
//        }
//        if(flag){
//            clearInterval(obj.timer);
//            if(fn){
//                fn();
//            }
//        }
//    },30);
//}
//function Scroll() {
//    if(window.pageXOffset != null){
//        return {
//            scrollX: window.pageXOffset,
//            scrollY: window.pageYOffset
//        }
//    }else if(document.compatMode == "CSS1Compat"){
//        return {
//            scrollX: document.documentElement.scrollLeft,
//            scrollY: document.documentElement.scrollTop
//        }
//    }else{
//        return {
//            scrollX: document.body.scrollLeft,
//            scrollY: document.body.scrollTop
//        }
//    }
//}
//window.onload = function(){
//    var side=  $("side");
//    window.onscroll = function(){
//        animate(side,{top:Scroll().scrollY + 50});
//    }
//};


//案例二十四：返回头部的小火箭
//function $(id) {
//    return document.getElementById(id);
//}
//function Scroll(){
//    if(window.pageXOffset != null){
//        return {
//            scrollX: window.pageXOffset,
//            scrollY: window.pageYOffset
//        }
//    }else if(document.compatMode == "CSS1Compat"){
//        return {
//            scrollX: document.documentElement.scrollLeft,
//            scrollY: document.documentElement.scrollTop
//        }
//    }else{
//        return {
//            scrollX: document.body.scrollLeft,
//            scrollY: document.body.scrollTop
//        }
//    }
//}
//window.onload = function() {
//    var arrow = $("arrow");
//    var timer = null;
//    arrow.onclick = function(){
//        clearInterval(timer);
//        target = 0;
//        var timer = setInterval(function(){
//            var now = Scroll().scrollY;
//            var step = (target - now) / 10;
//            step = step > 0 ? Math.ceil(step) : Math.floor(step);
//            window.scrollTo(0,now + step);
//            if(now == 0){
//                clearInterval(timer);
//            }
//        },30);
//
//    };
//};


//案例二十五：屏幕滑动效果
//function $(id) {
//    return document.getElementById(id);
//}
//function getStyle(obj,attr) {
//    if(obj.currentStyle){
//        return obj.currentStyle[attr];
//    }else{
//        return window.getComputedStyle(obj,null)[attr];
//    }
//}
//
//
//function Scroll(){
//    if(window.pageXOffset != null){
//        return {
//            scrollX: window.pageXOffset,
//            scrollY: window.pageYOffset
//        }
//    }else if(document.compatMode == "CSS1Compat"){
//        return {
//            scrollX: document.documentElement.scrollLeft,
//            scrollY: dcoument.documentElement.scrollTop
//        }
//    }else{
//        return {
//            scrollX: document.body.scrollLeft,
//            scrollY: document.body.scrollTop
//        }
//    }
//}
//
//function Client(){
//    if(window.innerWidth){
//        return {
//            width: window.innerWidth,
//            height: window.innerHeight
//        }
//    }else if(document.compatMode == "CSS1Compat"){
//        return {
//            width: document.documentElement.clientWidth,
//            height: document.documentElement.clientHeight
//        }
//    }else{
//        return {
//            width: document.body.clientWidth,
//            height: document.body.clientHeight
//
//        }
//    }
//}
//window.onload = function(){
//    var menulis = $("menu").getElementsByTagName("li");
//    var mainlis = $("main").getElementsByTagName("li");
//    var colorarr = ["pink", "purple", "orange", "blue", "green"];
//    for(var i=0; i<menulis.length; i++){
//        menulis[i].style.backgroundColor = colorarr[i];
//        mainlis[i].style.backgroundColor = colorarr[i];
//        mainlis[i].style.width = Client().width + "px";
//        mainlis[i].style.height = Client().height + "px";
//        var target = 0;
//        var timer = null;
//        menulis[i].index = i;
//        menulis[i].onclick = function(){
//            clearInterval(timer);
//            target = this.index * Client().height;
//            timer = setInterval(function(){
//                var current = Scroll().scrollY;
//                var step = (target - current) / 10;
//                step = step > 0 ? Math.ceil(step) : Math.floor(step);
//                console.log(step)
//                window.scrollTo(0,current + step);
//                if(current == target){
//                    clearInterval(timer);
//                }
//            },10);
//        };
//    }
//};

//案例二十六：云课堂响应式

//案例二十七：淘宝轮播图
//function $(id) {
//    return document.getElementById(id);
//}
//function getStyle(obj,attr) {
//    if(obj.currentStyle){
//        return obj.currentStyle[attr];
//    }else{
//        return window.getComputedStyle(obj,null)[attr];
//    }
//}
////匀速运动
//function animate(obj,attr,target,step){
//    clearInterval(obj.timer);
//    obj.timer = setInterval(function() {
//        var current = parseInt(getStyle(obj,attr));
//        var result = target - current;
//        var speed = target > current ? step : -step;//要定义speed，否则step = -10，那么-step就会等于10
//        obj.style[attr] = current + speed + "px";
//        if(Math.abs(result) <= Math.abs(step)){
//            obj.style[attr] = target + "px";
//            clearInterval(obj.timer);
//        }
//    },10);
//}
//window.onload = function() {
//    var box = $("box");
//    var imgul = box.children[0];
//    var pointol = box.children[1];
//    var imgs = imgul.children;
//    var timer = null;
//    //根据图片数量生成圆点
//    for(var i=0; i<imgs.length; i++){
//        var newpoint = document.createElement("li");
//        newpoint.innerHTML = i + 1;
//        pointol.appendChild(newpoint);
//    }
//    pointol.style.marginLeft = -.5*30*imgs.length + "px";
//    //复制生成imgs的第一个子元素
//    imgul.appendChild(imgs[0].cloneNode(true));
//    var points = pointol.children;
//    for(var j=0; j<points.length; j++){
//        points[j].index = j;
//
//        points[j].onmouseover = function(){
//            clearInterval(timer);
//            for(var i=0; i<points.length; i++){
//                points[i].className = "";
//            }
//            points[this.index].className = "change";
//            animate(imgul,"left",-this.index * box.clientWidth,10);
//            timer = setInterval(autoPlay,3000);
//        };
//
//    }
//    box.onmouseover = function(){
//        clearInterval(timer);
//    };
//    box.onmouseout = function(){
//        timer = setInterval(autoPlay,3000);
//    };
//    //自动轮播
//    var key = 0;
//    var square = 0;
//    function autoPlay(){
//        ++key;
//        ++square;
//        if(key > imgs.length - 1){//因为后面动态生成imgs[5]，所以这里imgs.length为6，之前动态生成point的时候因为程序是按顺序执行的，所以它访问imgs变量时的length属性为5
//            key = 1;
//            imgul.style.left = "0px";
//        }
//        if(square > points.length - 1){
//            square = 0;
//        }
//        for(var i=0; i<points.length; i++){
//            points[i].className = "";
//        }
//        points[square].className = "change";
//        animate(imgul,"left",-key*500,10);
//    }
//    timer = setInterval(autoPlay,3000);
//};


//案例二十八：仿360开机效果
//function $(id) {
//    return document.getElementById(id)
//}
//function getStyle(obj,attr) {
//    if(obj.currentStyle){
//        return obj.currentStyle[attr];
//    }else{
//        return window.getComputedStyle(obj,null)[attr];
//    }
//}
//function animate(obj,attr,target,step,fn) {
//    clearInterval(obj.timer);
//    obj.timer = setInterval(function(){
//        var current = parseInt(getStyle(obj,attr));
//        var result = target - current;
//        var speed = target > current ? step : -step;
//        obj.style[attr] = current + speed + "px";
//        if(Math.abs(result) <= Math.abs(step)){
//            obj.style[attr] = target + "px";
//            clearInterval(obj.timer);
//            if(fn){
//                fn();
//            }
//        }
//    },10);
//}
//
//window.onload = function(){
//    var box = $("box");
//    var t = box.children[0];
//    var b = box.children[1];
//    var but = t.children[0];
//    but.onclick = function() {
//        animate(b,"height",0,5,function(){
//            animate(box,"width",0,5);//因为进行定位的是box所以利用改变box的width值对t进行水平定位方向的移动
//        });
//    };
//};



//案例二十九：手风琴效果
//function $(id) {
//    return document.getElementById(id);
//}
//
//function getStyle(obj,attr) {
//    if(obj.currentStyle){
//        return obj.currentStyle[attr];
//    }else{
//        return window.getComputedStyle(obj,null)[attr];
//    }
//}
//
//function animate(obj,json,fn) {
//    clearInterval(obj.timer);
//    obj.timer = setInterval(function(){
//        var flag = true;
//        for(var attr in json){
//            var current = (attr == "opacity") ? parseInt(parseFloat(getStyle(obj,attr))*100) || 0 : parseInt(getStyle(obj,attr));
//            var step = (json[attr] - current) / 10;
//            step = step > 0 ? Math.ceil(step) : Math.floor(step);
//            if(attr == "opacity"){
//                if("opacity" in obj.style){
//                    obj.style[attr] = (current + step) * 100;
//                }else{
//                    obj.style[attr] = current + step*10;
//                }
//            }else if(attr == "zIndex"){
//                obj.style[attr] = json[attr];
//            }else{
//                obj.style[attr] = current + step + "px";
//            }
//            if(current != json[attr]){
//                flag = false;
//            }
//        }
//        if(flag){
//            clearInterval(obj.timer);
//            if(fn){
//                fn();
//            }
//        }
//    },10);
//}
//
//window.onload = function() {
//    var box = $("box");
//    var lis = box.children[0].children;
//    for(var i=0; i<lis.length; i++){
//        lis[i].onmouseover = function(){
//            for(var i=0; i<lis.length; i++){
//                animate(lis[i],{width:20});
//            }
//            animate(this,{width:1226});
//        };
//    }
//};


//案例三十：仿网易轮播图
//function $(id) {
//    return document.getElementById(id);
//}
//
//function getStyle(obj,attr) {
//    if(obj.currentStyle){
//        return obj.currentStyle[attr];
//    }else{
//        return window.getComputedStyle(obj,null)[attr];
//    }
//}
//
//function animate(obj,json,fn) {
//    clearInterval(obj.timer);
//    obj.timer = setInterval(function(){
//        var flag = true;
//        for(var attr in json){
//            var current = (attr == "opacity") ? parseInt(parseFloat(getStyle(obj,attr))*100) || 0 :
// parseInt(getStyle(obj,attr));
//            var step = (json[attr] - current) / 10;
//            step = step > 0 ? Math.ceil(step) : Math.floor(step);
//            if(attr == "opacity"){
//                if("opacity" in obj.style){
//                    obj.style[attr] = (current + step) * 100;
//                }else{
//                    obj.style[attr] = current + step * 10;
//                }
//            }else if(attr == "zIndex"){
//                obj.style[attr] = json[attr];
//            }else{
//                obj.style[attr] = current + step + "px";
//            }
//            if(current != json[attr]){
//                flag = false;
//            }
//        }
//        if(flag){
//            clearInterval(obj.timer);
//            if(fn){
//                fn();
//            }
//        }
//    },20);
//}
//
//window.onload = function(){
//    var box = $("box");
//    var picbox = box.children[0];
//    var bar = box.children[1];
//    var pics = picbox.children;
//    var barlis = bar.children[0].children;
//    //根据图片数量来决定barlis的数量
//    for(var i=0; i<pics.length; i++){
//        pics[i].children[0].src = "images/" + (i+1) + ".jpg";
//        var newli = document.createElement("li");
//        newli.className = "normalbut";
//        bar.children[0].insertBefore(newli,barlis[barlis.length-1]);
//    }
//    bar.children[0].style.paddingLeft = parseInt(getStyle(bar.children[0],"paddingLeft")) - 29 * (barlis.length - 2) / 2 + 5 + "px";
//    //fore记录上一个事件
//    var boxW = box.clientWidth;
//    var fore = 0;
//    var now = 0;
//    var timer = null;
//    pics[0].style.left = "0px";
//    //为每一个barlis添加事件
//    for(var j=0; j<barlis.length; j++){
//        barlis[j].index = j;
//        barlis[j].onclick = function(){
//            clearInterval(timer);
//            //返回上一张按钮功能实现
//            if(this.className == "leftbut"){
//                animate(pics[fore],{left:boxW});
//                fore = fore <= 0 ? pics.length - 1 : --fore;
//                now = fore;
//                pics[now].style.left = -boxW + "px";
//                animate(pics[now],{left:0});
//            }else if(this.className == "rightbut"){
//                //切换下一张按钮功能实现
//                animate(pics[fore],{left:-boxW});
//                fore = fore >= pics.length - 1 ? 0 : ++fore;
//                now = fore;
//                pics[now].style.left = boxW + "px";
//                animate(pics[now],{left:0});
//            }else{
//                //点击滑块切换图片
//                now = this.index - 1;
//                if(now != 0){
//                    animate(pics[fore],{left:-boxW});
//                    pics[now].style.left = boxW + "px";
//                    animate(pics[now],{left:0});
//                }else{
//                    pics[now].style.left = "0px";
//                }
//                fore = now;
//            }
//            changeColor(barlis,now + 1);
//            timer = setInterval(autoPlay,2000);
//        };
//    }
//    //自动轮播
//    timer = setInterval(autoPlay,2000);
//    function autoPlay() {
//        animate(pics[fore],{left:-boxW});
//        fore = fore >= pics.length - 1 ? 0 : ++fore;
//        now = fore;
//        pics[now].style.left = boxW + "px";
//        animate(pics[now],{left:0});
//        changeColor(barlis,now + 1);
//    }
//    //滑块变色
//    function changeColor(obj,iNow){
//        for(var i=0; i<pics.length; i++){
//            obj[i + 1].className = "normalbut";
//        }
//        obj[iNow].className = "bluebut";
//    }
//};


//案例三十一：旋转木马轮播图
//function $(id) {
//    return document.getElementById(id);
//}
//
//function getStyle(obj,attr) {
//    if(obj.currentStyle){
//        return obj.currentStyle[attr];
//    }else{
//        return window.getComputedStyle(obj,null)[attr];
//    }
//}
//
//function animate(obj,json,fn) {
//    clearInterval(obj.timer);
//    obj.timer = setInterval(function(){
//        var flag = true;
//        for(var attr in json){
//            var current = attr == "opacity" ? parseInt(parseFloat(getStyle(obj,attr))*100) || 0 : parseInt(getStyle(obj,attr));
//            var step = (json[attr] - current) / 10;
//            step = step > 0 ? Math.ceil(step) : Math.floor(step);
//            if(attr == "opacity"){
//                if("opacity" in obj.style){
//                    obj.style[attr] = (current + step) / 100;
//                }else{
//                    obj.style.filter = "alpha(opacity = "+ (current + step*10 ) +")";
//                }
//            }else if(attr == "zIndex"){
//                obj.style.zIndex = json[attr];
//            }else{
//                obj.style[attr] = current + step + "px";
//            }
//            if(current != json[attr]){
//                flag = false;
//            }
//        }
//        if(flag){
//            clearInterval(obj.timer);
//            if(fn){
//                fn();
//            }
//        }
//    },50);
//}
//
//window.onload = function() {
//    var box = $("box");
//    var pics = box.children[0].children;
//    var control = box.children[1];
//    var buts = control.children;
//    var csarr = [
//        {   //  1
//            width:400,
//            top:20,
//            left:50,
//            opacity:20,
//            zIndex:2
//        },
//        {  // 2
//            width:600,
//            top:70,
//            left:0,
//            opacity:80,
//            zIndex:3
//        },
//        {   // 3
//            width:800,
//            top:100,
//            left:200,
//            opacity:100,
//            zIndex:4
//        },
//        {  // 4
//            width:600,
//            top:70,
//            left:600,
//            opacity:80,
//            zIndedx:3
//        },
//        {   //5
//            width:400,
//            top:20,
//            left:750,
//            opacity:20,
//            zIndex:2
//        }
//    ];
//    var jieliu = true;
//
//    //为每一个图片动态添加样式
//    function change() {
//        for(var i=0; i<pics.length; i++){
//            animate(pics[i],{
//                width: csarr[i].width,
//                top: csarr[i].top,
//                left: csarr[i].left,
//                opacity: csarr[i].opacity,
//                zIndex: csarr[i].zIndex
//            },function(){
//                jieliu = true;
//            });
//        }
//    }
//    change();
//
//    //添加左右按钮事件
//    for(var i=0; i<buts.length; i++){
//        buts[i].onclick = function(){
//            if(jieliu == true){
//                if(this.className == "prev"){
//                    csarr.unshift(csarr.pop());
//                }else{
//                    csarr.push(csarr.shift());
//                }
//            }
//            jieliu = false;
//            change();
//        }
//    }
//
//    control.onmouseover = function(){
//        animate(control,{opacity:100});
//    };
//    control.onmouseout = function(){
//        animate(control,{opacity:0});
//    }
//};


//闭包的原理：一个函数可以用另一个函数的变量
//闭包的优点：不产生全局变量，实现属性私有化；
//缺点：比保重的数据会常驻内存，在不用的时候要删掉否则会导致内存溢出
//function outFun(){
//    var num = 10;
//    function inFun() {
//        num++;
//        console.log(num);
//    }
//    return inFun;
//}
//var demo = outFun();  //执行outFun函数里面的函数体
//demo();
//demo();
//var demo1 = outFun();
//demo1();
//demo1();


//闭包传参
//function outFun(x){
//    return function(y){
//        console.log(x+y);
//    }
//}
//var demo = outFun(4);
//demo(6);
//demo(2);


//事件传递参数
//window.onload = function(){
//    var but1 = document.getElementById("but1");
//    var but2 = document.getElementById("but2");
//    var movebox = document.getElementById("movebox");
//    but1.onclick = move(-5);
//    but2.onclick = move(5);
//    function move(speed){
//        return function(){
//            var current = movebox.offsetLeft;
//            movebox.style.left = current + speed + "px";
//        }
//    }
//};


//tab栏切换的闭包封装
//好处：不用使用this的索引
//window.onload = function(){
//    var box = document.getElementById("box");
//    var ul1 = box.children[0];
//    var ul2 = box.children[1];
//    var lis1 = ul1.children;
//    var lis2 = ul2.children;
//    lis2[0].style.display = "block";
    //初始原理
    //for(var i=0; i<lis1.length; i++){
    //
    //    lis1[i].onclick = cli(i);//遍历时的i是相同的，再对函数体进行传参，这时就是相当于给每一个遍历的对象添加立即执行函数，如果是this模式的就是要等事件发生后才能获取调用事件的对象，这时已经无法获得准确的i，因为已经遍历完成了，所以i已经是最终值
    //}
    //function cli(num){
    //    return function(){
    //        for(var j=0; j<lis1.length; j++){
    //            lis1[j].className = "";
    //            lis2[j].style.display = "none";
    //        }
    //        lis1[num].className = "red";
    //        lis2[num].style.display = "block";
    //    }
    //}
    //常用简化
    //for(var i=0; i<lis1.length; i++){
    //    lis1[i].onclick = function(num){
    //        for(var j=0; j<lis1.length; j++){
    //            lis1[j].className = "";
    //            lis2[j].style.display = "none";
    //        }
    //        lis1[num].className = "red";
    //        lis2[num].style.display = "block";
    //    }(i);
    //}
    //运用节流的tab栏闭包切换
//    var timer = null;
//    for(var i=0; i<lis1.length; i++){
//        lis1[i].onmouseover = function(num){
//            return function(){
//                clearTimeout(timer);
//                timer = setTimeout(function(){
//                    for(var j=0; j<lis1.length; j++){
//                        lis1[j].className = "";
//                        lis2[j].style.display = "none";
//                    }
//                    lis1[num].className = "red";
//                    lis2[num].style.display = "block";
//                },2000);
//            }
//        }(i);
//    }
//};


//理解对象
//对象是拥有属性和方法的基本变量类型
//prototype是构造函数自带的属性，一般是通过构造函数来定义属性，通过原型来定义方法，目的是为了使执行方法的代码段一致，因为每一个对象都是不一样的，所以就算是属性值一致也会当成不同对象的属性，就像拥有同名的两个人，然而那一类的方法是一致的，就像人类都拥有吃的方法，方法应该是一样的才对，是类的统一的方法
//window.onload = function() {
//    function Person(name,age) {
//        this.name = name;
//        this.age = age;
//        this.showName = function(){
//            alert(this.name);
//        }
//    }
//    Person.prototype.number = 2;
//    Person.prototype.showAge = function () {
//        alert(this.age);
//    }
//    var demo1 = new Person("刘德华",32);
//    var demo2 = new Person("张国荣",20);
//    alert(demo1.number == demo2.number);
//};


//利用下拉菜单理解对象使用
//function $(id) {
//    return document.getElementById(id);
//}
//function List(id) {
//    this.id = id;
//    this.lists = id.children[0].children;
//}
//List.prototype.init = function() {
//    var that = this;
//    for(var i=0; i<this.lists.length; i++){
//        this.lists[i].onmouseover = function(){
//            that.happen(this.getElementsByTagName("ul")[0]);
//        };
//    }
//    this.id.onmouseout = function(){
//        for(var i=0; i<that.lists.length; i++){
//            that.lists[i].getElementsByTagName("ul")[0].style.display = "none";
//        }
//    };
//}
//List.prototype.happen = function(obj){
//    for(var i=0; i<this.lists.length; i++){
//        this.lists[i].getElementsByTagName("ul")[0].style.display = "none";
//    }
//    obj.style.display = "block";
//}
//var list = new List($("list"));
//list.init();






//----------------------Jquery基础开始-------------------------------

//Jquery入口函数原理详解
//var jquery = function(dom){
//    var obj = {};
//    obj.ready = function(func){
//        if(typeof dom.onload === "function"){
//            var oldfun = dom.onload;
//            dom.onload = function(){  //因为window.onload是要等页面完全加载才可以执行，而jquery函数是在执行script的时候执行的，先于window.onload的速度，这里必须要对dom.onload进行重定义是因为每一次调用ready方法时都可以检测到不同的dom.onload内容
//                oldfun();
//                func();
//            }
//        }else{
//            dom.onload = func;
//        }
//    }
//    return obj;
//}
//window.onload = function(){
//    alert("window.onload");
//}
//jquery(window).ready(function(){
//    alert("第一次调用")
//});
//jquery(window).ready(function(){
//    alert("第二次调用")
//});
//jquery(window).ready(function(){
//    alert("第三次调用");
//})


//了解jq动画的stop()
//$(document).ready(function(){
//    $(".father").mouseenter(function(){
//        $(".son").animate({"width":"300"},3000);
//        $(".son").animate({"height":"300"},3000);
//    });
//    $(".father").mouseleave(function(){
//        //$(".son").stop().animate({"width":"200px","height":"200px"},3000);//默认stop的参数是false
//        //$(".son").stop(true).animate({"width":"200px","height":"200px"},3000);  //清除原本mouseenter事件时设置的动画队列
//        //$(".son").stop(false,true).animate({"width":"200px","height":"200px"},3000);  //当前执行的动画迅速执行，不清除后面的动画队列
//        //$(".son").stop(true,true).animate({"width":"200px","height":"200px"},3000);  //当前执行的动画迅速执行，清除后面的动画队列
//    })
//});


//JQ案例

//JQ案例一：右下角弹出广告
//$(document).ready(function(){
//    $(".chuanzhi")
//        .slideDown("Normal")
//        .slideUp("slow")
//        .fadeIn(1000)
//        .children("span").click(function(){
//            $(this).parent().fadeOut(1000);
//        })
//})


//JQ案例二：京东tab栏切换
//$(document).ready(function(){
//    $(".showItems li").eq(0).css("display","block");
//    $(".tabs li").mouseenter(function(){
//        $(this)
//            .css({"borderTop":"4px red solid"})
//            .siblings().css({"borderTop":"4px white solid"});
//        var index = $(this).index();
//        $(".showItems li").eq(index)//注意这里不可以使用$(".showItems li).eq($(this).index())，因为这里的$(this)指向发生变化
//            .css("display","block")
//            .siblings().css("display","none");
//    });
//})



//JQ案例三：淘宝服饰精品广告
//$(function(){
//    $(".mainpic li").eq(0).css("display","block");
//    $("#box>ul li").mouseenter(function(){
//        $("#box ul li").removeClass("turnred");
//        $(this).addClass("turnred");
//        var index = $(this).index();
//        index = ($(this).parent()
//            .attr("class") == "fr") ?  index + 9 : index;
//        $(".mainpic li").eq(index)
//            .css("display","block")
//            .siblings().css("display","none");
//    })
//})



//JQ案例四：图片网站导航效果
//方法一：
//$(function(){
//    $("li").mouseenter(function(){
//        var index = $(this).index();
//        $(this).children("span")
//            .slideDown(400)
//            .children("b").css("backgroundPosition","0 "+ -(25*index + 4) + "px");
//    });
//    $("li").mouseout(function(){
//        $(this).children("span").stop().slideUp(400);
//    })
//})

//方法二：
//$(function(){
//    $div = $("<div></div>"), $p = $(".wrapper p"), speed = 388;
//    //$p.before($div);   ////因为$p.length>1，所以会自动复制创建$div，并逐个添加
//    $p.each(function(index){
//        $(this).before($("<div></div>"));  //注意这里不可以使用$(ele).before($div)，因为$p使用each()时，$(this).length ==1，所以并没有对$div进行复制创建，而是直接引用，并且所引用的$div都是同一对象，而一个对象只能被引用一次，每个$(this)都要添加$div，所以会发生抢夺事件，下一个会抢走上一个的$div，只有最后一个才可以抢夺到，所以只有最后一个p前面才有div，而如果不将$(...)赋值给$div，那么在before方法里就会每次都生成一个新对象$("<div></div>")，那么每一个$(this)都能调用
//        /*解释：$div === $div //true  ;  $("<div></div>") === $("<div></div>")  //false
//        这是因为$()是要生成jq对象的意思，而就算在js中，每生成一个对象，在内存中就要另外开辟一个空间用于保存对象，而对象名只是作为一个指针，指向该对象所在的空间，就算对象的值是相同的，因为所指向的空间不一致，故两个对象还是不会相等*/
//        var y = 25 * index;
//        $(this).css({"background-position": "5px -" + y + "px"});
//    });
//    $(".wrapper div").fadeTo(0,.5);//这就是之所以要在p前面添加div的原因，因为只是改变p的不透明度的话就会令字体模糊，这里选择将div的背景颜色的opacity改变，这样就不会影响p内容的透明度了
//    $(".wrapper li").hover(function(){
//        $(this).children("div,p").animate({"bottom":0},speed);
//    },function(){
//        $(this).children("div,p").stop().animate({"bottom":"-26px"},speed);
//    });
//})


//JQ案例五：手风琴效果
//$(function(){
//    $("#box>ul>li").mouseenter(function(){
//        $(this).stop().animate({width:"600px"},800).siblings().stop().animate({width:"70px"},800);
//    });
//    $("#box").mouseleave(function(){
//        $(this).find("li").stop().animate({width:"200px"},800);
//    })
//});


//JQ案例六：
//$(function(){
//    $("#box>ul li").css("zIndex",function(index,val){
//        return 5-index;   //给每个元素的zIndex设置为5-index
//    });
//    $("#box>ol").children()
//        .text(function(index){return index+1;})
//        .mouseenter(function(){
//            var index = $(this).index();
//            $("#box>ul li")
//                .eq(index)
//                .css({left:"650px",zIndex:5})
//                .animate({left:0},800)
//                .siblings().each(function(index,ele){
//                    var zindex = $(ele).css("zIndex");
//                    $(ele).css({zIndex:zindex - 1});
//                });
//            $(this).addClass("turnorange")
//                .siblings().removeClass("turnorange");
//        })
//})



//JQ案例七：京东侧边栏
//$(function(){
//
//    //动态根据main的子元素个数添加li
//    //方法一：
//    //for(i=0; i<$("#main>div").length; i++){
//    //    $(".items li:last").before("<li></li>");
//    //}
//    //方法二：
//    $("#main>div").each(function(){
//        $(".items li:last").before("<li></li>");
//    });
//    var items_h = $(".items").height();
//    $(".items").css("marginTop",-items_h *.5);
//    //为items的li添加背景图片和点击事件
//    function turnRed(index,ele){
//        return (function(){
//            ele
//                .text(text[index])
//                .addClass("turnred")
//                .siblings().not($(".items li:last"))
//                .text("")
//                .removeClass("turnred");
//        })();
//    }
//    var text = ["电脑数码","家用电器","服饰精品","美容珠宝"];
//    var client_h = $(window).height();
//    $(".items li")
//        .css("backgroundPosition",function(index,val){
//        if(index < $(".items li").length -1){
//            return "0 -" + index * 55 + "px";}})
//        .each(function(index,ele){
//            var scrolltop;
//            $(ele)
//                .click(function(){
//                    //给除了返回的其他方块实现点击滚动
//                    if(index < $(".items li").length - 1){
//                       scrolltop = $("#main div").eq(index).offset().top;
//                    }else{
//                        scrolltop = 0;
//                    }
//                    $("html,body")
//                        .stop()
//                        .animate({"scrollTop": scrolltop + "px"},500);
//                });
//        })
//    $(window).scroll(function(){
//        var scrolltop = $(window).scrollTop();
//        if(scrolltop == 0 ){
//            $(".items").fadeOut(1000);
//        }else{
//            $(".items").fadeIn(1000);
//            $("#main div").each(function(index,ele){
//                if(index<$("#main div").length - 1){
//                    if(scrolltop >= $(ele).offset().top && scrolltop < $(ele).next().offset().top){
//                        turnRed(index,$(".items li").eq(index));
//                    }
//                }else{
//                    if(scrolltop >= $(ele).offset().top){
//                        turnRed(index,$(".items li").eq(index));
//                    }
//                    if(scrolltop == $(document).height() - client_h){
//                        $(".items li").not($(".items li:last"))
//                            .text("")
//                            .removeClass("turnred");
//                    }
//                }
//            })
//        }
//
//    })
//})



//JQ案例八：仿腾讯固定导航栏
//$(function(){
//    var scrolltop, navtop = $(".nav").offset().top;   //探究到底多次获值的时候到底是在外面申明变量还是局部变量的比较高效，重定义以及层级查询的比较
//    $(window).scroll(function(){
//        scrolltop = $(window).scrollTop();
//        if(scrolltop >= navtop){
//            $(".nav")
//                .css({position:"fixed",top:0, left:0})
//                .next()
//                .css("marginTop",$(".nav").height()+"px");   ////如果不给main设置marginTop的话，当nav固定定位的时候，main的头部会有一部分被挡住，影响用户体验
//        }else{
//            $(".nav")
//                .css({position:"static",top:"none", left:"none"})
//                .next()
//                .css("marginTop",0);
//        }
//    })
//});


//JQ案例九：京东轮播图
//$(function(){
//    //动态生成数字小圆点
//    $("#box>ul li").each(function(index,ele){
//        $("#box>ol").append("<li>"+ (index + 1) +"</li>");
//        //$(ele).parent().next().children().text(t); ////不可以这样写，因为这里关于ol的children()无法获取，还没有添加完毕
//    }).first().css("display","block");
//    $("#box>ol li").mouseover(function(){
//
//        var index = $(this).index();
//        $(this)
//            .addClass("turnpink")
//            .siblings()
//            .removeClass("turnpink");
//        $("#box>ul li").eq(index)
//            .fadeIn(500)
//            .siblings()
//            .css("display","none");
//    })
//});



//JQ案例十：两侧跟随广告
//$(function(){
//    var scrolltop, boxH = $(".left").height(), client_h = $(window).height();
//    $(".left, .right").css("marginTop",0.5*(client_h -boxH) + "px");
//    $(window).scroll(function(){
//        scrolltop = $(window).scrollTop();
//        console.log(scrolltop)
//        $(".left, .right").animate({"top":scrolltop + "px"},1000); //因为已经设置了marginTop，所以该元素的offsetTop等于marginTop + top
//    })
//})


//JQ案例十一：鼠标跟随
//$(function(){
//    var follow_H = $(".follow").height();
//    $(window).on("mousemove",function(e){
//        $(".follow").stop().animate({top: e.clientY - follow_H *.5, left: e.clientX - follow_H *.5},1500);
//    })
//})


//JQ案例十二：动态为表格添加数据
//$(function(){
//    var data = [
//        {title:"传智播客",url:"http://www.itcast.cn", description:	"IT最强培训机构"},
//        {title:"黑马程序员",url:"http://www.itheima.com", description:"大学生IT培训机构"},
//        {title:"传智前端学院", url:"http://web.itcast.cn",description:"前端的黄埔军校"}
//    ];
//    //方法一：
//    //var str = "";
//    //for( var i=0; i< data.length; i++ ){
//    //    str = str +"<tr>";
//    //    str = str +     "<td>" + data[i].title + "</td>";
//    //    str = str +     "<td>" + data[i].url + "</td>";
//    //    str = str +     "<td>" + data[i].description + "</td>";
//    //    str = str + "</tr>";
//    //}
//    //$("tbody").html(str);
//
//    //方法二：
//    //for( var i = 0; i<data.length; i++ ){
//    //    var $tr = $("<tr></tr>");
//    //    $tr.append("<td>" + data[i].title +"</td>");
//    //    $tr.append("<td>" + data[i].url +"</td>");
//    //    $tr.append("<td>" + data[i].description +"</td>");
//    //    $("#J_tabchuan").append($tr);
//    //}
//})


//JQ案例十三：互添选项
//$(function(){
//    function moveUl(moveObj,addObj){
//        var dom = moveObj.html();
//        addObj.html(dom);
//        moveObj.empty();
//    }
//    function moveLi(li,moveObj,addObj){
//        var txt = li.text();
//        li.remove();
//        var dom = addObj.html() + "<li>"+ txt +"</li>";
//        addObj.html(dom);
//    }
//    $(".ul3").append("<ul></ul>");
//    $(".ul2").on("click","button",function(){
//        var index = $(this).index();
//        if( index == 0){
//            moveUl($(".ul1 ul"),$(".ul3 ul"));
//        }else if(index == 1){
//            moveUl($(".ul3 ul"),$(".ul1 ul"));
//        }else if(index == 2){
//            var moveli = $(".ul1 li:first");
//            moveLi(moveli,$(".ul3 ul"),$(".ul3 ul"));
//        }else{
//            var moveli = $(".ul3 li:first");
//            moveLi(moveli,$(".ul1 ul"),$(".ul1 ul"));
//        }
//
//    })
//})


//JQ案例十四：点击添加选项
//$(function(){
//    $(".but").on("click","button",function(){
//        var index = $(this).index();
//        if( index == 0){
//            var dom = $("#sele1").html();
//            $("#sele1").empty().siblings("#sele2").html(dom);
            //$("#sele1 option").appendTo($("#sele2"));
//        }else if(index == 1){
//            var dom = $("#sele2").html();
//            $("#sele2").empty().siblings("#sele1").html(dom);
//        }else if(index == 2){
//            var moveli = $("#sele1 option[value=" + $("#sele1").val()+ "]");
//            $("#sele2").append(moveli);
//        }else{
//            var moveli = $("#sele2 option[value=" + $("#sele2").val()+ "]");
//            $("#sele1").append(moveli);
//        }
//
//    })
//})



//JQ案例十五：省市选择
//$(function(){
//    var CITY = {"北京" : ["崇文区","西城区","宣武区","东城区"], "上海" : ["浦东新区","徐汇区","长宁区"], "广州": ["天河区","白云区","番禺区","黄浦区","荔湾区"], "长沙":["芙蓉区","天心区","岳麓区"]};
//    console.log($("#province").val())
//    for( var k=0; k < CITY["北京"].length; k++){
//        $("#city").append("<option>"+ CITY["北京"][k] +"</option>");  //不可以使用k < CITY[$("#province").val()].length，因为在没有触发select的事件前，select的value值等于null
//    }
//    for( var i in CITY ){
//        $("#province").append("<option>"+ i +"</option>");
//    }
//    $("#province").on("change",function(){
//        //获取区
//         var region = CITY[$(this).val()];
//        //创建为city添加的html字符串
//        var str = "";
//        for(var k in region ){
//            str = str + "<option>"+ region[k] +"</option>";
//        }
//        $("#city").html(str);
//    })
//})



//JQ案例发布
//$(function(){
//    //实现文本域字数计数
//    var count = 140;
//    var J_txt_area = $("#J_txt_area");
//    J_txt_area.on("keyup",function(){
//        str = count - $(this).val().length + "";
//        var str1 = "<span class='count_bold'>"+ str.substr(0,1) +"</span>";
//        var str2 = "<span class='count_bold count_big'>"+ str.substr(1,1) +"</span>";
//        var str3 = "<span class='count_bold'>"+ str.substr(2,1) +"</span>";
//        if( str / 100 >= 1 && str / 100 <=1.4){
//            $(".count_word").html("<span>还能输入"+ str1 +"</span>" + str2 + "<span>"+ str3 +" 字</span>");
//        }else if( str / 10 >= 1 && str / 100 <1 ){
//            $(".count_word").html("<span>还能输入"+ str1 +"</span>" + "<span>" + str2 +" 字</span>");
//        }else if( str / 10 < 1 && str / 10 >= 0){
//            var str1 = "<span class='count_bold count_big'>"+ str.substr(0,1) +"</span>";
//            $(".count_word").html("<span>还能输入"+ str1 +"</span>" + "<span> 字</span>");
//        }else{
//            $(this).val($(this).val().substr(0,140));
//            $(".count_word").html("<span>还能输入0 字</span>");
//        }
//    });
//    //添加朋友下拉盒子
//    var friend_arr = ["中国","日本","英国","美国"];
//    $(".friend").append("<ul></ul>");
//    for(var i=0; i<friend_arr.length; i++){
//        $(".friend>ul").append("<li>@"+ friend_arr[i] +"</li>");
//    }
//
//    //添加表情下拉盒子
//    var $ul = $("<ul></ul>");
//    var userFaces = { '0.gif': '微笑', '1.gif': '撇嘴', '2.gif': '色', '3.gif': '发呆', '4.gif': '得意', '5.gif': '流泪', '6.gif': '害羞', '7.gif': '闭嘴', '8.gif': '睡', '9.gif': '大哭', '10.gif': '尴尬', '11.gif': '发怒', '12.gif': '调皮', '13.gif': '呲牙', '14.gif': '惊讶', '15.gif': '难过', '16.gif': '酷', '17.gif': '冷汗', '18.gif': '抓狂', '19.gif': '吐', '20.gif': '偷笑', '21.gif': '可爱', '22.gif': '白眼', '23.gif': '傲慢', '24.gif': '饥饿', '25.gif': '困', '26.gif': '惊恐', '27.gif': '流汗', '28.gif': '憨笑', '29.gif': '大兵', '30.gif': '奋斗', '31.gif': '咒骂', '32.gif': '疑问', '33.gif': '嘘', '34.gif': '晕', '35.gif': '折磨', '36.gif': '衰', '37.gif': '骷髅', '38.gif': '敲打', '39.gif': '再见', '40.gif': '擦汗', '41.gif': '抠鼻', '42.gif': '鼓掌', '43.gif': '糗大了', '44.gif': '坏笑', '45.gif': '左哼哼', '46.gif': '右哼哼', '47.gif': '哈欠', '48.gif': '鄙视', '49.gif': '委屈', '50.gif': '快哭了', '51.gif': '阴险', '52.gif': '亲亲', '53.gif': '吓', '54.gif': '可怜', '55.gif': '菜刀', '56.gif': '西瓜', '57.gif': '啤酒', '58.gif': '篮球 ', '59.gif': '乒乓', '60.gif': '咖啡', '61.gif': '饭', '62.gif': '猪头', '63.gif': '玫瑰', '64.gif': '凋谢', '65.gif': '示爱', '66.gif': '爱心', '67.gif': '心碎', '68.gif': '蛋糕', '69.gif': '闪电', '70.gif': '炸弹', '71.gif': '刀', '72.gif': '足球', '73.gif': '瓢虫', '74.gif': '便便', '75.gif': '月亮', '76.gif': '太阳', '77.gif': '礼物', '78.gif': '拥抱', '79.gif': '强', '80.gif': '弱', '81.gif': '握手', '82.gif': '胜利', '83.gif': '抱拳', '84.gif': '勾引', '85.gif': '拳头', '86.gif': '差劲', '87.gif': '爱你', '88.gif': 'NO', '89.gif': 'OK', '90.gif': '爱情', '91.gif': '飞吻', '92.gif': '跳跳', '93.gif': '发抖', '94.gif': '怄火', '95.gif': '转圈', '96.gif': '磕头', '97.gif': '回头', '98.gif': '跳绳', '99.gif': '挥手', '100.gif': '激动', '101.gif': '街舞', '102.gif': '献吻', '103.gif': '左太极', '104.gif': '右太极', '105.gif': '淡定', '106.gif': '晕', '107.gif': '不满', '108.gif': '睡觉', '109.gif': '小调皮', '110.gif': '咒骂', '111.gif': '发怒', '112.gif': '偷笑', '113.gif': '微笑', '114.gif': '震惊', '115.gif': '囧' };
//    for( var i=0; i<115; i++ ){
//        var $li = $("<li></li>");
//        $li.css("backgroundImage","url(face/"+ i +".gif)").appendTo($ul);
//    }
//    $(".expression").append($ul);
//    //添加下拉盒子事件
//    $("#box>ul>li:nth-child(2)").on({
//        "mouseenter": function(){
//            $(this).children().eq(0)
//                .css("display","block")
//                .find("ul")
//                .on("click","li",function(){
//                J_txt_area.val(J_txt_area.val() + $(this).text());
//            })
//        },
//        "mouseleave": function(){
//            $(this).children().eq(0).css("display","none");
//        }
//    });
//    $("#box>ul>li:nth-child(3)").on({
//        "mouse
//
//
//
// enter": function(){
//            $(this).children().eq(0)
//                .css("display","block")
//                .find("ul")
//                .on("click","li",function(){
//                    J_txt_area.val(J_txt_area.val() + userFaces[$(this).index() + ".gif"]);
//                });
//        },
//        "mouseleave": function(){
//            $(this).children().eq(0).css("display","none");
//        }
//    });
//
//})



//----------------------SVG开始-------------------------------


//认识SVG
//window.addEventListener("load",function(){})相当于window.onload = function(){}的不覆盖型，也就是作用与$(function(){})相同
//$(function(){
//    var svgs = $("svg");
//    for( var i=0; i<svgs.length; i++ ){
//        var src = $(svgs[i]).data("src");
//        $.get(src,function(data){
//            var el = data.documentElement;
//            $(document.body).append($(el));
//        })
//    }
//})


//关于自定义属性data的运用
//$(function(){
//    var target;   //变量本地化
//    $("#box>ul").on("click","li",function(){
//        target = $(this).data("target");
//        for(var j=0; j<$(".panels>div").length; j++){
//            $(".panels>div").eq(j).css("display","none");
//        }
//        $(target).css("display","block");
//    })
//})



//JQ案例十七：导航历史切换内容
//$(function(){
//    var titlebox = document.querySelector("aside>ul");
//    for( var title in data ){
//        var newli = document.createElement("li");
//        //因为$li的前面可能会有小图标，所以innerHTML获取的不是纯文本，所以使用自定义属性
//        newli.setAttribute("data-title",title);
//        newli.innerHTML = title;
//        titlebox.appendChild(newli);
//    }
//
//    var $li = document.querySelectorAll("aside li");
//    var content = document.querySelector(".content");
//
//    for( var j=0; j<$li.length; j++){
//        $li[j].addEventListener("click",function(){
//            //$li的切换
//            for(var i=0; i<$li.length; i++){
//                $li[i].classList.remove("turngrey");
//            }
//            var hv = this.classList.contains("turngrey");
//            this.classList.toggle("turngrey",!hv);
//            //contain的切换
//            var title = this.dataset["title"];
//            content.innerHTML = data[title];
//
//            if(window.history.pushState){  //判断是否支持window.history.pushState这个方法
//                //pushState是添加历史记录，参数一是与跳转有关的条件，参数二是历史记录中标签名
//                window.history.pushState(title,"","?t=" + title);
//            }else{
//                alert("不可以");
//            }
//
//        })
//    }
//
//    //方法一：
//    //浏览器历史记录的前进或者后退会触发popatate
//    //window.addEventListener("popstate",function(e){
//    //    if(e.state != null ){
//    //        content.innerHTML = data[e.state];
//    //        for(var i=0; i<$li.length; i++){
//    //            $li[i].classList.remove("turngrey");
//    //            if($li[i].dataset["title"] == e.state){
//    //                $li[i].classList.add("turngrey");
//    //            }
//    //        }
//    //    }
//    //})
//
//    //方法二：
//    window.addEventListener("popstate",function(){
//        //alert(window.location)  会出现该地址的url编码格式的地址，因为后退时可以获取到后退的地址，单是content还不能显示，所以需要根据地址获取title值
//        var state = window.location.search.split("=")[1];  //因为split是一个按特定符号分割得出的数组，所以按=来切割的话会被分成?t和后面部分两部分，这里选取后面部分
//        //alert(typeof window.location)   //返回的是一个对象，所以要通过search属性获得后面?=的部分
//        content.innerHTML = data[decodeURI(state)];     //decodeURI是URL编码的反编译
//    })
//})


//JQ案例十八：H5全屏API
//window.onload = function(){
//    var im = document.querySelector("img");
//    im.addEventListener("click",function(){
//        if(document.body.requestFullScreen){
//            document.body.requestFullScreen();
//        }else if(document.body.mozrequestFullScreen){
//            document.body.mozRequestFullScreen();
//        }else {
//            document.body.webkitRequestFullScreen();
//        }
//    })
//}




//----------------------CSS3基础开始-------------------------------


//CSS3案例四：360音乐导航
//$(function(){
//    var lis = $(".box li");
//    lis.last().css("border-right",0);
//    lis.append("<ins></ins>");
//    var colors = ["red","purple","blue","yellow","orange","green","pink","lightgreen","lightblue"];
//    $("li ins").each(function(i,ele){
//        $(ele).css("background-color",colors[i]);
//    });
//    lis.bind("mouseenter",function(){
//        $(this)
//            .children("ins")
//            .animate({
//            "top":0
//        },500)
//            .parent()
//            .siblings()
//            .children("ins")
//            .stop()
//            .animate({
//                "top": "30px"
//            },500);
//        $("audio").get($(this).index()).load();//加载audio文件
//        $("audio").get($(this).index()).play();//播放audio文件，因为是js的方法，所以要用get方法对jq对象进行转换成js对象
//        timer = setTimeout(function(){
//            $(".box ul").trigger("mouseleave");
//        },500);
//    });
//    $(".box ul").bind("mouseleave",function(){
//        $(this).children("li").children("ins").stop().animate({
//            "top": "30px"
//        },500);
//    });
//    var timer;
//    $(window).bind("keydown",function(event){
//        if(event.keyCode >= 49 && event.keyCode <= 57){
//            var num = event.keyCode - 49;
//            lis.eq(num).children("ins").trigger("mouseenter");
//            $("audio").get(num).load();
//            $("audio").get(num).play();
//            timer = setTimeout(function(){
//                $(".box ul").trigger("mouseleave");
//            },500);
//        }
//    })
//})

//CSS3案例七：实现手风琴效果
//$(function(){
//    var dts = $(".box dt");
//    var dds = $(".box dd");
//    dts.bind("click",function(){
//        dds.stop().animate({
//            height: 0
//        },1000);
//        $(this).next().stop().animate({
//            height: "100px"
//        },1000);
//    })
//})

//CSS3案例八：鼠标点击正转或反转
//做法一：
//$(function(){
//    var box = $(".box"), flag = 0;
//    box.bind("click",function(){
//        if(!flag) {
//            $(this).css({
//                "transform": "rotateZ(360deg)"
//            });
//            flag = 1;
//        }else{
//            $(this).css({
//                "transform" : "rotateZ(-360deg)"
//            });
//            flag = 0;
//        }
//    })
//})
//做法二：
//$(function(){
//    var box = $(".box");
//    box.click(function(){
//        box.toggleClass("zhuanbox");
//    })
//})

//CSS3案例九：判断鼠标进入方向
//$(function(){
    //方法一：只能从进来的那面出
    //$(".box li").bind("mouseover",function(e){
    //   var w = $(this).width(); // 得到盒子宽度
    //    var h = $(this).height();// 得到盒子高度
    //    var x = (e.pageX - this.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
    //    // 获取x值
    //    var y = (e.pageY - this.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
    //    // 获取y值
    //    var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4; //direction的值为“0,1,2,3”分别对应着“上，右，下，左”
    //    var dirName = ["上方","右方","下方","左方"];
    //        if(direction == 0){
    //            $(".box li>div").eq($(this).index()).css({
    //                "transform-origin": "left top"
    //            });
    //        }else if(direction == 1){
    //            $(".box li>div").eq($(this).index()).css({
    //                "transform-origin":"right top"
    //            });
    //        }else if(direction == 2){
    //            $(".box li>div").eq($(this).index()).css({
    //                "transform-origin":"right bottom"
    //            });
    //        }else if(direction == 3){
    //            $(".box li>div").eq($(this).index()).css({
    //                "transform-origin":"left bottom"
    //            });
    //        }
    //})
    //终极方法二：指定进出
//$(function(){
//    $(".box li").bind("mouseenter mouseleave",function(e){
//        var that = $(this);
//        //获取该元素的宽度
//        var w = $(this).width();
//        //获取该元素的高度
//        var h = $(this).height();
//        //获取x值
//        var x = (e.pageX - this.offsetLeft - (w / 2)) * (w > h ? h / w : 1);/*offsetLeft是this的方法*/
//        //获取y值
//        var y = (e.pageY - this.offsetLeft - (h / 2)) * (h > w ? w / h : 1);
//        var direction = Math.round((Math.atan2(y , x) * (180 / Math.PI) + 180) / 90 + 3) % 4;
//        if(e.type == "mouseenter"){
//            switch(direction){
//                case 0 :
//                    comeOn("top");
//                    break;
//                case 1 :
//                    comeOn("right");
//                    break;
//                case 2 :
//                    comeOn("bottom");
//                    break;
//                case 3 :
//                    comeOn("left");
//                    break;
//            }
//        }else{//触发mouseleave
//            switch(direction){
//                case 0 :
//                    getOut("top");
//                    break;
//                case 1 :
//                    getOut("right");
//                    break;
//                case 2 :
//                    getOut("bottom");
//                    break;
//                case 3 :
//                    getOut("left");
//                    break;
//            }
//        }
//        function comeOn (str){
//            that.children("div").addClass("current");
//            that.children("div").addClass(str);
//        }
//        function getOut(str){
//            that.children("div").removeClass("current");
//            that.children("div").removeClass().addClass(str);//比如经过执行了comeOn，已经有了current和top的class，所以要先清空class
//        }
//    })
//})



//CSS3案例十：建立上下翻转的导航栏
//$(function(){
//    $(".box").bind("mouseenter mouseleave",function(e){
//        var w = $(this).width();
//        var h = $(this).height();
//        var x = (e.pageX - this.offsetLeft - w / 2) * (w > h ? h / w : 1);
//        var y = (e.pageY - this.offsetTop - h / 2) * (h > w ? w / h : 1);
//        var direction = Math.round(((Math.atan2(y , x) * (180 / Math.PI) + 180) / 90) + 3) % 4;
//        var timer;
//        if(e.type == "mouseenter"){
//            switch(direction) {
//                case 0 :
//                    clearTimeout(timer);
//                    timer = setTimeout(function(){
//                        $(this).stop().css({
//                            "transform":"rotateX(-90deg)",
//                            "transform-origin" : "left bottom"
//                        });
//                    },2000);
//                    break;
//                case 2:
//                    clearTimeout(timer);
//                    timer = setTimeout(function(){
//                        $(this).css({
//                            "transform":"rotateX(90deg)",
//                            "transform-origin" : "left top"
//                        });
//                    },2000)
//                    break;
//            }
//        }else {
//                $(".box").css("transform","rotateX(0deg)");
//        }
//    })
//})



//CSS3案例十二：视差轮播图
//$(function(){
//    var scrollbox = $(".scrollbox");
//    //为scrollbox>li添加背景图片
//    for(var i= 0; i<scrollbox.length; i++){
//        for(var j=0; j<scrollbox.children("ul").eq(i).children().length; j++){
//            scrollbox.children("ul").eq(i).children("li").eq(j).css("background-image","url(image/"+(j+1)+".jpg)");
//        }
//    }
//    //为scrollbox>li设置背景图片的位置
//    for(var i=0; i<$(".scrollbox>ul>li").length; i++){
//        for(var j=0; j<$(".scrollbox>ul").length; j++){
//            $(".scrollbox>ul").eq(j).children("li").eq(i).css("background-position",-j*100+"px 0");
//        }
//    }
//    //设置左右按钮事件
//    var num = 0, timer, t =50; // 设置图片索引
//    //方法一：使用定时器，有bug，第一次的旋转是不正常的，层次感很低
//    //$(".controlbar span").bind("click",function(){
//    //    if(this.className == "left") {
//    //        --num;
//    //        var i=0;
//    //        timer = setInterval(function(){
//    //            if(i<= $(".scrollbox").length - 1){
//    //                $(".scrollbox").eq(i).children("ul").css("transform","rotateX("+90*num+"deg)");
//    //                ++i;
//    //                tt = t;
//    //            }
//    //        },t);
//    //    }else{
//    //        ++num;
//    //        var i=0;
//    //        timer = setInterval(function(){
//    //            if(i<= $(".scrollbox").length - 1){
//    //                $(".scrollbox").eq(i).children("ul").css("transform","rotateX("+90*num+"deg)");
//    //                ++i;
//    //                t = 50 * i;
//    //            }
//    //        },t);
//    //    }
//    //})
//    //方法二：使用transition自带的动画延时，即transition-delay
//    $(".controlbar span").bind("click",function(){
//        if(this.className == "left"){
//            -- num;
//            $(".scrollbox>ul").each(function(i,ele){
//                $(ele).css({
//                    "transform":"rotateX("+90*num+"deg)",
//                    "transition-delay":.2*i+"s"
//                });
//            })
//        }else{
//            ++ num;
//            $(".scrollbox>ul").each(function(i,ele){
//                $(ele).css({
//                    "transform":"rotateX("+90*num+"deg)",
//                    "transition-delay":.2*i+"s"
//                });
//            })
//        }
//    })
//
//})


//CSS3案例十三：雪花飘落加旋转导航栏
//试手：自创导航栏
//$(function(){
//    var lis = $(".box>ul>li");
//    lis.bind("mouseenter mouseleave",function(e){
//        if(e.type == "mouseenter"){
//            $(this).children(".show").children().each(function(index,ele){
//                $(ele).css({
//                    "transform": "rotateY(0deg) rotateZ(0deg)",
//                    "transition-delay": 0.15 * index + "s",
//                    "opacity": 1
//                })
//            });
//        }else{
//            $(this).children(".show").children().each(function(index,ele){
//                $(ele).css({
//                    "transform": "rotateY(90deg) rotateZ(-10deg)",
//                    "transition-delay": 0.15 * (3-index) + "s",
//                    "opacity": 0
//                })
//            });
//
//        }
//    })
//})




//CSS3案例十四：自创扇形导航栏
//$(function(){
//    var lis = $(".circle li");
//    lis.each(function(index,ele){
//        var span = $("<span></span>");
//        span.addClass("shan")
//        $(ele).append(span);
//    });
//    $(".circle").bind("mouseenter mouseleave",function(e){
//       if(e.type == "mouseenter"){
//           lis.each(function(index,ele){
//               $(".circle").css("background-color","rgba(0,0,0,0)").children(".txt").css("z-index","3");
//               $(ele)
//                   .css({
//                       "transform":"rotate("+(30*index)+"deg)",
//                       "opacity": 1,
//                       "transition-delay":.1*index+"s"
//                   });
//               $(ele).children(".shan").css("background-color","rgba(100,100,100,"+(1-index *.08)+")")
//           })
//       }else {
//           lis.each(function(index,ele){
//               $(".circle").css("background-color","rgba(255,0,0,1)").children(".txt").css("z-index","0");
//               $(ele)
//                   .css({
//                       "transform":"rotate(0deg)",
//                       "opacity": 0,
//                       "transition-delay":.1*(12-index)+"s"
//                   });
//               $(ele).children(".shan").css("background-color","rgba(100,100,100,"+(1-index *.08)+")")
//           })
//       }
//    })
//});


//CSS3高级应用三：全屏slider
//$(function(){
//    var inow = 0;
//    $("li").bind("click",function(){
//        var i = $(this).index();
//        if(i != inow){
//            switch(i){
//                case 0:
//                    $(".pic").eq(i).css({
//                        "z-Index" : "2",
//                        "animation":"change 2s"
//                    })
//                        .siblings(".pic").css({
//                            "z-Index":"0",
//                            "animation":"none"
//                        })
//                    $(".pic").eq(inow).css("z-Index","1");
//                    inow = i;
//                    break;
//                case 1:
//                    $(".pic").eq(i).css({
//                        "animation":"change0 2s",
//                        "z-Index": "2"
//                    })
//                        .siblings(".pic").css({
//                            "z-Index":"0",
//                            "animation":"none"
//                        })
//                    $(".pic").eq(inow).css("z-Index","1");
//                    inow = i;
//                    break;
//                case 2:
//                    $(".pic").eq(i).css({
//                        "animation":"change1 2s",
//                        "z-Index":"2"
//                    })
//                        .siblings(".pic").css({
//                            "z-Index":"0",
//                            "animation":"none"
//                        })
//                    $(".pic").eq(inow).css("z-Index","1");
//                    inow = i;
//                    break;
//            }
//        }
//    })
//})


//CSS3高级应用五：宇宙旋转
//$(function(){
//    var color = ["#7C6A5C","#77C2EC","#82B3D1","#DFD3A9","#E0AE6F","#AA4200","#0062C4","#BF8639","#B6B9C1"]
//    var a = $(".universe").each(function(i,ele){
//        var measure = 500 - (i * 50);
//        $(ele).css({
//            "width": measure + "px",
//            "height": measure + "px",
//        })
//            .not(".ceng10").prepend("<span class = 'planet'></span>")
//            .children("span").css("background-color",color[i]);
//        $(".universe:odd").css("animation","change " + (100 - i) + "s linear infinite");
//        $(".universe:even").css("animation","change1 " + (100 - i) + "s linear infinite");
//    })
//        .eq(3)
//            .children(".planet").append("<span class='planet1'></span>")
//        //因为是要查询.parent()也就是.ceng4的子元素的子元素所以要使用find
//        .parent().find(".ceng7")
//            .children(".planet").append("<span class='planet2'></span>");
//})



//CSS3高级应用六：展示相册
//$(function(){
//    $(".show .pic").each(function(i,ele){
//        $(ele).css("background-image","url(image/" + $(ele).attr("data-pic") + ")");
//    })
//    $(".box li").bind("click",function(){
//        var i = $(this).index();
//        $("body html").css({
//            "width": "100%",
//            "height": "100%",
//            "overflow": "hidden"
//        });
//        $(".mask").css("display","block");
//        var show = $(".show" + (i+1));
//        show.css("display","block")
//            .siblings().css("display","none");
//        show.children(".pic").css("animation","change"+(i+1)+" 3s forwards")
//            .parent().children(".but , p").animate({"opacity":1},3000);
//    });
//    $(".but").bind("click",function(){
//        $(".mask").css("display","none");
//    })
//})




//----------------------AJAX基础开始-------------------------------


//AJAX：同步表单验证
//<?php
//    header ("Content-Type:text/html;charset=utf-8");
//$username = $_GET['username'];
//$password = $_GET['password'];
//echo "用户名字是：".$username." 密码是：".$password;
//?>

//AJAX：模仿EMS邮件查询系统
//<?php
//    $code = $_GET['code'];
//
//$result = '{"msg":"",
//"status":"0",
//    "data":{
//    "info":
//    {
//        "status":"1",
//        "com":"ems",
//        "state":"3",
//        "context":[{"time":"1450252800","desc":"\u3010\u9f99\u9526\u82d1\u6295\u9012\u7ec4\u3011 \u5df2\u7b7e\u6536,\u4ed6\u4eba\u6536[\u9f99\u9526\u82d1\u6295\u9012\u7ec4]"},
//        {"time":"1450172897","desc":"\u3010\u9f99\u9526\u82d1\u6295\u9012\u7ec4\u3011 \u9884\u7ea62015.12.16\u518d\u6295[\u9f99\u9526\u82d1\u6295\u9012\u7ec4]"},
//        {"time":"1450153979","desc":"\u3010\u9f99\u9526\u82d1\u6295\u9012\u7ec4\u3011 [\u9f99\u9526\u82d1\u6295\u9012\u7ec410220812]\u6b63\u5728\u6295\u9012"},
//        {"time":"1450088166","desc":"\u3010\u9f99\u9526\u82d1\u6295\u9012\u7ec4\u3011 \u9884\u7ea62015.12.15\u518d\u6295[\u9f99\u9526\u82d1\u6295\u9012\u7ec4]"},
//        {"time":"1450062684","desc":"\u3010\u9f99\u9526\u82d1\u6295\u9012\u7ec4\u3011 [\u9f99\u9526\u82d1\u6295\u9012\u7ec410220812]\u6b63\u5728\u6295\u9012"},
//        {"time":"1450000825","desc":"\u3010\u9f99\u9526\u82d1\u6295\u9012\u7ec4\u3011 \u5230\u8fbe[\u9f99\u9526\u82d1\u6295\u9012\u7ec410220812]"},
//        {"time":"1449887960","desc":"\u3010\u5929\u901a\u897f\u82d1\u6295\u9012\u7ec4\u3011 \u8f6c\u4ed6\u5c40\u5904\u7406,\u539f\u56e0:\u975e\u672c\u7ad9\u8bd5\u4ed6\u5c40[\u5929\u901a\u897f\u82d1\u6295\u9012\u7ec4]"},
//        {"time":"1449886219","desc":"\u3010\u5929\u901a\u897f\u82d1\u6295\u9012\u7ec4\u3011 [\u5929\u901a\u897f\u82d1\u6295\u9012\u7ec410221806]\u6b63\u5728\u6295\u9012"},
//        {"time":"1449871677","desc":"\u3010\u5929\u901a\u897f\u82d1\u6295\u9012\u7ec4\u3011 \u5230\u8fbe[\u5929\u901a\u897f\u82d1\u6295\u9012\u7ec410221806]"},
//        {"time":"1449866125","desc":"\u3010\u5317\u4eac\u3011 \u79bb\u5f00[\u5317\u4eac10000000]\uff0c\u4e0b\u4e00\u7ad9\u662f[\u4eac\u5929\u901a\u897f],\u603b\u5305[5602],\u90ae\u8def[\u6c99\u6cb3-J1]"},
//        {"time":"1449838500","desc":"\u3010\u5317\u4eac\u5e02\u3011 [\u5317\u4eac\u5e0210000000]\u5df2\u7ecf\u5c01\u53d1,\u603b\u5305[5602]"},
//        {"time":"1449827400","desc":"\u3010\u4e9a\u8fd0\u6751\u90ae\u5c40\u5927\u5b97\u4e8c\u7ec4\u3011 \u79bb\u5f00[\u4e9a\u8fd0\u6751\u90ae\u5c40\u5927\u5b97\u4e8c\u7ec410010120]\uff0c\u4e0b\u4e00\u7ad9\u662f[\u5317\u4eac\u5e02],\u603b\u5305[5434],\u90ae\u8def[\u5546\u51fd-\u5c0f\u5305\u51fa\u53e3]"},
//        {"time":"1449820658","desc":"\u3010\u4e9a\u8fd0\u6751\u90ae\u5c40\u5927\u5b97\u4e8c\u7ec4\u3011 [\u5317\u4eac\u5e02\u4e9a\u8fd0\u6751\u90ae\u5c40\u5927\u5b97\u4e8c\u7ec410010120]\u5df2\u7ecf\u6536\u5bc4"}],
//        "_source_com":""
//    },
//    "com":"ems",
//        "company":{
//        "url":"http:\/\/www.kuaidi100.com\/all\/ems.shtml?from=openv",
//            "fullname":"EMS",
//            "shortname":"EMS",
//            "icon":{"id":"2","smallurl":"https:\/\/ss2.baidu.com\/6ONYsjip0QIZ8tyhnq\/it\/u=1807529516,3291075151&fm=58","smallpos":"0,944","middleurl":"https:\/\/ss1.baidu.com\/6ONXsjip0QIZ8tyhnq\/it\/u=1835223070,3312272045&fm=58","middlepos":"0,828","normal":"https:\/\/ss1.baidu.com\/6ONXsjip0QIZ8tyhnq\/it\/u=295567570,1377797753&fm=58"},
//        "website":{
//            "title":"www.ems.com.cn",
//                "url":"http:\/\/www.ems.com.cn\/"},
//        "tel":"11183",
//            "auxiliary":[{"title":"\u7f51\u70b9\u67e5\u8be2","url":"http:\/\/www.ems.com.cn\/serviceguide\/tong_da_fan_wei.html"},{"title":"\u7f51\u4e0a\u5bc4\u4ef6","url":"http:\/\/www.ems.com.cn\/serviceguide\/zifeichaxun\/zi_fei_biao_zhun.html"}]
//    },
//    "source":{
//        "logo":"https:\/\/ss2.baidu.com\/6ONYsjip0QIZ8tyhnq\/it\/u=1429564979,1787167512&fm=58",
//            "title":"\u6570\u636e\u6765\u81ea\u5feb\u9012100",
//            "url":"http:\/\/www.kuaidi100.com\/",
//            "name":"\u5feb\u9012100"
//    }
//}
//}';
//
//if($code == ''){}
//if($code == '997'){
//    echo $result;  ////返回result的JSON字符串，然后在前台通过xhr.responseText的方式进行获取这个字符串，再JSON.parse的方法进行JSON字符串和JSON对象的转换，JSON.stringify是将JSON对象转化成为JSON字符串
//}else{
//    echo '{"status":-2,"msg":"您查询的订单出错啦！"}';
//}
//?>


//AJAX：关于dataType的类型
////关于dataType:json
//<?php
//    /*php的数组申明方式，可以通过$result[index]或$result['username']来访问元素*/
//    $result = array("username"=>"lily","age"=>"12");
//echo json_encode($result);  /*将$result的数组格式转换成json格式*/
//?>
////关于dataType:text
//<?php
//echo 1;
//?>
//关于dataType:html
//<?php
//    $result = "<p>这是一个p</p>";
//echo $result;
//?>
//关于dataType:script
//<?php
//    /*php的数组申明方式，可以通过$result[index]或$result['username']来访问元素*/
//    $result = "alert(1)";
//echo $result;
//?>


//----------------------Bootstrap基础开始-------------------------------

//Bootstrap：微金所

//轮播自适应屏幕调整item容器的高度
//$(function(){
//    function change(){
//        var screenW = $(window).width();
//        $("#main-ad>.carousel-inner>.item").each(function(i,ele){
//            var data_image = $(ele).data(screenW > 960 ? "image-lg" : "image-xs");
//            if(screenW > 960){
//                $(ele).empty().css({
//                    "height" : "410px",
//                    "backgroundImage" : "url("+ data_image +")"
//                });
//            }else{
//                $(ele).removeAttr("style").css("height","auto").html("<img src='"+ data_image +"'/>");
//            }
//        });
//        var scro_width = 0;
//        $("#products > .container > .ul-wrapper > .nav-tabs li").each(function(i,ele){
//            scro_width += ele.clientWidth;
//        });
//        if($("#products > .container > .ul-wrapper").width() < scro_width){
//            $("#products > .container > .ul-wrapper > .nav-tabs").css("width",scro_width+"px");
//            $("#products > .container > .ul-wrapper").css("overflow-x","scroll");
//        }else{
//            $("#products > .container > .ul-wrapper > .nav-tabs").css("width","auto");
//            $("#products > .container > .ul-wrapper").css("overflow-x","auto");
//        }
//    };
//    $(window).bind("resize",function(){
//        change();
//    }).trigger('resize');
//    $('[data-toggle="tooltip"]').tooltip();
//    //新闻区域  给每一个a注册点击事件
//    $("#news > .container .nav-stacked li").children().bind("click",function(){
//        $(".new-title").text($(this).data("title"));
//    })
//    //控制轮播的左右滑动
//    //1.判断手指滑动的方向，bootstrap提供了ontouchstart、touchmove、touchend三个方法，ontouchstart负责监测手指触摸时初始坐标；ontouchmove负责检测手指滑动时坐标的变化；ontouchend负责监测手指离开时手指滑动的距离并且由此判断滑动的方向
//    var tStart, tMove, distance, direction;
//    $(".carousel").on({
//        "touchstart" : function(e){
//            $this = $(this);
//            tStart = e.originalEvent.touches[$(".carousel").index($this)].clientX;
//        },
//        "touchmove" : function(e){
//            var $this = $(this);
//            tMove = e.originalEvent.touches[$(".carousel").index($this)].clientX;
//        },
//        "touchend" : function(){
//            //2.得到手指滑动的距离
//            distance = tStart - tMove;
//            //3.如果距离大于50px就默认是在滑动，再进行判断方向，并使用bootstrap中的carousel方法，参数是prev就向前滑动，如果是next就是向后滑动
//            if(Math.abs(distance) > 50){
//                direction = distance > 0 ? "next" : "prev";
//                $(this).carousel(direction);
//            }
//        }
//    });
//
//
//
//});



//----------------------Canvas基础开始-------------------------------

// 简单使用canvas
//window.onload = function(){
////        第一步：获取canvas元素
//        var demo = document.getElementById("demo");
////        第二步：获取canvas元素的上下文，即内容
//        var cContext = demo.getContext('2d');
////        第三步：在画布中移动并找到相对应的点
//        cContext.moveTo(100,100);
////        第四步：绘制路径
//        cContext.lineTo(200,100);
//        cContext.lineTo(100,200);
////        在描边之前进行路径闭合
//        cContext.closePath();
////        对描边的样式要在描边之前定义
////        定义描边的颜色(一切颜色的表达方式)
//        cContext.strokeStyle = "red";
////        定义描边的粗细，扩充内容的lineWidth/2，向外扩充lineWidth/2，lineWidth用数字表达即可
//        cContext.lineWidth = 8;
//        //        对路径进行填充颜色
//        cContext.fillStyle = "green";
////        第五步：描边
//        cContext.stroke();
//        cContext.fill();
//}


////Canvas案例一：使用Canvas进行绘制表格
//window.onload = function(){
//    var canvas = document.getElementById("demo");
//    var cCon = canvas.getContext('2d');
//    var canvasW = canvas.width;
//
//    //绘制x轴的竖线
//    for(var i=0; i<=canvasW / 50; i++){
//        cCon.moveTo(50*i,0);
//        cCon.lineTo(50*i,canvasW);
//        //绘制y轴的竖线
//        cCon.moveTo(0, 50*i);
//        cCon.lineTo(canvasW, 50*i);
//        cCon.lineWidth = 2;
//        cCon.stroke();
//    }
//
//}


//Canvas案例二：绘制走势图
//window.onload = function(){
//    //使用canvas绘制走势图
//    var canvas = document.getElementById("demo");
//    var cCon = canvas.getContext('2d');
//
////绘制x轴和y轴,x轴长为400，y轴长为300
//    var xW = 400;
//    var yW = 300;
////    设置两轴距离画布的距离
//    var dis = 50;
//    strokeAxis(cCon,xW,yW,dis);
//
//
//    //x轴的走势坐标数组
//    var arrx = [0.1,0.5,0.7,0.8,.9];
//    //y轴的走势坐标数组
//    var arry = [0.5,0.8,0.2,0.3,0.6];
//
//    //绘制走势
//    //绘制第一个点
//    cCon.beginPath();
//    cCon.strokeStyle = "red";
//    cCon.moveTo(xW*arrx[0]+dis,yW*arry[0]+dis);
//    for(var i=1; i<arrx.length; i++){
//        cCon.lineTo(xW*arrx[i]+dis,yW*arry[i]+dis);
//    }
//    cCon.stroke();
//}
//function strokeAxis(cCon,xW,yW,dis){
//    cCon.beginPath();
//    cCon.strokeStyle = "lightgreen";
//    cCon.lineWidth = 4;
//    //绘制原点
//    //箭头所在的坐标
//    var xWd = xW + dis;
//    var yWd = yW + dis;
//    cCon.moveTo(dis,yWd);
////绘制x轴
//    cCon.lineTo(xWd,yWd);
////绘制x轴的箭头
//    cCon.lineTo(xWd-10,yWd+10);
//    cCon.moveTo(xWd,yWd);
//    cCon.lineTo(xWd-10,yWd-10);
//
//    //绘制y轴
//    cCon.moveTo(dis,yWd);
//    cCon.lineTo(dis,dis);
//    //绘制y轴的箭头
//    cCon.lineTo(dis-10,dis+10);
//    cCon.moveTo(dis,dis);
//    cCon.lineTo(dis+10,dis+10);
//
//    cCon.stroke();
//}


//Canvas应用：绘制矩形、圆形、文字
//window.onload = function(){
//    var canvas = document.getElementById("demo");
//    var cCon = canvas.getContext('2d');
//
//    ////绘制矩形
//    ////矩形方法一
//    //rect(x,y,width,height)的参数分别是矩形左上角的坐标、矩形的宽高
//    //cCon.rect(100,100,100,100);
//    //cCon.stroke();
//    ////矩形方法二
//    //cCon.beginPath();
//    //cCon.strokeStyle = "red";
//    //cCon.strokeRect(250,100,100,100);
//    ////填充矩形
//    //cCon.beginPath();
//    //cCon.fillStyle = "blue";
//    //cCon.fillRect(400,100,100,100);
//    ////矩形清除工具
//    //cCon.clearRect(400,180,10,10);
//    //cCon.fill();
//
//
//
//    ////绘制圆形
//    ////arc(x,y,r,sAngle,eAngle,clockdirection)的参数分别是圆心的坐标、圆的半径、起始角度、终点角度、是否为逆时针
//    ////计算当前角度的所在的弧度的方法是angle*Math.PI / 180，Math.PI代表π，180°的弧度为π
//    ////第一个扇形
//    //cCon.beginPath();
//    ////设置绘制起点由圆心开始
//    //cCon.moveTo(300,300);
//    //cCon.arc(300,300,100,60*Math.PI / 180,-60*Math.PI / 180,true);
//    //cCon.fillStyle = "red";
//    //cCon.closePath();
//    //cCon.fill();
//    //cCon.stroke();
//
//
//    //绘制饼状图
//    var data = [{
//        "angle": "0.4",
//        "color" : "red",
//        "text": "老学员"
//    },{
//        "angle": "0.3",
//        "color": "blue",
//        "text": "新学员"
//    },{
//        "angle": "0.1",
//        "color": "purple",
//        "text": "老师"
//    },{
//        "angle": "0.2",
//        "color": "orange",
//        "text": "工作人员"
//    }];
//
//    var sRadius = 0,eRadius = 0,angle;
//    var sAngle = -90,eAngle = 0;
//    var R = 100,x0 = 300, y0 = 300;
//    for(var i=0; i<data.length; i++){
//        angle = data[i].angle*360;
//        cCon.beginPath();
//        //绘制扇形
//        cCon.fillStyle = data[i].color;
//        cCon.moveTo(x0,y0);
//        sRadius = sAngle * Math.PI / 180;
//        eAngle = sAngle + angle;
//        eRadius = eAngle * Math.PI / 180;
//        cCon.arc(x0,y0,R,sRadius,eRadius);
//        cCon.fill();
//        //绘制扇形文字
//        cCon.beginPath();
//        cCon.font = "bold 16px '微软雅黑'";
//        cCon.textBaseline = "bottom";
//        if((eAngle >=0 && eAngle < 90) || (eAngle >= 270 && eAngle <= 360)){
//            cCon.textAlign = "left";
//        }else{
//            cCon.textAlign = "right";
//        }
//        cCon.fillText(data[i].text,x0+Math.cos((sAngle + angle / 2 )* Math.PI / 180)*(R+20),y0+Math.sin((sAngle + angle / 2 )* Math.PI / 180)*(R+20));
//        sAngle += angle;
//    }
//}


////Canvas应用：图片绘制
//window.onload = function(){
//    var canvas = document.getElementById("demo");
//    var cCon = canvas.getContext('2d');
//    var timer = null;
//    //第一步：创建Image的dom对象
//    var img = new Image();
//    //第二步：赋予img对象的src属性
//    //img.src = "image/a.jpg";
//    ////第三步：等待图片加载完成
//    //img.onload = function(){
//    //  //第四步：将图片绘制到画布上
//    //    var ow = img.width;
//    //    var oh = img.height;
//    //    cCon.drawImage(img,300,300,200,200*oh / ow);
//    //};
//    //自创上下走动
//    //img.src = "image/DMMban.png";
//    //img.onload = function(){
//    //    var key = 0,lu = 0, k = 0;
//    //    timer = setInterval(function(){
//    //        if(lu < canvas.height-65*2 && k == 0){
//    //            lu += 10;
//    //            if(lu == canvas.height - 65*2){
//    //                k = 1;
//    //            }
//    //            cCon.clearRect(300,lu,80,65*2);
//    //        }else{
//    //            cCon.clearRect(300,lu,80,65*2);
//    //            if(lu <= 0){
//    //                k = 0;
//    //            }
//    //            lu -= 10;
//    //        }
//    //
//    //        cCon.drawImage(img,40*key,0,40,65,300,lu,80,65*2);
//    //        key++;
//    //        if(key == 3){
//    //            key = 0;
//    //        }
//    //    },100);
//    //}
//
//    //模拟游戏控制人物上下左右走动
//    img.src = "image/DMMban.png";
//    var timer = null;
//    var buttons = document.getElementsByTagName("button");
//    var left = buttons[0];
//    var top = buttons[1];
//    var bottom = buttons[2];
//    var right = buttons[3];
//    img.onload = function(){
//        var farLeft = 300, farTop = 300;
//        cCon.drawImage(img,0,0,40,65,300,300,40,65);
//        var index = 0;
//        left.onclick = Walk(
//            function(){farLeft -= 5;},
//            function(){farLeft = farLeft <= 0 ? 0 : farLeft;},
//            65
//        );
//        top.onclick = Walk(
//            function(){farTop -= 5;},
//            function(){farTop = farTop <= 0 ? 0 : farTop;},
//            65*3
//        );
//        bottom.onclick = Walk(
//            function(){farTop += 5},
//            function(){farTop = farTop >= (canvas.height - 65) ? (canvas.height - 65) : farTop;},
//            0
//        );
//        right.onclick = Walk(
//            function(){farLeft += 5;},
//            function(){farLeft = farLeft >= (canvas.width - 40) ? (canvas.width - 40) : farLeft;},
//            65*2
//        );
//        function Walk(fLChange,fLValue,bgy){
//            index = 0;
//
//            return function(){
//                    clearInterval(timer);
//                    timer = setInterval(function(){
//                        cCon.clearRect(0,0,canvas.width,canvas.height);
//                        index++;
//                        fLChange();
//                        if(index >= 4){
//                            index = 0;
//                        }
//                        fLValue();
//                        cCon.drawImage(img,index*40,bgy,40,65,farLeft,farTop,40,65);
//                    },100);
//            };
//
//        };
//    }
//
//};


////Canvas案例三：模拟游戏控制人物上下左右走动（面向对象版）
//window.onload = function(){
//    //获取画布
//    var canvas = document.getElementById("demo");
//    //获取画布的上下文
//    var cCon = canvas.getContext('2d');
//    //获取上下左右的按钮
//    var buts = document.getElementsByTagName("button");
//    var left = buts[0];
//    var up = buts[1];
//    var down = buts[2];
//    var right = buts[3];
//
//
//    //new一个游戏人物对象
//    var gameBoy = new Role({
//        imgSrc : "image/DMMban.png",
//        bgx : 40,
//        bgy : 65,
//        bgw : 40,
//        bgh : 65,
//        w : 40,
//        h : 65,
//        speed : 4
//    });
//    gameBoy.draw(cCon);
//    //改变人物行走方向
//    gameBoy.changeDir(left,up,down,right);
//};
//
////游戏人物走动构造函数
//
//
////ctx,drawImage(imgsrc,bgx,bgy,bgw,bgh,x,y,w,h);
//function Role(options){
//    //初始化属性
//    this._init(options);
//}
//Role.prototype = {
//    //设置对象属性
//    _init: function(options) {
//        //设置背景图片的路径
//        this.imgSrc = options.imgSrc || "";
//        //设置截取背景图片的坐标x
//        this.bgx = options.bgx || 0;
//        //设置截取背景图片的坐标y
//        this.bgy = options.bgy || 0;
//        //设置截取背景图片的宽度
//        this.bgw = options.bgw || 40;
//        //设置截取背景图片的高度
//        this.bgh = options.bgh || 65;
//        //设置人物在画布定位的坐标x
//        this.x = options.x || 300;
//        //设置人物在画布定位的坐标y
//        this.y = options.y || 300;
//        //设置人物的实际宽度
//        this.w = options.w || 40;
//        //设置人物的实际高度
//        this.h = options.h || 65;
//        //设置人物一秒中内姿势变换的次数
//        this.time = options.time || 10;
//        //设置人物走动的方向
//        this.dir = 0;
//        //设置人物行走的速度
//        this.speed = options.speed || 10;
//        //设置开始行走的开关
//        key = 0;
//    },
//    //在画布中描绘人物的图像
//    draw: function(cCon){
//        //创建画布中关于img的dom对象
//        var img = new Image();
//        //赋予img的dom对象有关src的属性
//        img.src = this.imgSrc;
//        //等待img的加载完成
//        var _this = this;
//        var timer = "";
//        var i = 0;
//        img.onload = function(){
//            //设置定时器
//            timer = setInterval(function(){
//                //清除画布
//                cCon.clearRect(0,0,600,600);
//                console.log(_this.x)
//                //这里的this指向img，要指向对象才可以
//                cCon.drawImage(img,_this.bgx*i,_this.bgy*_this.dir,_this.bgw,_this.bgh,_this.x,_this.y,_this.w,_this.h);
//                if(_this.key){
//                    i = i == 3 ? 0 : i;
//                    i++;
//                }
//                //人物走动
//                _this.walk();
//            },1000 / _this.time);
//        }
//    },
//    //改变人物行走方向
//    changeDir: function(left,up,down,right){
//        var _this = this;
//        left.addEventListener("click",function(){
//            _this.dir = 1;
//            _this.key = 1;
//        });
//        up.addEventListener("click",function(){
//            _this.dir = 3;
//            _this.key = 1;
//        });
//        down.addEventListener("click",function(){
//            _this.dir = 0;
//            _this.key = 1;
//        });
//        right.addEventListener("click",function(){
//            _this.dir = 2;
//            _this.key = 1;
//        })
//    },
//    //使人物开始走动
//    walk: function(){
//        if(this.key){
//            if(this.dir == 1){
//                this.x = (this.x == 0) ? 0 : this.x-this.speed;
//            }else if(this.dir == 3){
//                this.y = (this.y == 0) ? 0 : this.y-this.speed;
//            }else if(this.dir == 0){
//                this.y = (this.y == 600-this.h) ? 600-this.h : this.y + this.speed;
//            }else{
//                this.x = (this.x == 600-this.w) ? 600-this.w : this.x + this.speed;
//            }
//        }
//    }
//}



////Canvas应用：不常用的绘制方法(了解、少用、性能差)
//window.onload = function(){
//    var canvas = document.getElementById("demo");
//    var cCon = canvas.getContext('2d');
//
//    //设置阴影
//    ////shadowColor是阴影颜色，shadowBlur是代表阴影模糊程度，shadowOffsetX/Y代表阴影于参照物的偏移
//    //cCon.fillStyle = "blue";
//    //cCon.shadowColor = "red";
//    //cCon.shadowBlur = 5;
//    //cCon.shadowOffsetX = 10;
//    //cCon.fillRect(300,300,100,100);
//
//
//    //设置线性渐变
//    ////.createLinearGradient(x0,y0,x',y')，x0和y0代表线性渐变的起始点，x'和y'代表线性渐变的结束点
//    //var grd = cCon.createLinearGradient(300,300,400,400);
//    //grd.addColorStop(0,"red");
//    //grd.addColorStop(0.5,"blue");
//    //grd.addColorStop(1,"yellow");
//    //cCon.fillStyle = grd;
//    //cCon.fillRect(300,300,100,100);
//
//    //设置圆形渐变：没搞懂参数
//    //cCon.strokeStyle = "green";
//    ////createRadialGradient(x0,y0,r0,x',y',r')，x0和y0是内圆圆心，x'和y'是外圆圆心，r0是内圆半径，r'是外圆半径，圆形渐变是由内圆向外圆进行扩散形成渐变，当r0等于r'时，为同心圆
//    //var grd = cCon.createRadialGradient(250,250,10,250,250,200);
//    //grd.addColorStop(0,"red");
//    //grd.addColorStop(0.5,"blue");
//    //grd.addColorStop(1,"yellow");
//    //cCon.fillStyle = grd;
//    //cCon.strokeRect(100,100,300,300);
//    //cCon.fillRect(100,100,300,300);
//
//    //不常用的绘制方法
//    //1.画布的缩放：
//    //cCon.fillStyle = "red";
//    //cCon.fillRect(300,300,100,100);
//    ////设置画布缩放后内容也跟着缩放
//    //cCon.scale(0.5,0.5);
//    //cCon.fillStyle = "blue";
//    //cCon.fillRect(0,0,100,100);
//
//    //2.画布的位移
//    //cCon.fillStyle = "red";
//    //cCon.translate(200,200);
//    //cCon.fillRect(0,0,100,100);
//
//    //3.画布的旋转
//    //cCon.fillStyle = "red";
//    ////x轴右半轴为0deg，顺时针递增
//    //cCon.rotate(20*Math.PI / 180);
//    //cCon.fillRect(0,0,100,100);
//
//    //4.画布状态的保存和恢复
//    //保存当前状态
//    //cCon.save();
//    //cCon.fillStyle = "red";
//    //cCon.rotate(20*Math.PI / 180);
//    //cCon.fillRect(0,0,100,100);
//    ////恢复保存时的状态
//    //cCon.restore();
//    //cCon.fillStyle = "blue";
//    //cCon.fillRect(100,100,100,100);
//}

//Canvas应用：封装矩形绘制
//window.onload = function(){
//    var canvas = document.getElementById("demo");
//    var cCon = canvas.getContext('2d');
//    var rect1 = new createRect({
//        x: 100,
//        y: 100,
//        w: 100,
//        h : 100,
//        opacity : 0.5,
//        rotation : 10,
//        fillStyle : "red",
//        strokeStyle : "green",
//        scaleX : 1.5,
//        scaleY : 1.5
//    });
//    rect1.drawRect(cCon);
//}
////封装矩形的构造函数
//function createRect(options){
//    //初始化矩形的属性
//    this._init(options);
//}
//createRect.prototype = {
//    _init: function(options){
//        this.x = options.x || 0;
//        this.y = options.y || 0;
//        this.w = options.w || 0;
//        this.h = options.h || 0;
//        this.opacity = options.opacity == 0 ? 0 : options.opacity || 1;
//        this.rotation = options.rotation || 0;
//        this.scaleX = options.scaleX;
//        this.scaleY = options.scaleY;
//        this.fillStyle = options.fillStyle || "transparent";
//        this.strokeStyle = options.strokeStyle || "transparent";
//    },
//    drawRect: function(cCon){
//        cCon.save();
//        cCon.beginPath();
//        cCon.rotate(this.rotation*Math.PI / 180);
//        cCon.scale(this.scaleX,this.scaleY);
//        cCon.translate(this.x,this.y);
//        cCon.globalAlpha = this.opacity;
//        cCon.strokeStyle = this.strokeStyle;
//        cCon.fillStyle = this.fillStyle;
//        cCon.strokeRect(0,0,this.w,this.h);
//        cCon.fillRect(0,0,this.w,this.h);
//        cCon.restore();
//    }
//}

////Canvas应用：画布绘制画布
//window.onload = function(){
//    var canvas = document.getElementById("demo");
//    var cCon = canvas.getContext('2d');
//    ////将canvas保存为base64编码内容
//    //cCon.fillStyle = "red";
//    //cCon.fillRect(100,100,100,100);
//    //var img = document.getElementsByTagName("img")[0];
//    //img.src = canvas.toDataURL("image.jpg,1");
//    //画布绘制画布
//    var newCanvas = document.createElement("canvas");
//    var newcCon = canvas.getContext('2d');
//    newcCon.fillStyle = "red";
//    newcCon.fillRect(100,100,100,100);
//    cCon.drawImage(newCanvas,0,0);
//}


//----------------------Konva库基础开始-------------------------------


//Canvas—Konva库的基本使用
//window.onload = function(){
//    //建立全屏舞台
//    var stage = new Konva.Stage({
//        container : "container",
//        width : window.innerWidth,
//        height : window.innerHeight
//    });
//    //建立舞台中的层
//    var layer = new Konva.Layer();
//    //将层添加到舞台中
//    stage.add(layer);
//    //绘制矩形
//    var rect = new Konva.Rect({
//        x : 100,
//        y : 100,
//        width : 100,
//        height : 100,
//        fill : "red",
//        rotation : 30,
//        opacity : 0.4,
//        draggable : true //是否可以拖动
//    });
//    //将矩形放入层中
//    layer.add(rect);
//    //渲染层
//    layer.draw();
//}


//Konva案例一：使用Konva绘制进度条
//window.onload = function(){
//    imgProgress();
//   window.addEventListener("resize",imgProgress);
//    function imgProgress(){
//
//        //创建全屏舞台
//        var stage = new Konva.Stage({
//            width : innerWidth,
//            height : innerHeight,
//            container : "container"
//        });
//        //创建层
//        var layer = new Konva.Layer();
//        //将层添加到舞台中
//        stage.add(layer);
//        //设置进度条的位置和高宽
//        var barX = stage.width() / 4;
//        var barY = stage.height() / 3;
//        var barWidth = stage.width() / 2;
//        var barHeight = 40;
//        //创建内部矩形
//        var innerRect = new Konva.Rect({
//            x : barX,
//            y : barY,
//            width : 0,
//            height : barHeight,
//            opacity : 0.3,
//            cornerRadius : barHeight / 3, //设置圆角
//            fill : "lightblue"
//        });
//        //创建外部矩形边框
//        var outRect = new Konva.Rect({
//            x : barX,
//            y : barY,
//            width : barWidth,
//            height : barHeight,
//            stroke : "#ccc",
//            cornerRadius : barHeight / 3
//        });
//        //将矩形放入层中
//        layer.add(innerRect);
//        layer.add(outRect);
//        //渲染层
//        layer.draw();
//        var imgArr = ["image/.jpg","image/c_06.jpg","image/.jpg","image/.jpg"];
//        //设置图片的序数
//        var imgIndex = 0;
//        //多张图片的进度条加载
//        //a.jpg是不存在的，所以到3/5就停下来
//        for(var i=0; i<imgArr.length; i++){
//            var img = new Image();
//            img.src = imgArr[i];
//            img.onload = function(){
//                //imgIndex是只有在图片正常加载的时候才进行自加，所以不可以写在onload的外面
//                imgIndex++;
//                //设置进度条Konva动画
//                innerRect.to({
//                    width : barWidth * (imgIndex / imgArr.length),
//               //duration是可以正常加载所有图片时进度条进度的总共时间
//                    duration : 2,
//                    easing : Konva.Easings.StrongEaseInOut
//                });
//            }
//        }
//
//    }
//}



////Konva案例一：使用Konva绘制进度条的面向对象封装
//window.onload = function(){
//    //创建舞台
//    var stage = new Konva.Stage({
//        container : "container",
//        width : window.innerWidth,
//        height : window.innerHeight
//    });
//    //创建层
//    var layer = new Konva.Layer();
//    //将层放入stage当中
//    stage.add(layer);
//    //绘制一个矩形
//    var rect1 = new createRect({
//        width : 500,
//        height: 30,
//        color : "yellow",
//        opacity :0.5,
//        strokeColor : "orange",
//        value : .7
//    });
//    rect1.addRect();
//    rect1.putLayer(layer);
//    //将矩形添加到层中
//    layer.draw();
//
//};
//
////绘制进度条的封装方法
//function createRect(options){
//    //初始化属性
//    this._init(options);
//}
//createRect.prototype = {
//    _init:function(options){
//        //进度条的宽度和高度
//        this.width = options.width || 500;
//        this.height = options.height || 30;
//        //设置进度条的颜色
//        this.bgcolor = options.color || "lightblue";
//        //设置进度条的透明度
//        this.opacity = options.opacity || 1;
//        //设置进度条的边框颜色
//        this.strokeColor = options.strokeColor || "blue";
//        //设置进度条的圆角
//        this.cornerRadius = options.cornerRadius == 0 ? 0 : this.cornerRadius || this.height / 2;
//        //设置进程长度
//        this.value = options.value || 1;
//    },
//    addRect:function(){
//        //创建绘制外部边框矩形对象
//        var outRect = new Konva.Rect({
//            width : this.width,
//            height : this.height,
//            stroke : this.strokeColor,
//            cornerRadius : this.cornerRadius
//        });
//        //创建绘制内部矩形对象
//        var innerRect = new Konva.Rect({
//            width : 0,
//            height : this.height,
//            fill : this.bgcolor,
//            opacity : this.opacity,
//            cornerRadius : this.cornerRadius,
//            id : "innerRect"
//        });
//        //创建矩形组，相当于是为两个矩形创建一个外部盒子
//        this.group = new Konva.Group({
//            x : window.innerWidth / 4, //设置这个外部盒子的定位
//            y : window.innerHeight / 3
//        });
//        //将两个矩形放入这个组中
//        this.group.add(innerRect);
//        this.group.add(outRect);
//    },
//    //进度条的动画事件
//    progress : function(){
//        //根据传入的value来计算进度条的最终进程
//        //判断如果传来的value>1就进行处理
//        if(this.value > 1){
//            this.value /= 100;
//        };
//        //其实innerRect也可以使用this.innerRect来进行引用，但是这样就会增添了原型的的属性，加大了所占的内存大小
//        //findOne方法相当于jq的find方法，可以寻找符合选择器的元素，因此需要给innerRect对象设置id属性进行识别
//        var innerRect = this.group.findOne("#innerRect");
//        innerRect.to({
//            width : this.value * this.width,
//            duration : 2,
//            easing : Konva.Easings.EaseInOut
//        });
//    },
//    //将绘制矩形对象放入层中
//    putLayer : function(lay){
//        lay.add(this.group);
//        this.progress();
//    }
//
//}
//



////Konva案例二：绘制webitcast星球旋转效果
//window.onload = function(){
//    //建立舞台
//    var stage = new Konva.Stage({
//        width : window.innerWidth,
//        height : window.innerHeight,
//        container : "container"
//    });
//    //建立固定层
//    var layer = new Konva.Layer();
//    //建立第二轨道动画层
//    var layer1 = new Konva.Layer();
//    //建立第三轨道动画层
//    var layer2 = new Konva.Layer();
//    //将层添加到舞台中
//    stage.add(layer);
//    stage.add(layer1);
//    stage.add(layer2);
//    //创建大轨道
//    var strokeTrack1 = new createItcast({
//        dash : [10,4],
//        strokeWidth : 5
//    });
//    //创建小轨道
//    var strokeTrack2 = new createItcast({
//        dash : [10,4],
//        radius : 150,
//        strokeWidth : 5
//    });
//    //创建中心web全栈星球
//    var planet1 = new createItcast({
//        radius : 80,
//        opacity : 1,
//        strokeWidth : 30,
//        text : "Web全栈"
//    });
//    //创建第二轨道的HTML5星球
//    var planet2 = new createItcast({
//        radius : 40,
//        fill : "#FFB129",
//        distancex : 150 * Math.cos(125*Math.PI / 180),
//        distancey : 150 * Math.sin(125*Math.PI / 180),
//        text : "HTML5"
//    });
//    //创建第二轨道的CSS3星球
//    var planet3 = new createItcast({
//        radius : 40,
//        fill: "#F8D9D9",
//        distancex : 0,
//        distancey : -150,
//        text : "CSS3"
//    });
//    //创建第三轨道的JS星球
//    var planet4 = new createItcast({
//        radius : 40,
//        fill : "#A1C8F8",
//        distancex : 250 * Math.cos(-45 * Math.PI / 180),
//        distancey : 250 * Math.sin(-45 * Math.PI / 180),
//        text : "JS",
//        angleDuration : 20
//    });
//    //轨道数组
//    var trackArr = [strokeTrack1,strokeTrack2];
//    for(var i=0; i< trackArr.length; i++){
//        trackArr[i].drawTrack();
//        trackArr[i].drawLayer(layer);
//    }
//    //星球数组
//    var planetArr = [planet1,planet2,planet3,planet4];
//    for(var i=0; i<planetArr.length ; i++){
//        planetArr[i].drawPlanet();
//        if(planetArr[i] == planet1){
//            planetArr[i].drawLayer(layer);
//        }else{
//            if(planetArr[i] == planet4){
//                planetArr[i].rotateAnimation(layer2);
//            }
//            planetArr[i].drawLayer(layer1);
//            planetArr[i].rotateAnimation(layer1);
//        }
//    };
//    strokeTrack1.mouseEvent(layer);
//};
////创建构造函数
//function createItcast(options){
//    this._init(options);
//};
////createItcast的原型
//createItcast.prototype = {
//    _init: function(options){
//        this.x = options.x || (window.innerWidth / 2);
//        this.y = options.y || (window.innerHeight / 2);
//        this.distancex = options.distancex || 0;
//        this.distancey = options.distancey || 0;
//        this.radius = options.radius || 250;
//        this.stroke = options.stroke || "#CCC";
//        this.dash = options.dash || 0;
//        this.strokeWidth = options.strokeWidth || 16;
//        this.fill = options.fill || "#717999";
//        this.opacity = options.opacity || .7;
//        this.color = options.color || "#fff";
//        this.text = options.text || "";
//        this.fontSize = options.fontSize || 16;
//        this.angleDuration = options.angleDuration || 50;
//    },
//    createGroup : function(){
//        this.group = new Konva.Group({
//            x : this.x,
//            y : this.y
//        })
//    },
//    strokeTrack: function(){
//        var strokeball = new Konva.Circle({
//            x : this.distancex,
//            y : this.distancey,
//            radius : this.radius,
//            stroke : this.stroke,
//            strokeWidth : this.strokeWidth,
//            dash : this.dash
//        });
//        this.group.add(strokeball);
//    },
//    fillPlanet : function(){
//        var fillball = new Konva.Circle({
//            x : this.distancex,
//            y : this.distancey,
//            radius : this.radius,
//            fill : this.fill,
//            opacity : this.opacity
//        });
//        this.group.add(fillball);
//    },
//    fillText : function(){
//        var planetText = new Konva.Text({
//            text : this.text,
//            x : this.distancex - this.radius - this.strokeWidth / 2,
//            y: this.distancey - this.fontSize / 2,
//            translatex : -(this.radius + this.strokeWidth / 2),
//            translatey : -this.fontSize / 2,
//            width : this.radius*2 + this.strokeWidth,
//            fontSize: this.fontSize,
//            fill : this.color,
//            align : "center",
//            fontStyle : "bold",
//            fontFamily : "微软雅黑",
//            name : "text"
//        });
//        this.group.add(planetText);
//    },
//    drawTrack : function(){
//        this.createGroup();
//        this.strokeTrack();
//    },
//    drawPlanet : function(){
//        this.createGroup();
//        this.fillPlanet();
//        this.strokeTrack();
//        this.fillText();
//    },
//    drawLayer : function(layer){
//        layer.add(this.group);
//        layer.draw();
//    },
////制作帧动画
//    rotateAnimation : function(layer){
//        var _this = this;
//        var animation = new Konva.Animation(function(frame){
//            var angle = _this.angleDuration * frame.timeDiff / 1000;
//            _this.group.rotate(angle);
//        },layer);
//        animation.start();
//    },
//    mouseEvent : function(layer){
//        //鼠标移入事件
//        layer.on("mouseenter",function(){
//            this.angleDuration = 30;
//        });
//        layer.on("mouseleave",function() {
//            this.angleDuration = 50;
//        });
//    }
//}


////Konva案例三：柱形图案例—面向对象
//window.onload = function(){
//    //建立舞台
//    var stage = new Konva.Stage({
//        width : window.innerWidth,
//        height : window.innerHeight,
//        container : "container"
//    });
//    //创建层
//    var layer = new Konva.Layer();
//    //将层添加到舞台中
//    stage.add(layer);
//    //绘制坐标底线
//    var totalW = window.innerWidth;
//    var totalH = window.innerHeight;
//    var bottomLine = new Konva.Line({
//        //points : [x,y,x',y']
//        //条形图的宽度为1/2totalW，高度为3/4totalH
//        points : [1/4*totalW,3/4*totalH,3/4*totalW,3/4*totalH],
//        strokeWidth : 2,
//        stroke : "lightgreen"
//    });
//    //条状的数组
//    var data = [
//        {
//            color : "#47974C",
//            height : 0.8,
//            textcn : "前端"
//        },
//        {
//            color : "#4D59FF",
//            height : 0.3,
//            textcn : "Java"
//        },
//        {
//            color : "#FF5F4D",
//            height : 0.7,
//            textcn : "PHP"
//        },
//        {
//            color : "#FFBD49",
//            height : 0.9,
//            textcn : "IOS"
//        },
//        {
//            color : "#AB5BA6",
//            height : 0.4,
//            textcn : "UI"
//        },
//        {
//            color : "#FDD4D6",
//            height : 0.9,
//            textcn : "Node"
//        }
//    ];
//    //相当于for循环，而且item = data[i],index = i;
//    data.forEach(function(item,index){
//        var newRect = new barChart({
//            x : 1/4*totalW,
//            y : 3/4*totalH,
//            distancex : (1/2*totalW / data.length / 4) + 1/2*totalW / data.length*index,
//            distancey : item.height,
//            color : item.color,
//            width : 1/2*totalW / data.length / 2,
//            height : item.height * 3/4*totalH,
//            text : item.height * 100 + "%",
//            textcn : item.textcn,
//            textY : 3/4*totalH + 5
//        });
//        newRect.drawBar();
//        newRect.addToLayer(layer);
//        newRect.addBarAnimation();
//    });
//    layer.add(bottomLine);
//    layer.draw();
//};
////创建构造函数
//function barChart(options){
//    this._init(options);
//};
////构造函数的原型
//barChart.prototype = {
//    _init : function(options){
//        this.x = options.x || 0;
//        this.y = options.y || 0;
//        this.distancex = options.distancex || 0;
//        this.distancey = options.distancey || 0;
//        this.width = options.width || 0;
//        this.height = options.height || 0;
//        this.color = options.color;
//        this.cornerRadius = options.cornerRadius || 10;
//        this.text = options.text || "";
//        this.textcn = options.textcn || "";
//    },
//    //创建group
//    createGroup : function(){
//      this.group = new Konva.Group({
//          x : this.x,
//          y : this.y
//      })
//    },
//    //创建绘制矩形的方法
//    createRect : function(){
//        var rect = new Konva.Rect({
//            x : this.distancex,
//            y : 0,
//            width : this.width,
//            height : 0,
//            fill: this.color,
//            cornerRadius : this.cornerRadius,
//        });
//        this.group.add(rect);
//    },
//    //创建绘制文字的方法
//    createText : function(){
//        var txt = new Konva.Text({
//            text : this.text,
//            x : this.distancex + 10,
//            y : 0,
//            fill : this.color,
//            name : "txt"
//        });
//        var txtcn = new Konva.Text({
//            text : this.textcn,
//            x : this.distancex + 10,
//            y : 5,
//            fill : this.color,
//            rotation : 30
//        });
//        this.group.add(txt);
//        this.group.add(txtcn);
//    },
//    //条形绘制完成方法
//    drawBar : function(){
//        this.createGroup();
//        this.createRect();
//        this.createText();
//    },
//    //将group添加到层中
//    addToLayer : function(layer){
//        layer.add(this.group);
//    },
//    //条状动画
//    addBarAnimation : function(){
//        this.group.find("Rect").to({
//            height : this.height,
//            y : -this.distancey*this.y,
//            duration : 1,
//            easing: Konva.Easings.EaseInOut
//        });
//        this.group.find(".txt").to({
//            y : -this.distancey*this.y - 16,
//            duration : 1,
//            easing: Konva.Easings.EaseInOut
//        });
//    }
//}


//CVTE面试题型3

//CVTE面试题型3：使用闭包原理进行隔0.5s对arr=[0~9]进行打印，并讲述闭包的作用
//window.onload = function(){
//    var timer = setInterval(function(){
//        var arr = [0,1,2,3,4,5,6,7,8,9];
//        var index = 0;
//        return function(){
//            if(index < arr.length){
//                console.log(arr[index]);
//                index++;
//            }else{
//                clearInterval(timer);
//            }
//        }
//    }(),500)
//}


//CVTE面试题型4

//CVTE面试题型4：将重复的数组选项按重复的次数进行排名，输入排名，输出对应的数字
//window.onload = function(){
//    var arr = [1,6,8,3,4,4,1,6,2,1,3,5,4,6,1,3];
//    var arr1 = arr.sort(function(a,b){
//        return a-b;
//    });
//    console.log(arr1);
//    var arr2 = [];
//    var key = 1;
//    for(var i=0; i<arr1.length; i++){
//        if(arr1[i+1] == arr[i]){
//            key ++;
//        }else{
//            var tt = {};
//            tt.ele = arr[i];
//            tt.number = key;
//            arr2.push(tt);
//            key = 1;
//        }
//    };
//    console.log(arr2);
//
//    //排名数组
//    var array = [];
//    for(var k=0; k<arr2.length; k++){
//        array.push(arr2[k].number);
//    };
//    array = array.sort(function(a,b){
//        return b-a;
//    });
//    console.log("array:"+array);
//
//    var array1 = [];
//    ///*使用while*/
//    //var t=0;
//    //while(t<array.length){
//    //    var a = [];
//    //    var beginIndex = t;
//    //    var lastIndex = array.lastIndexOf(array[t]);
//    //    for(var k=beginIndex; k<=lastIndex; k++){
//    //        a.push(array[k]);
//    //    }
//    //    array1.push(a);
//    //    t= lastIndex+1;
//    //}
//    ///*使用for*/
//    for(var i=0; i<array.length; i++){
//    /*注意for的i++是在执行函数最后进行自加的，再回到头部进行判断*/
//        var a = [];
//        var beginIndex = i;
//        var lastIndex = array.lastIndexOf(array[i]);
//        for(var k = beginIndex; k<=lastIndex;k++){
//            a.push(array[k]);
//        }
//        array1.push(a);
//        i = lastIndex;
//    }
//    console.log(array1)
//
//    //获得文本框的数字
//    var inpu = document.getElementById("inpu");
//    //获得提交按钮
//    var but = document.getElementById("but");
//    but.onclick = function(){
//        var p = document.createElement("p");
//        p.innerHTML = "";
//        var n = array1[inpu.value - 1][0];
//        for(var i=0; i<array.length;i++){
//            if(arr2[i].number == n){
//                p.innerHTML += " "+arr2[i].ele+"";
//            }
//        }
//        document.body.appendChild(p);
//    }
//};



////Konva案例三：动态饼状图面向对象
//window.onload = function(){
//    //创建舞台
//    var stage = new Konva.Stage({
//        width : window.innerWidth,
//        height : window.innerHeight,
//        container : "container"
//    });
//    //创建层
//    var layer = new Konva.Layer();
//    //将层添加到舞台中
//    stage.add(layer);
//    //关于饼状图属性的数组
//    var data = [
//        {name :"HTML5", color :"red",percent :0.3},
//        {name :"Java", color :"lightblue",percent : 0.1},
//        {name : "PHP", color : "blue",percent : 0.2},
//        {name : "Android", color : "green", percent : 0.1},
//        {name : "全栈", color : "orange", percent : 0.25},
//        {name : "网络营销", color : "purple", percent : 0.05}
//    ];
//    var piechart = new createPieChart({
//        data : data
//    });
//    piechart.addToLayer(layer);
//    piechart.addAnimation(layer);
//};
////创建饼状图的构造函数
//function createPieChart(options){
//    this._init(options);
//}
//createPieChart.prototype = {
//    _init : function(options){
//        this.data = options.data || [];
//        this.x = options.x || window.innerWidth / 2;
//        this.y = options.y || window.innerHeight / 2;
//        this.radius = options.radius || 150;
//        //动画索引
//        this.index = 0;
//        this.duration = options.duration || 2;
//    },
//    //创建group
//    createGroup : function(){
//        this.group = new Konva.Group({
//            x : this.x,
//            y : this.y
//        });
//    },
//    //绘制楔形和文字
//    createPie : function(){
//        var angle = 0,
//            rotation = 0;
//        for(var i=0 ; i<this.data.length; i++){
//            angle = this.data[i].percent * 360;
//            var wedge = new Konva.Wedge({
//                radius : this.radius,
//                fill : this.data[i].color,
//                rotation : rotation + 90,
//                angle : 0
//            });
//            var text = new Konva.Text({
//                width : 100,
//                text : this.data[i].name + " " + this.data[i].percent*100 + "%",
//                fill : this.data[i].color,
//                x : (this.radius + 20) *  Math.cos((rotation + 90+ angle / 2) * Math.PI / 180),
//                y : (this.radius + 20) *  Math.sin((rotation + 90 +angle / 2) * Math.PI / 180),
//                opacity : 0
//            });
//            if((rotation + 90+ angle / 2) < 270 && (rotation + 90+ angle / 2) > 90){
//                text.x((this.radius + 20) *  Math.cos((rotation + 90+ angle / 2) * Math.PI / 180) - 60);
//            }
//            rotation += angle;
//            this.group.add(wedge);
//            this.group.add(text);
//        }
//        console.log(this.group)
//    },
//    //添加到层
//    addToLayer : function(layer){
//        this.createGroup();
//        this.createPie();
//        layer.add(this.group);
//        layer.draw();
//    },
//    //添加动画
//    addAnimation : function(layer){
//        //得到所有的楔形
//        var wedges = layer.find('Wedge');
//        var texts = layer.find("Text");
//        var _this = this;
//        wedges[this.index].to({
//            duration : this.duration * this.data[_this.index].percent,
//            angle : this.data[_this.index].percent * 360,
//            onFinish : function(){
//                texts[_this.index].to({
//                    opacity : 1
//                });
//                _this.index++;
//                if(_this.index >= wedges.length) {
//                    _this.index = 0;
//                    return; //结束当前函数
//                }
//                //递归函数
//                _this.addAnimation(layer);
//            }
//        });
//    }
//}





//----------------------面向对象基础开始-------------------------------

////面向对象案例一：商品列表
////定义一个商品类
//function Product(){
//    this.intro = "";
//    this.price = 0;
//    this.people = 0;
//    this.image = "";
//};
////商品类的原型
//Product.prototype = {
//    //绑定DOM，便于修改，一改全改
//    bindDOM : function(){
//        var str = "";
//        str += "<dl>";
//        str += "<dt><a href='#'></a></dt>";
//        str += "<dd class='product_intro'>";
//        str += "<a href='#'><span>"+ this.intro +"</span></a>";
//        str += "</dd>";
//        str += "<dd class='product_price'>";
//        str += "<p><strong>"+ this.price +"</strong></p>";
//        str += "</dd>";
//        str += "<dd>";
//        str += "<p>已经有："+ this.people +"个人购买</p>";
//        str += "</dd>";
//        str += "</dl>";
//        return str;
//    }
//};
//
//window.onload = function(){
//    var productList = document.getElementById("productList");
//
//    var product1 = new Product();
//    product1.intro = "玉兰油，你值得拥有";
//    product1.price = 99;
//    product1.people = 120;
//    product1.image = "slide_01_640x340.jpg";
//    var product2 = new Product();
//    product2.intro = "温碧泉，你的不老秘密";
//    product2.price = 30;
//    product2.people = 40;
//    product2.image = "slide_02_640x340.jpg";
//    var product3 = new Product();
//    product3.intro = "一叶子，专属于你的面膜专家";
//    product3.price = 120;
//    product3.people = 50;
//    product3.image = "slide_03_640x340.jpg";
//
//    //商品集合
//    var productArr = [product1,product2,product3];
//
//    for(var i=0; i<productArr.length; i++){
//        productList.innerHTML += productArr[i].bindDOM();
//    }
//
//    var productDt = productList.getElementsByTagName("dt");
//    for(var k=0; k<productDt.length; k++){
//        productDt[k].style.backgroundImage = "url('image/"+ productArr[k].image +"')";
//    }
//
//}


////面向对象：虎嗅网站
//function Message(){
//    //新闻列表的标题
//    this.title = "";
//    //新闻列表的介绍详情
//    this.intro = "";
//    //新闻的来源网站
//    this.originSite = "";
//    //新闻的日期
//    this.year = 0;
//    this.month = 0;
//    this.day = 0;
//    //新闻的评论人数
//    this.number = 0;
//}
//Message.prototype = {
//    //绑定DOM
//    bindDOM : function(){
//        var str = "";
//        str += "<dl class='clearfix'>";
//        str += "<dt>"+ this.title +"</dt>";
//        str += "<dd class='intro_image'></dd>";
//        str += "<dd class='intro'>"+ this.intro +"</dd>";
//        str += "<dd class='intro_date'>"+ this.originSite + "|" + this.year + "-" + "-" + this.month + "- " + this.day + "|评论(" + this.number +")</dd>";
//        str += "</dl>";
//
//        return str;
//
//    }
//};
//
//window.onload = function(){
//    var section = document.getElementById("section");
//    var message1 = new Message();
//    message1.title = "腾讯京东";
//    message1.intro = "“京东+微信”，抑或是“易迅+微信+京东”，之于京东，之于腾讯电商，都是很有想象力的，是打一次翻身仗的机会";
//    message1.originSite = "新浪网";
//    message1.year = 2017;
//    message1.month = 7;
//    message1.day = 1;
//
//    var message2 = new Message();
//    message2 = message1;
//
//    var messageArr = [message1,message2];
//    for(var i=0; i<messageArr.length; i++){
//        section.innerHTML += messageArr[i].bindDOM();
//    }
//};

//formatString

//formateDate的原理
//function formateDate(data,format){
//    var  o = {
//        "M+" : data.getMonth()+1, //month
//        "d+" : data.getDate(),    //day
//        "h+" : data.getHours(),   //hours
//        "m+" : data.getMinutes(), //Minutes
//        "s+" : data.getSeconds(), //Seconds
//        "q+" : Math.floor((data.getMatrix()+3)/3), //quarter
//        "S" : data.getMilliseconds() //millsecond
//    };
//    if(data.test(/(y+)/)){
//        format = format.replace(RegExp.$1,data.getFullYear().substr(4-RegExp.$1.length));
//    }
//    for(var k in o){
//        if(new RegExp("(" +k+ ")").test(format)){
//            format = format.replace(RegExp.$1,RegExp.$1.length == 1 ? o[k] : (o[k]+ "00").substr((o[k]+"").length));
//        }
//    };
//    return format;
//}



//关于replace的知识点补充
//window.onload = function(){
//    //同个正则表达式括号内容形式不同就会分别用ke1，key2...进行保存
//    var str = "China is the safest country";
//    str = str.replace(/(China)[\w*\s*]+(safest)/g,function(match,key,key1){
//        console.log(key);
//        console.log(key1);
//    });
//    //使用同个括号内容形式获取方式会直接将key当成数组进行保存每次匹配相同表达式的值
//    //var str = "{China} is the safest {America} country";
//    //str = str.replace(/\{(\w*)\}/g,function(match,key){
//    //    console.log(key);
//    //})
//}


//CVTE面试题型5

//CVTE面试题型5：将"aaa bbb ccc"变成"Aaa Bbb Ccc"
//window.onload = function(){
//    ////第一种方法：利用正则匹配
//    //var str = "aaa bbb ccc";
//    //    str1 = str.replace(/\b(\w*)\b/g,function($1){
//    //        return $1.substr(0,1).toUpperCase() + $1.substr(1);
//    //    });
//    //console.log(str1);
//
//    ////第二种方法：利用字符串拆分成数组
//    //var str = "aaa bbb ccc";
//    //var arr = str.split(" ");
//    //for(var i=0; i<arr.length; i++){
//    //    arr[i] = arr[i].substr(0,1).toUpperCase() + arr[i].substr(1);
//    //};
//    //console.log(arr.join(" "));
//}



//模板formateString
//function B(){
//}
//
//B.prototype = {
//    formateString : function(str,data){
//        var regx = /@\((\w*)\)/;
//        str = str.replace(regx,function(match,key){
//            return data[key];
//        });
//        return str;
//    }
//}
//
//
//window.onload = function(){
//    var arr = {name : "龚耀文", age: 10};
//    var p = document.getElementById("p1");
//    var b = new B();
//    p.innerHTML = formateString("这是@(name)",arr);
//}


//百度星座
//function  Constellation(options){
//    this.config(options);
//}
//
//Constellation.prototype = {
//    config : function(options){
//        this.data = options.data;
//        this.dom = options.dom;
//    },
//    init : function(){
//        this.bindDOM();
//        this.bindEvent(this.dom);
//    },
//    //绑定DOM
//    bindDOM : function(){
//        var str = "";
//        for(var i = 0; i<this.data.length;  i++){
//            str += "<div class='xingzuo'>";
//            str +=  "<div class='item num-0'>";
//            str +=      "<div class='image'></div>";
//            str +=      "<div class='description'>";
//            str +=          "<p class='name'>"+ this.data[i].name +"</p>";
//            str +=          "<p class='time'>"+ this.data[i].time +"</p>";
//            str +=          "<div class='mark' data-key = '0'></div>"
//            str +=      "</div>";
//            str +=  "</div>";
//            str += "</div>";
//        }
//        this.dom.html(str);
//    },
//    //绑定事件
//    bindEvent : function(){
//        var that = this;
//        this.dom.find(".xingzuo").each(function(index,ele){
//            console.log($(ele).find(".description").parent().attr("class"));
//            //鼠标经过的时候边框变色
//            $(ele).bind("click mouseenter",function(event){
//                //鼠标经过事件
//                if(event.type == "mouseenter"){
//                    $(ele).find(".description").addClass("select");
//                    $(ele).siblings().each(function(){
//                        if($(this).find(".mark").data("key") != 1){
//                            $(this).find(".description").removeClass("select");
//                        }
//                    })
//                }
//                //判断点击事件令勾出现
//                if(event.type == "click") {
//                    if ($(ele).find(".mark").data("key") == 0) {
//                        $(ele).find(".description")
//                            .addClass("select");
//                        $(ele).find(".mark")
//                            .show()
//                            .data("key", "1")
//                    } else {
//                        $(ele).find(".description")
//                            .removeClass("select");
//                        $(ele).find(".mark")
//                            .hide()
//                            .data("key", "0")
//                    }
//                }
//
//            })
//                //动态匹配每一个星座的image
//                .find(".image")
//                .css("backgroundPosition",that.data[index].imagePosition);
//        })
//    }
//};
//
//window.onload = function(){
//    var data = [
//        {
//            num : "first",
//            imagePosition : "0 0",
//            name : "白羊座",
//            time : "3.21-4.19"
//        },
//        {
//            num : "second",
//            imagePosition : "0 -52px",
//            name : "金牛座",
//            time : "4.20-5.20"
//        },
//        {
//            num : "third",
//            imagePosition : "0 -104px",
//            name : "双子座",
//            time : " 5.21-6.21"
//        },
//        {
//            num : "forth",
//            imagePosition : "0 -156px",
//            name : "巨蟹座",
//            time : "6.22-7.22"
//        },
//        {
//            num: "fifth",
//            imagePosition : "0 -208px",
//            name : "狮子座",
//            time : " 7.23-8.22"
//        },
//        {
//            num : "sixth",
//            imagePosition : "0 -260px",
//            name : "处女座",
//            time : "8.23-9.22"
//        },
//        {
//            num : "seventh",
//            imagePosition : "0 -312px",
//            name : "天秤座",
//            time : " 9.23-10.23"
//        },
//        {
//            num : "eighth",
//            imagePosition : "0 -364px",
//            name : "天蝎座",
//            time : "10.24-11.22"
//        },
//        {
//            num : "ninth",
//            imagePosition : "0 -416px",
//            name : "射手座",
//            time : "11.23-12.21"
//        },
//        {
//            num : "tenth",
//            imagePosition : "0 -468px",
//            name : "摩羯座",
//            time : "12.22-1.19"
//        },
//        {
//            num : "eleventh",
//            imagePosition : "0 -520px",
//            name : "水瓶座",
//            time : "1.20-2.18"
//        }, {
//            num : "twelve",
//            imagePosition : "0 -572px",
//            name : "双鱼座",
//            time : "2.19-3.20"
//        }
//    ];
//    var constellationList = new Constellation({
//        data : data,
//        dom : $(".card > .main")
//    });
//    constellationList.init();
//}


//formatString的应用
//window.onload = function(){
//    var film = [
//        {
//            name : "美人鱼",
//            lead : "周星驰",
//            role : "邓超"
//        },
//        {
//            name : "金刚岛",
//            lead : "Michale",
//            role : "Sharon"
//        }
//    ];
//    function formatString(str,data){
////        匹配如@(name)
//        var regx = /@\((\w+)\)/g;
////        match返回的是匹配的结果，key返回的是正则中括号里匹配的结果
//        str = str.replace(regx,function(match,key){
//            return data[key];
//        });
//        return str;
//    }
//    var str1 = "";
//    str1 += "<h2>电影名称：@(name)</h2>";
//    str1 += "<strong style='color:red'>@(lead)</strong><br/>";
//    str1 += "<strong style='color:blue'>@(role)</strong><br/>";
//    var html = "";
//    for(var i=0; i<film.length; i++){
//        html += formatString(str1,film[i]);
//    }
//    document.getElementById("mydiv").innerHTML = html;
//}




//template的单个数据对象的基本应用：
//window.onload = function(){
//    var film = {
//        name : "美人鱼",
//        lead : "周星驰",
//        role : "邓超"
//    };
//    //template(模板的id，数据)
//    var html = template("test",film);
//    //将模板添加到对应的容器中
//    document.getElementById("mydiv").innerHTML = html;
//}




//template多个数据对象的应用(显式)
//window.onload = function(){
//    var film = {
//        name : "即将上映：",
//        films : [
//            {
//                name : "美人鱼",
//                lead : "周星驰",
//                role : "邓超"
//            },
//            {
//                name : "万物生长",
//                lead : "范冰冰",
//                role : "韩庚"
//            },
//            {
//                name : "变形金刚",
//                lead : "乔纳森",
//                role : "乔治"
//            }
//        ]
//    };
//    var html = template("test",film);
//    document.getElementById("mydiv").innerHTML = html;
//}



////template多个数据对象的应用(隐式)
//window.onload = function(){
//    var film = {
//        name : "即将上映：",
//        films : [
//            {
//                name : "美人鱼",
//                lead : "周星驰",
//                role : "邓超"
//            },
//            {
//                name : "万物生长",
//                lead : "范冰冰",
//                role : "韩庚"
//            },
//            {
//                name : "变形金刚",
//                lead : "乔纳森",
//                role : "乔治"
//            }
//        ]
//    };
//    var str = "<h2>{{name}}</h2>"
//        + "{{each films}}"
//        + "<strong>{{$value.lead}}</strong><br/>"
//        + "<strong>{{$value.role}}</strong>"
//        + "{{/each}}";
//    document.getElementById("mydiv").innerHTML = template.compile(str)(film);
//}



//百度音乐
//function User(options){
//    this.config(options);
//}
//User.prototype = {
//    config : function(options){
//        this.data = options.data;
//        this.templateId = options.templateId;
//    },
//    init : function(){
//        this.temPlate();
//    },
//    //template使用
//    temPlate : function(){
//        var html = template(this.templateId,this.data)
//        return html;
//    }
//}
//
//window.onload = function(){
//    var data = {
//        film :[
//            '私人频道',
//            '红心频道',
//            '随便听听',
//            '欧美',
//            '经典老歌',
//            'DJ舞曲',
//            '热歌',
//            '网络红歌',
//            '成名曲',
//            '火爆新歌',
//            '流行',
//            '快乐旋律',
//            'KTV金曲',
//            '伤感调频',
//            '80后',
//            '90后'
//        ]};
//    var example = new User({
//        data : data,
//        templateId : "test"
//    });
//    $(".card .hotlist").html(example.temPlate());
//}



////百度轮播图
//function User(options){
//    this.config(options)
//}
//User.prototype = {
//    config : function(options){
//        this.templateId = options.templateId;
//        this.data = options.data;
//    },
//    init : function(){
//
//    },
//    bindDOM : function(){
//        var html = template(this.templateId,this.data);
//        return html;
//    }
//}
//
//
//window.onload = function(){
//    var data = {
//        imgs : [
//            "Bai/img/1.jpg",
//            "Bai/img/2.jpg",
//            "Bai/img/3.jpg",
//            "Bai/img/4.jpg",
//            "Bai/img/5.jpg"
//        ]
//    };
//    var use = new User({
//        data : data,
//        templateId : "imgbox"
//    });
//    $(".scrollbox").html(use.bindDOM())
//}
//


//关于值类型和引用类型的面试题
//window.onload = function(){
//    var a;
//    //值类型：undefined、String、Number、Boolean
//    //引用类型：Array、Object、Function、Null
//
//    //Js声明变量的时候是不会开辟内存的；
//    //如果给这个变量赋值就会开辟空间；
//    //但是如果是值类型的话，当一个变量等于另外一个变量的时候就会复制这个变量的内容并开辟新区域进行保存；
//    //如果是引用类型的话，会开辟两个保存空间，一个是负责保存地址，一个负责保存内容，当一个变量等于另外一个变量的话就会在专门保存地址的区域进行保存相应的指针，而这个指针就统一指向保存对应内容的那块内存空间，但是不会新开辟区域
//
//    var a = { x : 1};
//    var b;
//    b = a;
//    console.log(b.x);
//    a.x = 2;
//    console.log(b.x);
//
//    a = {x : 4};
//    console.log(a.x);
//    console.log(b.x);



////解读：一开始的a={n:2}，b的指针指向a的存储区域，然后动态添加a的属性x，且a.x = {n:3}，由于b指向a，所以b.x为{n : 3}；再进行声明a={n : 3}，所以此时内存新开辟一个区域，且a的指针改为指向{n : 3}的区域，a没有x属性
//var a = {n : 2};
//b = a;
//a.x = a = {n : 3};
//console.log(a.x);
//console.log(b.x);
//}



//工厂模式：内部创建对象
//var arr = [
//    {
//        name : "背包",
//        price: 120
//    },
//    {
//        name: "行李箱",
//        price : 300
//    },
//    {
//        name : "手拎包",
//        price : 100
//    }];
//function createPrice(data){
//    var obj = new Object();
//    obj.sum = data.length;
//    obj.getPrice = getPrice(data);
//    function getPrice(data){
//        var total = 0;
//        for(var i=0; i<data.length; i++){
//            total += data[i].price;
//        }
//        return total;
//    }
//    return obj;
//}
//
//console.log(createPrice(arr).getPrice());
//console.log(createPrice(arr).sum);



//混合模式：构造函数+原型
//var arr = [
//    {
//        name : "背包",
//        price: 120
//    },
//    {
//        name: "行李箱",
//        price : 300
//    },
//    {
//        name : "手拎包",
//        price : 100
//    }];
//function createPrice(data){
//    this.config(data)
//}
//createPrice.prototype = {
//    config : function(data){
//        this.data = data;
//        this.sum = data.length;
//    },
//    init : function(){
//        this.getPrice(this.data);
//    },
//    getPrice : function(){
//        var total = 0;
//        for(var i=0; i<this.data.length; i++){
//            total += this.data[i].price;
//        }
//        return total;
//    }
//};
//
//var product1 = new createPrice(arr);  //在框架中进行实例化在外面使用的时候就不用实例化了
//console.log(product1.getPrice());


////extend方法的原理
//window.onload = function(){
//    var arr = {
//        name : "Li",
//        age : 25
//    };
//    var arr1 = {
//        nickname: "Ben",
//        price: 23
//    };
//    function Product(data){
//        this.config(data)
//    }
//    Product.prototype = {
//        config : function(data){
//            this.data = data;
//        },
//        //一对一复制对象属性
//        extend : function(){
//            var target = [];
//            for(var i=0; i<this.sum; i++){
//                target[i] = this.data[i];
//            }
//            return target;
//        },
//        //一对多复制对象属性
//        extend1 : function(target,data1,data2){
//            var len = arguments.length;
//            if(len === 0){
//                return; //如果实参为0的话就结束
//            }else if(len === 1){
//                return this; //返回实例本身的属性
//            }else{
//                target = arguments[0];  //如果是想要在实例本身的属性中再进行复制，就令target = this
//            }
//            for(var i=1; i<len; i++){
//                for(var key in arguments[i]){  //遍历需要复制的对象的属性
//                    target[key] = arguments[i][key];  //将遍历的属性值复制给target对象，注意如果有重复的属性会被覆盖直至最后一个对象的属性值
//                }
//            }
//            return target;
//        }
//    };
//    var product1 = new Product(arr);
//    console.log(product1.extend1({}));
//    console.log(product1.extend({},arr));
//    console.log(product1.extend1({},arr,arr1));
//
//}


//extend的第三方框架使用
//window.onload = function(){
//    var Product = Class.extend({
//        init: function(name,age){
//            this.name = name;
//            this.age = age;
//        },
//        name : "爱德华",
//        age : 25,
//        eat : function(){
//            console.log(this.age);
//        }
//    });
//
//    var product1 = new Product("爱德华",25);
//    console.log(product1.name);
//    product1.eat();
//}


//根据不同星座按钮弹出不同的星座页面
//window.onload = function(){
//    var xingzuo = [
//        {xing : "狮子座",intro : "狮子座是6月份的"},
//        {xing : "天枰座", intro: "天枰座是9月份的"},
//        {xing : "金牛座" , intro : "金牛座是3月份的"}
//    ];
//    var buts = document.getElementsByTagName("button");
//    for(var i=0; i<buts.length; i++){
//        buts[i].index = i;
//        buts[i].onclick = function(){
//            console.log(this.index);
//            var newWin  = window.open("星座.html",400,400);
//            var that = this;
//            newWin.onload = function(){  //注意要在加载新窗口的时候添加内容，如果在新窗口页面加载之前据添加内容是无效的
//                var p1 = newWin.document.createElement("p");
//                p1.innerHTML = xingzuo[that.index].xing;
//                var p2 = newWin.document.createElement("p");
//                p2.innerHTML = xingzuo[that.index].intro;
//                console.log(newWin)
//                newWin.document.body.appendChild(p1);
//                newWin.document.body.appendChild(p2);
//            }
//        }
//    }
//}



//面试题：随机从10-100中选取10个添加到数组，并进行排序

//window.onload = function(){
//    var arr = [];
//    function createArr(array,min,max){
//        for(var i=0; i<10; i++){
//            array.push(Math.random()*(max-min)+min);
//        }
//        console.log(array)
//        array.sort(function(a,b){
//            return a-b;
//        })
//        return array;
//    }
//    console.log(createArr(arr,10,100));
//
//}


//apply方法使用
//window.onload = function(){
//    var arr = [5,6,2,9,46,52,86,23];
//    var h = {
//        getMax: function(arr){
//            var m = Math.max.apply(this,arr);
//            return m;
//        }
//    };
//    console.log(h.getMax(arr));
//    console.log(Math.max.apply(null,arr));
//}


//obj.prototype的apply
//window.onload = function(){
//    var arr = new Array("1","2","3","4");
//    var arr1 = new Array("5","6","7");
//    Array.prototype.push.apply(arr,arr1)
//    console.log(arr);
//}


//关于__proto__
//window.onload = function(){
//    function fn(){
//        this.name = ""
//    }
//    var fn1 = new fn();
//    //由实例的constructor获得构造函数
//    console.log(fn1.constructor);
//    //由构造函数的原型的constructor返回构造函数
//    console.log(fn.prototype.constructor);
//    //由构造函数的__proto__访问原始Function的prototype
//    console.log(fn.__proto__ === Function.prototype);
//    //由构造函数的prototype的__proto__访问Object.prototype，因为js所有对象都是Object.prototype的一个实例
//    console.log(fn.prototype.__proto__ === Object.prototype);
//    //Object.prototype.__proto__为null
//    console.log(Object.prototype.__proto__ === null);
//    //Object是Funciton的一个实例
//    console.log(Object.__proto__ === Function.prototype);
//
//}


//结合AJAX的面向对象应用
//function $$(){}
//$$.prototype = {
//    myajax: function(URI,fn) {
//        //兼容低版本浏览器的XHR创建方式
//        function createXHR() {
//            //新型浏览器的XHR创建方式
//            if(typeof XMLHttpReuest != "undefined"){
//                return new XMLHttpRequest();
//            }else if(typeof ActiveXObject != "undefined"){
//                //对于IE6及以下的低版本浏览器的XHR的创建方式，判断这个函数的自定义属性activeXString（不是null就是string类型）是否为字符串类型，如果是，就代表前面已有json连接，如果不是就执行下面的代码
//                if(arguments.callee.activeXString != "string"){
//
//                    //因为创建ActiveXObject对象要传入版本作为参数，而版本要先从高版本进行匹配
//                    var versions = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"];
//                    //对每个版本的ActiveXObject进行遍历，如果存在就跳出遍历
//                    for(var i= 0, len=versions.length; i<len; i++){
//                        try{
//                            new ActiveXObject(versions[i]);
//                            arguments.callee.activeXString = versions[i];
//                            break;
//                        }catch(e){
//                            //skip
//                        }
//                    }
//                }
//                //最后无论activeXString是否是什么值都要返回创建好的ActiveXObject对象
//                return new ActiveXObject(arguments.callee.activeXString);
//            }else{
//                //如果以上两种方法都无法创建XHR对象就抛出错误
//                throw new Error("No XHR is available");
//            }
//        }
//
//
//        //创建xhr对象
//        var xhr = createXHR();
//        //xhr进行异步传输
//        xhr.onreadystatechange = function() {
//            if(xhr.readyState === 4){
//                if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
//                    //传输成功,json的数据就是parseJSON(xhr.responseText)，xhr.responseText就代表JSON字符串
//                    fn(xhr.responseText);
//                }else{
//                    alert("文件错误");
//                }
//            }
//        }
//
//        xhr.open("get",URI,true);
//        xhr.send();
//    }
//}
//
//
//
//window.onload = function() {
//    //分别对product和cart对象的属性进行建立，这样可以统一前后台的属性值
//    function transformProduct(data) {
//        var product = new Product();
//        product.product = data.productname;
//        product.cart = data.cartname;
//        return product;
//    }
//
//    function transformCart(data){
//        var cart = new Cart();
//        cart.sum = data.sum;
//        cart.number = data.number;
//        return cart;
//    }
//
//    $$.myajax("json地址",function(e) {
//        //获得json字符串，并将转化为JSON格式
//        var json = parseJSON(e);
//        //分流，建立一次异步传输，分别传入不同的数据进行传输，减少服务器负担，如果不分流就是每创建一个对象就要进行一次异步传输，分别连接对应的json表
//        //分流的json格式是：{
//        //    product: {},
//        //    cart: {}
//        //}
//        var product = transformProduct(json.product);
//        var cart = transformCart(json.cart);
//
//        //执行功能
//        product.bindDOM();
//        product.bindEvent();
//
//        cart.bindDOM();
//        cart.bindEvent();
//    })
//}



//----------------------继承基础开始-------------------------------
////组合继承的概念

//function Person(name,age) {
//    this.name = name;
//    this.age = age;
//    this.sex = "";
//}
//Person.prototype = {
//    init: function() {},
//    say: function() {
//        console.log(this.name);
//    }
//
//};
//
//
//function Student(name,age,no) {
//    //继承Product的属性
//    Person.apply(this,arguments);
//    //页数
//    this.no = no;
//    //出版社
//    this.grade = "";
//}
//Student.__proto__ = Person.prototype;
//Student.prototype = new Person();
//Student.prototype.study = function() {
//    console.log(this.no + " " + this.name + " is studying");
//};
//
//var stu1 = new Student("龚舜华",23,"2014035643026");
//stu1.say();
//stu1.study();


////商城继承案例

////Base.js
////产品基础类：
//function Base(name,price) {
//    //产品名称
//    this.name = '';
//    //产品介绍
//    this.description = "";
//    //产品价格
//    this.price = 0;
//    //产品打折价
//    this.discountPrice = 0;
//    //总价
//    this.pricesum = 0;
//    //产品图片列表
//    this.imgs = [];
//    //货号
//    this.no = '';
//}
//
//Base.prototype = {
//    init : function() {},
//    //普通购买
//    buy : function() {},
//    //加入购物车
//    addCart: function() {},
//    //绑定图片列表
//    bindImgs: function() {},
//    //绑定基础DOM
//    bindDOM: function() {},
//    //实现功能
//    readyAll: function() {
//        bindImgs();
//        bindDOM();
//    }
//};

////产品基础类使用simple.js的extend方式
//var Base = Class.extend({
//    //Base的构造函数
//    init: function() {
//        this.name = '';
//        this.description = '';
//        this.price = 0;
//        this.discountPrice = 0;
//        this.pricesum = 0;
//        this.imgs = [];
//    },
//    //Base的方法：
//    _init: function() {},
//    buy: function() {},
//    addCart: function() {},
//    bindImgs: function() {},
//    bindDOM: function() {},
//    readyAll: function() {}
//});

////Cloth.js
////产品的衣服类
//function Cloth(name,price,brand) {
//    //继承Base的属性
//    //Base.apply(this,arguments);
//    Base.call(this,name,price);
//    //尺寸
//    this.size = [];
//    //颜色分类
//    this.colors = [];
//    //使用年龄
//    this.age = 0;
//    //年份季节
//    this.season = '';
//    //品牌
//    this.brand = brand;
//}
//Cloth.prototype = new Product();
//Cloth.prototype = {
//    init: function() {},
//    buy: function() {},
//    addCart: function() {},
//    bindDOM: function() {},
//    readyAll: function() {
//        bindDOM();
//    }
//}

////产品衣服类使用simple.js的extend方式
//var Cloth = Base.extend({
//    //实例化Cloth的时候要传入的参数
//    init: function(name,price,brand) {
//        //复制Base的属性和方法，并且重载Base的name和price值
//        this._super(name,price);
//        this.size = [];
//        this.colors = [];
//        this.age = 0;
//        this.season = '';
//        this.brand = brand;
//    },
//    _init: function() {},
//    buy: function() {},
//    addCart: function() {},
//    bindDOM: function() {},
//    readyAll: function() {
//        bindDOM();
//    }
//});

//ClothIndex.js是实例化Cloth的js文件
//window.onload = function() {
//    var dress =  new Cloth("name",2400,"品牌");
//    dress.readyAll();
//}



//----------------------框架基础开始-------------------------------
//json格式框架

//var $$ = {
//    event : {
//        on: function(id,type,fn) {
//            var dom = document.getElementById(id);
//            if(dom.addEventListener){
//                dom.addEventListener(type,fn,false);
//            }else{
//                dom.attachEvent("on"+type,fn);
//            }
//        }
//    }
//}
//
//window.onload = function() {
//    $$.event.on("child","click",function(e){
//        e.stopPropagation();
//        alert(this.id);
//    });
//    $$.event.on("box","click",function(){
//        alert(this.id);
//    });
//
//    var arr = {kk:"1"};
//    Object.extend(arr,{a:function(){alert("")}})
//    console.log(arr)
//}


////模块框架（自定义框架）：

//function $$() {};
//$$.prototype = {
//    extend: function(tar,source) {
//        for(var k in source) {
//            tar[k] = source[k];
//        }
//        return tar;
//    }
//};
//
//var $$ = new $$();
//
////获取元素模块
//$$.extend($$,{
//    //获取id
//    id: function(id) {
//        return document.getElementById(id);
//    },
////多组选择器
//    group: function(str) {
//        var arr = str.split(",");
//        var list;
//        var result = [];
//        for(var i=0; i<arr.length; i++) {
//            var symbol = arr[i].charAt(0);
//            var name = arr[i].substr(1);
//            if(symbol == "."){
//                list = document.getElementsByClassName(name);
//                pushArr();
//            }else if(symbol == "#"){
//                list = [document.getElementById(name)]; //方便封装
//                pushArr();
//            }else{
//                list = document.getElementsByTagName(arr[i]);
//                pushArr();
//            }
//        }
//        function pushArr() {
//            for(var i=0; i<list.length; i++){
//                result.push(list[i]);
//            }
//        }
//        return result;
//    },
//    levelSelector: function(str) {
//        var groups = str.split(",");
//        var resultArr = [];
//        //遍历多组，获得每个选择器
//        for(var i=0; i<groups.length; i++){
//            var item = groups[i];
//            var childElements = groups[i].split(" ");
//            var list, result = [];
//            //遍历每个选择器的子项
//            for(var k=0; k<childElements.length; k++){
//                //每个子项
//                var childItem = childElements[k];
//                //子项的类型
//                var symbol = childElements[k].charAt(0);
//                //每个子项的名字
//                var name = childElements[k].substr(1);
//                function pushArr(arr,result) {
//                    for(var i=0; i<arr.length; i++){
//                        result.push(arr[i]);
//                    }
//                }
//                //寻找第一个子项
//                if(k == 0) {
//                    if (symbol == ".") {
//                        list = document.getElementsByClassName(name);
//                        pushArr(list,result);
//                    } else if (symbol == "#") {
//                        list = [document.getElementById(name)]; //方便封装
//                        pushArr(list,result);
//                    } else {
//                        list = document.getElementsByTagName(childElements[k]);
//                        pushArr(list,result);
//                    }
//                }
//                //对第一个子项的集合进行遍历
//                else{
//                    for(var j = 0,result1 = [],list1; j<result.length; j++){
//                        if(symbol == "."){
//                            list1 = result[j].getElementsByClassName(name);
//                            pushArr(list1,result1);
//                        }else if(symbol == '#'){
//                            list1 = result[j].getElementById(name);
//                            pushArr(list1,result1);
//                        }else{
//                            list1 = result[j].getElementsByTagName(childItem);
//                            pushArr(list1,result1);
//                        }
//                    }
//                    //令当前的reult数组等于childItem[k]选择器的数组
//                    result = result1;
//                }
//            }
//            //将每个选择器添加到resultArr中
//            pushArr(result,resultArr);
//        }
//        return resultArr;
//    },
//    all: function(name,context) {
//        context = context || document;
//        return context.querySelectorAll(name);
//    }
//});
//
////事件模块
//$$.extend($$,{
//    getEvent: function(e) {
//        return e ? e : window.event;
//    },
//    getTarget: function(e) {
//        var event = $$.getEvent(e);
//        return event.target || event.srcElement;
//    },
//    on: function(id,type,fn) {
//        var dom = document.getElementById(id);
//        if(dom.addEventListener){
//            dom.addEventListener(type,fn,false);
//        }else{
//            //IE
//            dom.attachEvent("on"+type,fn);
//        }
//    },
//    click: function(id,fn) {
//        var dom = typeof id == "String" ? document.getElementById(id) : id;
//        dom.addEventListener("click",fn);
//    },
//    hover: function(id,mover,mout) {
//        var dom = typeof id == "String" ? document.getElementById(id) : id;
//        if(mover) {
//            dom.addEventListener("mouseover",mover);
//        }
//        if(mout) {
//            dom.addEventListener("mouseout",mout);
//        }
//    },
//    delegate: function(parentId,type,selector,fn) {
//        //先获取父元素
//        var parent = $$.id(parentId);
//        function handler(e) {
//            //获取触发事件对应的元素
//            var target = $$.getTarget(e);
//            //判断target是否是属于selector（可能是id、标签、class）
//            if(target.id == selector || target.nodeName == selector || target.className.indexOf(selector) > -1) {
//                //将执行函数的this由window指向target，并运行函数
//                fn.call(target);
//            }
//        }
//        //给父元素绑定以上事件
//        //$$.on(parentId,type,handler);但是jq的on函数实现得很复杂
//        parent[type] = handler;  //parent.onclick相当于是parent["onclick"]
//        //也可以写作是parent["on" + type]，这里的type就是"click"
//    }
//});
//
////CSS模块：
//$$.extend($$,{
//    //设置CSS属性
//    setStyle: function(dom,key,value) {
//        if(typeof dom.length != "undefined"){
//            for(var i=0; i<dom.length; i++){
//                dom[i].style[key] = value;
//            }
//        }else {
//            dom.style[key] = value;
//        }
//    },
//    //获取CSS属性
//    getStyle: function(dom,attr) {
//        dom = typeof dom.length != "undefined" ? dom[0] : dom;
//        if(dom.currentStyle){
//            return dom.currentStyle[attr];
//        }else{
//            return window.getComputedStyle(dom,null)[attr];
//        }
//    },
//    //获取或者设置CSS属性
//    css: function(dom,key,value){
//        if(arguments.length == 2) {
//            return $$.getStyle(dom,key);
//        }else if(arguments.length === 3){  //或者使用if(value)进行判断
//            $$.setStyle(dom,key,value);
//        }
//    },
//    //获取元素的宽度：
//    width: function (dom) {
//        return $$.getStyle(dom, "width");
//    },
//    //获取元素的高度：
//    height: function (dom) {
//        return $$.getStyle(dom, "height");
//    },
//    //获取浏览器窗口window
//    wWidth: function () {
//        if (window.innerWidth != null) {
//            return window.innerWidth;
//        } else if (document.compatMode == "CSS1Compat") {
//            return document.documentElement.clientWidth;
//        } else {
//            return document.body.clientWidth;
//        }
//    },
//    wHeight: function () {
//        if (window.innerHeight != null) {
//            return window.innerHeight;
//        } else if (document.compatMode == "CSS1Compat") {
//            return document.documentElement.clientHeight;
//        } else {
//            return document.body.clientHeight;
//        }
//    },
//    //获取元素的滚动宽度：
//    sWidth: function () {
//        //IE和Chrome：前者标准，后者过大；FF：前者过大，后者标准
//        return Math.min(document.documentElement.scrollWidth,document.body.scrollWidth);
//    },
//    sHeight: function() {
//        return Math.min(document.documentElement.scrollHeight,document.body.scrollHeight);
//    },
//    //获取元素的滚动距离
//    sLeft: function() {
//        var sW = (window.scrollX != "undefined") ? window.scrollX : window.pageXOffset;
//        //IE5均支持body和documentElement，但是后者的只会一直是0，所以要先判断前者
//        sW = (sW != "undefined") ? sW : (document.body || document.documentElement).scrollLeft;
//        return sW;
//    },
//    sTop: function() {
//        var sT = (window.scrollY != "undefined") ? window.scrollY : window.pageYOffset;
//        sT = (sT != "undefined") ? sT : (document.body || document.documentElement).scrollTop;
//        return sT;
//    }
//});
//
////属性模块
//$$.extend($$,{
//    //设置或者获取元素属性
//    attr: function(domname,key,value) {
//        var dom = $$.all(domname);
//        if(value) {
//            for(var i=0; i<dom.length; i++) {
//                dom[i].setAttribute(key,value);
//            }
//        }else {
//            return dom[0].getAttribute(key);
//        }
//    },
//    //添加Class
//    addClass: function(domname,classname) {
//        var dom = $$.all(domname);
//        for(var i=0; i<dom.length; i++){
//            dom[i].className = dom[i].className + " " + classname;
//        }
//    },
//    //移除Class
//    removeClass: function(domname,classname) {
//        var dom = $$.all(domname);
//        for(var i=0; i<dom.length; i++) {
//            var str = "bb nn";
//            var reg = eval("/[\\s"+classname+"]/ig");
//            console.log(str.match(reg));
//            dom[i].className = dom[i].className.replace(reg,"");
//            //dom[i].className = dom[i].className.replace(classname,"");
//        }
//    },
//    //判断元素是否存在指定的className
//    hasClass: function(domname,classname) {
//        var dom = $$.all(domname);
//        var flag = true;
//        for(var i=0; i<dom.length; i++) {
//            flag = flag && check(dom[i],classname);
//        }
//        return flag;
//
//        function check(ele,classname) {
//            return -1 < (" " + ele.className + " ").indexOf(" "+ classname + " ");
//        }
//    }
//});
//
////内容模块：
//$$.extend($$,{
//    html: function(domname,value) {
//        var doms = $$.all(domname);
//        if(value) {
//            for(var i=0; i<dom.length; i++) {
//                doms[i].innerHTML = value;
//            }
//        }else{
//            return doms[0].innerHTML;
//        }
//    }
//});
//
////运动模块：
//$$.extend($$,{
//    animate: function(obj,json,time) {
//        //设置保存当前属性的数组、定时器
//        var propertyValue = {},
//            timer;
//        //获取运动元素属性的初始值
//        propertyValue = getFormerStyle(obj,json);
////获取当前时间
//        var now = +new Date();
////定时器
//        timer = setInterval(move,30);
//
//        function move() {//获取每次执行move的时间
//            var pass = +new Date();
//            var duration = getDuration(pass,now,time);
//            //时间到了就停止运行
//            stop(duration,timer);
//            //获取过去的时间与总时间的比例，即要达到的路程与总路程的比例
//            for(var attr in json) {
//                properties(obj,attr,json[attr],propertyValue[attr],duration);
//            }
//        }
//
////获取运动元素属性的初始值
//        function getFormerStyle(obj,json) {
//            for(var attr in json) {
//                //原来属性值
//                propertyValue[attr] = getStyle(obj,attr);
//            }
//            return propertyValue;
//        }
//
////封装获得时间差函数
//        function getDuration(pass,now,time) {
//            //获取时间差
//            var duration = (pass - now) / time;
//            return duration;
//        }
//
////停止函数
//        function stop(duration,timer) {
//            //判断方法一：根据达到时间进行停止
//            if(duration >= 1) {
//                clearInterval(timer);
//                return false;
//            }
//            //判断方法二：根据到达目的地进行停止
//            //if(Math.ceil(aa.offsetLeft) >= s) {
//            //    clearInterval(timer);
//            //}
//        }
//
////获取当前属性值
//        function getStyle(obj,attr) {
//            if(obj.currentStyle){
//                return obj.currentStyle[attr];
//            }else{
//                return window.getComputedStyle(obj,null)[attr];
//            }
//        }
//
////属性变化
//        function properties(obj,attr,tar,propertyValue,duration) {
//            if(attr == "opacity"){
//                if("opacity" in obj.style) {
//                    obj.style["opacity"] = (parseFloat(propertyValue)*100 + duration * (tar - parseFloat(propertyValue)*100)) / 100;
//                }else if("filter" in obj.style){
//                    obj.style["filter"] = "alpha(opacity = "+ parseFloat(propertyValue) + duration * (tar - parseFloat(propertyValue)) +")";
//                }
//            }else {
//                obj.style[attr] =  parseFloat(propertyValue) + duration * (tar - parseFloat(propertyValue)) + "px";
//            }
//        }
//
//    }
//});
//
////AJAX模块：
//$$.extend($$,{
//    myajax: function(URI,fn) {
//        function createXHR() {
//            if(typeof XMLHttpRequest != "undefined") {
//                return new XMLHttpRequest();
//            }else if(typeof ActiveXObject != "undefined") {
//                if(typeof arguments.callee.activeXString == "String") {
//                    var versions = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"];
//                    for(var i= 0,len = versions.length; i<len; i++) {
//                        try {
//                            new ActiveXObject(versions[i]);
//                            arguments.callee.activeXString = versions[i];
//                            break;
//                        }catch(e) {}
//                    }
//                }
//                return new ActiveXObject(arguments.callee.activeXString);
//            }else {
//                throw new Error("No XHR is avalilable！");
//            }
//        }
//
//        var xhr = createXHR();
//        xhr.onreadystatechange = function() {
//            if(xhr.readyState == 4){
//                if(xhr.status >= 200 && xhr.status < 300 || xhr.stauts == 304){
//                    fn(xhr.responseText);
//                }
//            }
//        };
//        xhr.open("get",URI,true);
//        xhr.send();
//    }
//});

//window.onload = function() {
//    //没有冒泡机制，后面动态生成的p没有绑定click
//    $(".father p").click(function() {
//        console.log($(this).index())
//    });
//    ////委托代理机制
//    ////on冒泡
//    //$(".father").on("click","p",function() {
//    //    console.log($(this).index())
//    //});
//    ////delegate冒泡
//    //$(".father").on("click","p",function() {
//    //    console.log($(this).index())
//    //});
//    $(".father").append('<p>hksfhkhskjf</p>');
//}

////面向方面/切面编程
////AOP框架，要载入AOP.js
//function aa(){
//    alert("yes");
//}
//function logTime(func) {
//    return func = (function(){
//        var d;
//        return func
//            .before(function(){d = +new Date();})
//            .after(function(){console.log(+new Date() - d)});
//    })();
//}
//
//window.onload = function() {
//    logTime(aa)();
//}


//运动框架UI组件：多对象多属性

////基本调用
//function $$() {}
//$$.prototype = {
//    extend: function(tar,source) {
//        for(var k in source) {
//            tar[k] = source[k];
//        }
//        return tar;
//    }
//};
//
//var $$ = new $$();
//
//$$.extend($$,{
//    all: function(name,context) {
//        context = context || document;
//        return context.querySelectorAll(name);
//    },
//    attr: function(domname,key,value) {
//        var dom = $$.all(domname);
//        if(value) {
//            for(var i=0; i<dom.length; i++) {
//                dom[i].setAttribute(key,value);
//            }
//        }else {
//            return dom[0].getAttribute(key);
//        }
//
//    },
//    addClass: function(domname,classname) {
//        var dom = $$.all(domname);
//        for(var i=0; i<dom.length; i++){
//            dom[i].className = dom[i].className + " " + classname;
//        }
//    },
//    removeClass: function(domname,classname) {
//        var dom = $$.all(domname);
//        for(var i=0; i<dom.length; i++) {
//            var str = "bb nn";
//            var reg = eval("/[\\s"+classname+"]/ig");
//            console.log(str.match(reg));
//            dom[i].className = dom[i].className.replace(reg,"");
//            //dom[i].className = dom[i].className.replace(classname,"");
//        }
//    },
//    hasClass: function(domname,classname) {
//        var dom = $$.all(domname);
//        var flag = true;
//        for(var i=0; i<dom.length; i++) {
//            flag = flag && check(dom[i],classname);
//        }
//        return flag;
//
//        function check(ele,classname) {
//            return -1 < (" " + ele.className + " ").indexOf(" "+ classname + " ");
//        }
//    }
//});
//
////面向过程的运动框架
//function ani(id,json,time) {
//    var obj = $$.all(id)[0],
//        timer,
//        now = +new Date();
//    var styles = adapter(obj,json);
//    timer = setInterval(move,30);
//    function move() {
//        var pass = +new Date();
//        var tween = getTween(pass,now,time);
//        stop(tween,timer);
//        Mulproperties(obj,styles,tween);
//    }
//
//    function adapter(obj,json) {
//        var styles = [];
//        for(var attr in json) {
//            var o = {};
//            o.attr = attr;
//            o.tar = json[attr];
//            o.begin = getStyle(obj,attr);
//            styles.push(o);
//        }
//        return styles;
//    }
//
//    function getStyle(obj,attr) {
//        if(obj.currentStyle) {
//            return obj.currentStyle[attr];
//        }else {
//            return window.getComputedStyle(obj,null)[attr];
//        }
//    }
//
//    function getTween(pass,now,time) {
//        var tween = (pass - now) / time;
//        return tween;
//    }
//
//    function Mulproperties(obj,styles,tween) {
//        for(var i=0; i<styles.length; i++ ) {
//            var attr = styles[i].attr;
//            if(attr == "opacity") {
//                if("opacity" in obj.style) {
//                    obj.style[attr] = parseFloat(styles[i].begin) + tween * (styles[i].tar/100 - parseFloat(styles[i].begin));
//                }else {
//                    obj.style["filter"] = "alpha(opacity = "+ parseFloat(styles[i].begin) + tween * (styles[i].tar - parseFloat(styles[i].begin)) +")";
//                }
//            }else {
//                obj.style[attr] = parseFloat(styles[i].begin) + tween * (styles[i].tar - parseFloat(styles[i].begin)) + "px";
//            }
//        }
//    }
//
//    function stop(tween,timer) {
//        if(tween >= 1) {
//            clearInterval(timer);
//        }
//    }
//}
//
//
//
//
//
////面向对象封装的运动框架
////动画
//var Animate = function() {
//    //动画句柄
//    this.interval = 30;
//    this.timer = null;
//    //动画对象
//    //用于保存运动中我们需要的数据
//    this._queen = [];
//};
//
//Animate.prototype = {
//    //运行部门
//
//    //动画功能的主方法
//    _run: function() {
//        var that = this;
//        //定时器调用的是函数，所以对move传参就要用函数去包含，否则只执行一次
//        this.timer = setInterval(function(){that._loop()},this.interval);
//    },
//    //定时器调用的函数
//    _move: function(obj) {
//        var that = this;
//        var pass = +new Date();
//        obj.tween = that._getTween(pass,obj.now,obj.time);
//        that._stop(obj.tween,that.timer);
//        that._Mulproperties(obj,obj.styles,obj.tween);
//    },
//    //获取元素当前属性值函数
//    _getStyle: function(obj,attr) {
//        if(obj.currentStyle) {
//            return obj.currentStyle[attr];
//        }else {
//            return window.getComputedStyle(obj,null)[attr];
//        }
//    },
//    //获取时间进程
//    _getTween: function (pass,now,time) {
//        var tween = (pass - now) / time;
//        return tween;
//    },
//    //改变对象的多个属性
//    _Mulproperties: function(obj,styles,tween) {
//        for(var i=0; i<styles.length; i++ ) {
//            var attr = styles[i].attr;
//            if(attr == "opacity") {
//                if("opacity" in obj.dom.style) {
//                    obj.dom.style[attr] = parseFloat(styles[i].begin) + tween * (styles[i].tar/100 - parseFloat(styles[i].begin));
//                }else {
//                    obj.dom.style["filter"] = "alpha(opacity = "+ parseFloat(styles[i].begin) + tween * (styles[i].tar - parseFloat(styles[i].begin)) +")";
//                }
//            }else {
//                obj.dom.style[attr] = parseFloat(styles[i].begin) + tween * (styles[i].tar - parseFloat(styles[i].begin)) + "px";
//            }
//        }
//    },
//    //动画停止
//    _stop: function(tween,timer) {
//        if(tween >= 1) {
//            clearInterval(timer);
//        }
//    },
//    _loop: function() {
//        var that = this;
//        for(var i=0; i<that._queen.length; i++) {
//            var _obj = that._queen[i];
//            that._move(_obj);
//        }
//    },
//
////添加部门
//    add: function(id,json,time) {
//        this._manyAdapter(id,json,time);
//        this._run();
//    },
//    _oneAdapter:  function(ele,json,time) {
//        var _obj = {};
//        _obj.dom = ele;
//        _obj.json = json;
//        _obj.time = time;
//        _obj.now = +new Date();
//
//        var target = [];
//        for(var attr in json) {
//            var o = {};
//            o.attr = attr;
//            o.tar = json[attr];
//            o.begin = this._getStyle(ele,attr);
//            target.push(o);
//        }
//
//        _obj.styles = target;
//
//        return _obj;
//    },
//    _manyAdapter: function(id,json,time) {
//        var dom = $$.all(id);
//        for(var i=0; i<dom.length; i++) {
//            this._queen.push(this._oneAdapter(dom[i],json,time));
//        }
//    }
//    //后勤部门
//};
//var animate = new Animate();
//
//window.onload = function() {
//    animate.add(".bb",{"height":"600","left":"500","opacity" : "50"},5000);;
//}


//六脉神剑

////绿色编程：不造成全局变量的污染
//window.onload = function() {
//    //第一种方法：赋值给全局变量
//    (function() {
//        var name = "Cheric";
//        var age = 23;
//        var grade = 4;
//        function get() {
//            //返回就学年龄
//            return age - grade;
//        }
//        function get2() {
//            console.log(name);
//        }
//        var json = {
//            name: name,
//            age: age,
//            get: get,
//            get2: get2,
//            eat: function() {
//                alert("我在吃饭");
//            }
//        };
//        window.$ = json;
//    })();
//
//    //第二种方法：在全局申明变量再在立即函数内部进行赋值
//    var $$;
//    (function() {
//        var name = "Cheric";
//        var get1 = function() {
//            console.log("Cheric");
//        };
//        var json = {
//            name: name,
//            get1: get1
//        };
//        $$ = json;
//    })();
//
//    //第三种方法：通过传参再进行赋值,效率比第二种的高
//    (function(w) {
//        var name = "Cheric";
//        var get1 = function() {
//            console.log(name);
//        };
//        var json = {
//            name: name,
//            get1: get1
//        };
//        w.$$$ = json;
//    })(window);
//
//    //第四种方法：立即函数返回值
//    var $$$$ = (function() {
//        var name = "Cheric";
//        var get1 = function() {
//            console.log(name);
//        };
//        var json = {
//            name: name,
//            get1: get1
//        }
//        return json;
//    })();
//};

////模块化编程
////命名空间模块化
////注意：extend拓增是模仿jq的一种框架编写，对于企业这种业务逻辑分明的使用命名空间模块化编写就够了
//(function(w) {
//    var jd = {
//        versions: '1.0'
//    };
//
////公共模块
//    jd.commom = {
//        on: function() {},
//        each: function() {}
//    };
//
////UI模块：PC的UI模块、mobile的UI模块
//    jd.ui = {};
//    jd.ui.pc = {
//        tab: function() {},
//        banner: function() {},
//        nav: function() {}
//    };
//    jd.ui.mobile = {
//        tab: function() {},
//        banner: function() {},
//        nav: function() {}
//    };
//
////页面
//    jd.page = {};
////产品相关的页面
//    jd.page.product = {};
////用户订单页面
//    jd.page.order = {};
////用户个人中心页面
//    jd.page.center = {};
//
//    w.jd = jd;
//})(window);

////链式访问
//function Animate() {}
//Animate.prototype = {
//    add: function() {
//        alert("yes");
//        //添加这一句就可以调用run了
//        return this;
//    },
//    run: function() {
//        alert("no")
//    }
//};
//var animate = new Animate();
//
//window.onload = function() {
//    animate.add().run();
//};node


//jq链式访问原理：

////自创
//var $ = function(id) {
//    //因为没有实例化，所以只能手动搜索原型中的方法进行调用
//    return $.prototype.id(id);
//};
////每个函数都有prototype
//$.prototype = {
//    id: function(id) {
//        //这里的this指向的都是$.prototype，因为此处没有实例化，所以没有继承和构造函数一说，所以this就指向原型对象了
//        this.element = document.getElementById(id);
//        return this;
//    },
//    change: function() {
//        this.element.style.backgroundColor = "yellow";
//    }
//};
//
//window.onload = function() {
//    $("aa").change();
//};

////第二种方法：需要实例化
//var itcast = function(id) {
//    this.element = [];
//    return this.id(id);
//};
////每个函数都有prototype
//itcast.prototype = {
//    id: function(id) {
//        this.element = document.getElementById(id);
//        return this;
//    },
//    change: function() {
//        this.element.style.backgroundColor = "yellow";
//    }
//};
//
//var $ = function(id) {
//    return new itcast(id);
//};
//
//window.onload = function() {
//    $("aa").change();
//};

////jq的this.elements的优化
//(function(w) {
//    var f = function(selector,context) {
//        return this.init(selector,context);
//    };
//    f.prototype.init = function(selector,context) {
//        if(typeof selector == "string") {
//            var nodeList = (context || document).querySelectorAll(selector);
//            this.length = nodeList.length;
//            for(var i=0; i<nodeList.length; i++) {
//                this[i] = nodeList[i];
//            }
//        }else if(selector.nodeType) {
//            this[0] = selector;
//            this.length = 1;
//        }
//        return this;
//    };
//    //需要$链式访问：$().XX()
//    f.prototype.XX = function() {
//        alert('yes');
//        return this;
//    };
//
//
//    var itcast = function(selector,context) {
//        if(typeof selector == "function") {
//            return window.onload;
//        }else{
//            return new f(selector,context);
//        }
//    };
//    //不需要链式访问：$.ajax()
//    itcast.ajax = function() {};
//    //看不懂，但是可以通过这种方式进行为$链式访问动态拓增或者是对itcast拓增不需要链式访问的方法
//    itcast.extend = function() {
//        /* 这段代码的意思：
//         如果只传递一个参数，表示给F对象添加功能
//         如果传递两个参数，表示给指定的对象添加功能*/
//        var key
//            ,arg = arguments
//            ,i = 1
//            ,len = arg.length
//            ,target = null;
//        if(len === 0){
//            return;
//        }else if(len === 1){
//            //如果只传一个参数，就令要进行拓增的对象是f的原型
//            target = f.prototype;
//            i--;
//        }else{
//            //如果传递的是两个参数，就令要进行拓增的对象是参数一
//            target = arg[0];
//        }
//
//        //依次对要拓增的对象进行拓增
//        for(; i < len; i++){
//            for(key in arg[i]){
//                target[key] = arg[i][key];
//            }
//        }
//        return target;
//    };
//
//    //实现jq中$的两种功能：预加载和$选择器
//    w.juery = w.$ = itcast;
//})(window);
//
//
///*css模块 */
//(function(target) {
//    //需要链式访问：
//    target.extend({
//        fn1: function(attr,value) {
//            //这里的this指向f返回的匿名对象，该对象可以访问f的原型的方法
//            this.XX();
//            this[0].style[attr] = value;
//            return this;
//        },
//        fn2: function() {}
//    });
//
//    //不需要链式访问：
//    target.extend(target,{
//        fn3: function() {},
//        fn4: function() {}
//    })
//})($);
//
//
//window.onload = function() {
//    //对链式访问进行拓增，因为无法访问f构造函数，因为只有itcast是赋值给$进行暴露的，所以只能使用extend方法
//    $.extend({rr:function(){}});
//    //对非链式访问进行拓增
//    $.extend($,{gg:function(){}});
//    $("#aa").fn1("backgroundColor","purple");
//};




////面试题：使用递归算法将meta=[1,2,[3,4,[5]],6,[7,[8,9,[10,11,[12]]]]]依次输出

//window.onload = function() {
//    (function() {
//        var meta = [1,2,[3,4,[5]],6,[7,[8,9,[10,11,[12]]]]];
//        var arr = [];
//        function print(meta) {
//            for(var i=0; i<meta.length; i++) {
//                if(toString.call(meta[i]) == "[object Array]") {
//                    print(meta[i]);
//                }else{
//                    arr.push(meta[i]);
//                }
//            }
//            return arr;
//        }
//        console.log(print(meta));
//    })();
//};


//cvte面试题:实现一个算法，寻找字符串中出现次数最少，并且首次出现的位置最前的字符

//window.onload = function() {
//    (function(window) {
//        var str = "cbaacfdeaebb";
//        var arr = str.split("");
//        var newarr = [];
//        //统计有多少个不同的字母
//        (function(){
//            for(var i=0; i<arr.length; i++) {
//                if(newarr.length != 0) {
//                    var key = true;
//                    for(var j=0; j<newarr.length; j++) {
//                        if(arr[i] == newarr[j]) {
//                            key = false;
//                        }
//                    }
//                    if(key) {
//                        newarr.push(arr[i]);
//                    }
//                }else {
//                    newarr.push(arr[i]);
//                }
//            }
//            console.log(newarr)
//        })();
//        //计算最小的长度
//        window.getMin = (function(){
//            var countarr = [];
//            for(var i=0; i<newarr.length; i++) {
//                var num = 0;
//                for(var k=0; k<arr.length; k++) {
//                    if(arr[k] == newarr[i]) {
//                        num++;
//                    }
//                }
//                var index = str.indexOf(newarr[i]);
//                countarr.push({char:newarr[i],num: num,index:index});
//            }
//            var counts = [];
//            for(var j=0 ; j< countarr.length; j++) {
//                counts.push(countarr[j].num);
//            }
//            var min = Math.min.apply({},counts);
//            return {
//                countarr:countarr,
//                min: min
//            };
//        })();
//        //判断最小长度的字母是什么
//        (function() {
//            var minIndex = [];
//            for(var i=0; i<getMin.countarr.length; i++) {
//                if(getMin.countarr[i].num == getMin.min) {
//                    minIndex.push(getMin.countarr[i].index);
//                }
//            }
//            var minChar = Math.min.apply({},minIndex);
//            alert(arr[minChar]);
//        })();
//    })(window);
//};
