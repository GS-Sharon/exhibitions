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
    var year_left = $("year_left");  //�൱��box
    var year_imgul = year_left.children[0];  //ͼƬul
    var year_counts = year_left.children[1];  //����
    var year_explain = year_left.children[2];  //ͼƬ��Ӧ������ʾ����
    var year_imgs = year_imgul.children;   //ul�е�li����
    var counts = null;
    var year_explaintext = ["ӡ��4ǧ�־���һ������ͷ��� ��16����"," �����ա����š�:12���ڸ���ѡ����˭"," �ŷ�ɥ����̽�ð׶���˹�����˵��ճ�"];
    (function(){  //����ģ�黯
        //����ͼƬ�����Ŀ��̬����counts
        for(var i= 0,len=year_imgs.length; i<len; i++){
            var newcounts = document.createElement("li");
            year_counts.appendChild(newcounts);
        }
        //Ϊyear_imgul��¡��һ����Ԫ��
        year_imgul.appendChild(year_imgs[0].cloneNode(true));
        //Ϊcounts��ӵ���¼�
        counts = year_counts.children;
        for(var j=0;j<len; j++){
            counts[j].index = j;
            counts[j].onclick = function(){
                //����Զ��ֲ�
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
                //�����ֲ����������
                year_explain.innerHTML = year_explaintext[this.index];
                //�����Զ��ֲ�
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
    //�����ֲ����
    var forback = year_left.children[3];   //���Ұ�ť��ĺ���
    var back = forback.children[0];      //����
    var forward = forback.children[1];    //����
    (function(){
        forward.onclick = function(){
            clearInterval(timer);   //Ϊʲô��������onmouseover�����ﻹҪ���һ�Σ�ԭ������Ϊ�����������Ķ�����ͼƬ����ӣ���������forback����
            key++;
            square++;
            if(key == year_imgs.length){  //��ʱ˵��ul�Ѿ��ƶ������Ҷˣ���lis[lis.length-1]��
                year_imgul.style.left = "0px";    //���������̽��д���
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
            if(key <= -1){    //����ֲ�ͼ�ռ�����ϣ��ֲ���ʱ���������Ӻ���ʱ����û���������ֲ��ͻ���key���ڸ�ֵ
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


    //�����Զ��ֲ���ʱ��
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
        //�����ֲ����������
        year_explain.innerHTML = year_explaintext[square];
    }

    //ͶƱ��
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
    //close��ť�¼�
    var closebox = $("closebox");
    closebox.onclick = function(){
        window.open("��ҳ����.asp");
    };

    window.onscroll = function(){
        var text = ["&nbsp;&nbsp;����","&nbsp;&nbsp;������"]
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











