//案例：焦点图
function $(id){
    return document.getElementById(id);
}
//匀速运动函数
var leader = 0;
function sameSpeed(obj,step,target){
    step = target > leader ? step : -step;
    leader += step;//或者使用offsetLeft，这样就可以不用声明leader
    obj.style.left = -leader + "px";
}
window.onload = function(){
    var box = $("box");
    var imgul = box.children[0];
    var imgs = imgul.children;
    var conul = box.children[1];
    var timer= null;
    //根据图片数量生成圆点
    for(var i=0; i<imgs.length; i++){
        var newcon = document.createElement("li");
        newcon.innerHTML = i + 1;
        conul.appendChild(newcon);
    }
    var cons = conul.children;
    for(var j=0; j<cons.length; j++){
        cons[j].index = j;
        cons[j].onclick = function(){
            clearInterval(timer);
            for(var i=0; i<cons.length; i++){
                cons[i].className = "";
            }
            this.className = "change";
            var that = this.index;
            timer = setInterval(function(){
                if(leader != that * 490){
                    sameSpeed(imgul,10,that * 490);
                }else{
                    clearInterval(timer);
                }
            },10);
        }
    }
};