//案例：手风琴效果
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
            var current = (attr == "opacity") ? parseInt(parseFloat(getStyle(obj,attr))*100) || 0 : parseInt(getStyle(obj,attr));
            var step = (json[attr] - current) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if(attr == "opacity"){
                if("opacity" in obj.style){
                    obj.style[attr] = (current + step) * 100;
                }else{
                    obj.style[attr] = current + step*10;
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
    },10);
}

window.onload = function() {
    var box = $("box");
    var lis = box.children[0].children;
    for(var i=0; i<lis.length; i++){
        lis[i].onmouseover = function(){
            for(var i=0; i<lis.length; i++){
                animate(lis[i],{width:20});
            }
            animate(this,{width:1226});
        };
    }
};