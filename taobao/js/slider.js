//������ʮ�ߣ��Ա��ֲ�ͼ
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
//�����˶�
function animate(obj,attr,target,step){
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var current = parseInt(getStyle(obj,attr));
        var result = target - current;
        var speed = target > current ? step : -step;//Ҫ����speed������step = -10����ô-step�ͻ����10
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
    //����ͼƬ��������Բ��
    for(var i=0; i<imgs.length; i++){
        var newpoint = document.createElement("li");
        newpoint.innerHTML = i + 1;
        pointol.appendChild(newpoint);
    }
    pointol.style.marginLeft = -.5*30*imgs.length + "px";
    //��������imgs�ĵ�һ����Ԫ��
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
    //�Զ��ֲ�
    var key = 0;
    var square = 0;
    function autoPlay(){
        ++key;
        ++square;
        if(key > imgs.length - 1){//��Ϊ���涯̬����imgs[5]����������imgs.lengthΪ6��֮ǰ��̬����point��ʱ����Ϊ�����ǰ�˳��ִ�еģ�����������imgs����ʱ��length����Ϊ5
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