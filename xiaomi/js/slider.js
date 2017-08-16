//案例十三：小米手机上下自动滚动广告
function $(id){
    return document.getElementById(id);
}
var timer = null;
var key = 0;
function autoMove(obj,fn){
    timer = setInterval(function(){
        fn();
        if(key >= 0 && key <= 1070){//要减去box自身的高度
            console.log(key);
            obj.style["backgroundPosition"] = "0 "+ -key +"px";
        }else{
            clearInterval(timer);
        }
    },10);
}
window.onload = function(){
    var box = $("box");
    var top = box.children[0];
    var bottom = box.children[1];
    top.onmouseover = function(){
        clearInterval(timer);
        autoMove(box,function(){++key});
    };
    bottom.onmouseover = function(){
        clearInterval(timer);
        autoMove(box,function(){--key});
    };
    box.onmouseout = function(){
        clearInterval(timer);
    };
};