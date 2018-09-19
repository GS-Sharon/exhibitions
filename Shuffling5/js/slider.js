//案例：仿网易轮播图
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

function animate(obj,json,fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var flag = true;
        for(var attr in json){
            var current = (attr == "opacity") ? parseInt(parseFloat(getStyle(obj,attr))*100) || 0 :
 parseInt(getStyle(obj,attr));
            var step = (json[attr] - current) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if(attr == "opacity"){
                if("opacity" in obj.style){
                    obj.style[attr] = (current + step) * 100;
                }else{
                    obj.style[attr] = current + step * 10;
                }
            }else if(attr == "zIndex"){
                obj.style[attr] = json[attr];
            }else{
                obj.style[attr] = current + step + "px";
            }
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
    },20);
}

window.onload = function(){
    var box = $("box");
    var picbox = box.children[0];
    var bar = box.children[1];
    var pics = picbox.children;
    var barlis = bar.children[0].children;
    //根据图片数量来决定barlis的数量
    for(var i=0; i<pics.length; i++){
        pics[i].children[0].src = "images/" + (i+1) + ".jpg";
        var newli = document.createElement("li");
        newli.className = "normalbut";
        bar.children[0].insertBefore(newli,barlis[barlis.length-1]);
    }
    bar.children[0].style.paddingLeft = parseInt(getStyle(bar.children[0],"paddingLeft")) - 29 * (barlis.length - 2) / 2 + 5 + "px";
    //fore记录上一个事件
    var boxW = box.clientWidth;
    var fore = 0;
    var now = 0;
    var timer = null;
    pics[0].style.left = "0px";
    //为每一个barlis添加事件
    for(var j=0; j<barlis.length; j++){
        barlis[j].index = j;
        barlis[j].onclick = function(){
            clearInterval(timer);
            //返回上一张按钮功能实现
            if(this.className == "leftbut"){
                animate(pics[fore],{left:boxW});
                fore = fore <= 0 ? pics.length - 1 : --fore;
                now = fore;
                pics[now].style.left = -boxW + "px";
                animate(pics[now],{left:0});
            }else if(this.className == "rightbut"){
                //切换下一张按钮功能实现
                animate(pics[fore],{left:-boxW});
                fore = fore >= pics.length - 1 ? 0 : ++fore;
                now = fore;
                pics[now].style.left = boxW + "px";
                animate(pics[now],{left:0});
            }else{
                //点击滑块切换图片
                now = this.index - 1;
                if(now != 0){
                    animate(pics[fore],{left:-boxW});
                    pics[now].style.left = boxW + "px";
                    animate(pics[now],{left:0});
                }else{
                    pics[now].style.left = "0px";
                }
                fore = now;
            }
            changeColor(barlis,now + 1);
            timer = setInterval(autoPlay,2000);
        };
    }
    //自动轮播
    timer = setInterval(autoPlay,2000);
    function autoPlay() {
        animate(pics[fore],{left:-boxW});
        fore = fore >= pics.length - 1 ? 0 : ++fore;
        now = fore;
        pics[now].style.left = boxW + "px";
        animate(pics[now],{left:0});
        changeColor(barlis,now + 1);
    }
    //滑块变色
    function changeColor(obj,iNow){
        for(var i=0; i<pics.length; i++){
            obj[i + 1].className = "normalbut";
        }
        obj[iNow].className = "bluebut";
    }
};