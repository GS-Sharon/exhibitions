function getClass(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return window.getComputedStyle(obj,null)[attr];
    }
}
var _this = null;
function animate(obj,json,speed,fn){
    if(_this){
        clearInterval(obj.timer);
    }
    obj.timer = setInterval(function(){
        var flag = true;
        for(var attr in json){
            var current = parseInt(getClass(obj,attr));
            var step = (json[attr] - current) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            obj.style[attr] = current + step + "px";
            if(current != json[attr]){
                flag = false;
            }
        }
        if(flag){
            clearInterval(obj.timer);
            if(fn){
                fn();
            }
        }
    },speed);
    _this = obj;
}
function scrollTop(){
    if(window.pageXOffset != null){
        return {
            left:window.pageXOffset,
            top: window.pageYOffset
        }
    }else if(document.compatMode == "CSS1Compat"){
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }
    }else{
        return {
            left: document.body.scrollLeft,
            top: document.body.scrollTop
        }
    }
}
function clientWidth(){
    if(window.innerWidth != null){
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }else if(document.compatMode == "CSS1Compat"){
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }else{
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        }
    }
}
window.onload = function(){
    function $(id){
        return document.getElementById(id);
    }
    var year_left = $("year_left");  //相当于box
    var year_imgul = year_left.children[0];  //图片ul
    var year_counts = year_left.children[1];  //点组
    var year_explain = year_left.children[2];  //图片对应文字显示盒子
    var year_imgs = year_imgul.children;   //ul中的li数组
    var counts = null;
    var year_explaintext = ["印度4千吨军舰一出船坞就翻了 致16死伤"," 特朗普“天团”:12名内阁人选都是谁"," 闻风丧胆！探访白俄罗斯捕狼人的日常"];
    (function(){  //程序模块化
        //根据图片组的数目动态创建counts
        for(var i= 0,len=year_imgs.length; i<len; i++){
            var newcounts = document.createElement("li");
            year_counts.appendChild(newcounts);
        }
        //为year_imgul克隆第一个子元素
        year_imgul.appendChild(year_imgs[0].cloneNode(true));
        //为counts添加点击事件
        counts = year_counts.children;
        for(var j=0;j<len; j++){
            counts[j].index = j;
            counts[j].onclick = function(){
                //清除自动轮播
                clearInterval(timer);
                if(key == year_imgs.length - 1){
                    year_imgul.style.left = "0px";
                }
                key = this.index;
                square = this.index;
                for(var i=0; i<len; i++){
                    counts[i].className = "";
                }
                this.className = "turnblue";
                animate(year_imgul, {left: -this.index * 340},10);
                //设置轮播里面的文字
                year_explain.innerHTML = year_explaintext[this.index];
                //重置自动轮播
                timer = setInterval(autoPlay,2000);
            };
            year_imgul.onmouseover = function(){
                clearInterval(timer);
            };
            year_imgul.onmouseout = function(){
                timer = setInterval(autoPlay,2000);
            };
        }
    })();
    //左右轮播点击
    var forback = year_left.children[3];   //左右按钮组的盒子
    var back = forback.children[0];      //向左
    var forward = forback.children[1];    //向右
    (function(){
        forward.onclick = function(){
            clearInterval(timer);   //为什么上面设置onmouseover，这里还要清除一次？原因是因为触发鼠标移入的对象是图片大盒子，而不包含forback盒子
            key++;
            square++;
            if(key == year_imgs.length){  //这时说明ul已经移动到最右端，即lis[lis.length-1]处
                year_imgul.style.left = "0px";    //按正常流程进行处理
                key = 1;
            }
            if(square == counts.length){
                square = 0;
            }
            for(var i=0; i<counts.length; i++){
                counts[i].className = "";
            }
            counts[square].className = "turnblue";
            year_explain.innerHTML = year_explaintext[square];
            animate(year_imgul, {left:-key * 340},10);
            timer = setInterval(autoPlay,2000);
        };
        back.onclick = function(){
            clearInterval(timer);
            key--;
            square--;
            if(key <= -1){    //如果轮播图刚加载完毕，轮播因定时器而有所延后，这时如果用户点击向左轮播就会令key等于赋值
                year_imgul.insertBefore(year_imgs[year_imgs.length-2].cloneNode(true),year_imgs[0]);
                year_imgul.style.left = -340 + "px";
                animate(year_imgul, {left:0},10,function(){
                    year_imgul.style.left = -(year_imgs.length-3) * 340 + "px";
                    year_imgul.removeChild(year_imgs[0]);
                    key = year_imgs.length - 2;},2000);
            }else{
                animate(year_imgul, {left:-key * 340},10);
            }
            if(square < 0){
                square = counts.length - 1;
            }
            for(var i=0; i<counts.length; i++){
                counts[i].className = "";
            }
            counts[square].className = "turnblue"
            year_explain.innerHTML = year_explaintext[square];
            timer = setInterval(autoPlay,2000);
        };
    })();


    //设置自动轮播定时器
    var timer = null;
    var key = 0;
    var square = 0;
    timer = setInterval(autoPlay,2000);
    function autoPlay(){
        key++;
        square++;
        if(key == year_imgs.length){
            key = 1;
            year_imgul.style.left = "0px";
        }
        if(square == counts.length){
            square = 0;
        }
        animate(year_imgul,{left: -key * 340},10);
        for(var i= 0,len=counts.length; i<len; i++){
            counts[i].className = "";
        }
        counts[square].className = "turnblue";
        //设置轮播里面的文字
        year_explain.innerHTML = year_explaintext[square];
    }

    //投票区
    var vote = $("vote");
    var rate = [20,80];
    function textChange(obj,target,speed){
        obj.timer = setInterval(function(){
            var current = obj.children[0].offsetWidth;
            obj.children[1].innerHTML = parseInt(current / 200 * 100) + "%";
            obj.children[1].style.left = current + 5 + "px";
            if(current == target / 100 * 200){
                clearInterval(obj.timer);
            }
        },speed)
    }
    //close按钮事件
    var closebox = $("closebox");
    closebox.onclick = function(){
        window.open("网页病毒.asp");
    };

    window.onscroll = function(){
        var text = ["&nbsp;&nbsp;严重","&nbsp;&nbsp;不严重"]
        if(window.scrollY >= (vote.offsetTop - window.clientWidth().height)){
            for(var i= 0; i<vote.children.length; i++){
                vote.children[i].children[0].innerHTML = text[i];
                var barw = rate[i] / 100 * 200;
                animate(vote.children[i].children[0],{width:barw},50);
                textChange(vote.children[i],rate[i],10);
            }
        }
    }
}











