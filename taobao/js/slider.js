//案例二十七：淘宝轮播图
function $(id) {
    return document.getElementById(id);
}
function getStyle(obj,attr) {
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return window.getComputedStyle(obj,null)[attr];
    }
}
//匀速运动
function animate(obj,attr,target,step){
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var current = parseInt(getStyle(obj,attr));
        var result = target - current;
        var speed = target > current ? step : -step;//要定义speed，否则step = -10，那么-step就会等于10
        obj.style[attr] = current + speed + "px";
        if(Math.abs(result) <= Math.abs(step)){
            obj.style[attr] = target + "px";
            clearInterval(obj.timer);
        }
    },10);
}
window.onload = function() {
    var box = $("box");
    var imgul = box.children[0];
    var pointol = box.children[1];
    var imgs = imgul.children;
    var timer = null;
    //根据图片数量生成圆点
    for(var i=0; i<imgs.length; i++){
        var newpoint = document.createElement("li");
        newpoint.innerHTML = i + 1;
        pointol.appendChild(newpoint);
    }
    pointol.style.marginLeft = -.5*30*imgs.length + "px";
    //复制生成imgs的第一个子元素
    imgul.appendChild(imgs[0].cloneNode(true));
    var points = pointol.children;
    for(var j=0; j<points.length; j++){
        points[j].index = j;

        points[j].onmouseover = function(){
            clearInterval(timer);
            for(var i=0; i<points.length; i++){
                points[i].className = "";
            }
            points[this.index].className = "change";
            animate(imgul,"left",-this.index * box.clientWidth,10);
            timer = setInterval(autoPlay,3000);
        };

    }
    box.onmouseover = function(){
        clearInterval(timer);
    };
    box.onmouseout = function(){
        timer = setInterval(autoPlay,3000);
    };
    //自动轮播
    var key = 0;
    var square = 0;
    function autoPlay(){
        ++key;
        ++square;
        if(key > imgs.length - 1){//因为后面动态生成imgs[5]，所以这里imgs.length为6，之前动态生成point的时候因为程序是按顺序执行的，所以它访问imgs变量时的length属性为5
            key = 1;
            imgul.style.left = "0px";
        }
        if(square > points.length - 1){
            square = 0;
        }
        for(var i=0; i<points.length; i++){
            points[i].className = "";
        }
        points[square].className = "change";
        animate(imgul,"left",-key*500,10);
    }
    timer = setInterval(autoPlay,3000);
};