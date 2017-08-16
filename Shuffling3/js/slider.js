//案例：无缝滚动
function $(id){
    return document.getElementById(id);
}
window.onload = function(){
    var box = $("box");
    var imgul = box.children[0];
    var timer = null;
    var key = 0;
    function autoPlay(obj){
        ++key;
        console.log(obj.offsetLeft)
        if(obj.offsetLeft >= -1200 && obj.offsetLeft <= 0){//目标值要减去box的宽度
            obj.style["left"] = -key + "px";
        }else{
            obj.style["left"] = "0px";
            key = 0;
        }
    }
    timer = setInterval(function(){
        autoPlay(imgul);
    },10);
    box.onmouseover = function(){
        clearInterval(timer);
    };
    box.onmouseout = function(){
        timer = setInterval(function(){
            autoPlay(imgul);
        },10);
    }
};