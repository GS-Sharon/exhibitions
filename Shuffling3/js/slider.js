//�������޷����
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
        if(obj.offsetLeft >= -1200 && obj.offsetLeft <= 0){//Ŀ��ֵҪ��ȥbox�Ŀ��
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