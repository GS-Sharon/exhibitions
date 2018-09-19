//案例：左右轮播
function $(id){
    return document.getElementById(id);
}
//匀速运动函数
var leader = target = 0;
function sameSpeed(obj,step){
    step = target > leader ? step : -step;
    leader += step;
    obj.style.left = -leader + "px";
}
window.onload = function(){
    var box = $("box");
    var imgul = box.children[0];
    var imgs = imgul.children;
    var vv = box.children[1];
    var conul = vv.children[0];
    var key = 0;
    var timer = null;
    //动态生成圆点
    for(var i=0 ; i<imgs.length; i++){
        var newcon = document.createElement("li");
        newcon.innerHTML = imgs.length - i;
        newcon.className = "olcon";
        conul.insertBefore(newcon,conul.children[1]);
    }
    var cons = conul.children;
    conul.style.width = (cons.length - 2) * 30 + "px";
    for(var j=0; j<cons.length; j++){
        cons[j].index = j;
        cons[j].onclick = function(){
            if(this.className == "rightcon"){
                ++key;
                key = key > imgs.length - 1 ? 0 : key;
                target = key * 520;
                timer = setInterval(function(){
                    if(leader != target){
                        sameSpeed(imgul,10);
                    }else{
                        clearInterval(timer);
                    }
                },10);
            }else if(this.className == "leftcon"){
                --key;
                key = key < 0 ? imgs.length - 1 : key;
                target = key * 520;
                timer = setInterval(function(){
                    if(leader != target){
                        sameSpeed(imgul,10);
                    }else{
                        clearInterval(timer);
                    }
                },10);
            }else{
                key = this.index - 1;
                target = key * 520;
                timer = setInterval(function(){
                    if(leader != target){
                        sameSpeed(imgul,10);
                    }else{
                        clearInterval(timer);
                    }
                },10);
            }
            for(var i=1; i<imgs.length+1; i++){
                cons[i].className = "olcon";
            }
            cons[key+1].className = "olcon change";
        }
    }
};