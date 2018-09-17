/*
* @Author: sharon
* @Date:   2018-07-16 15:32:56
* @Last Modified by:   name
* @Last Modified time: 2018-07-19 03:35:23
*/

'use strict';

function Ballon() {
    //设置self
    var self = this;

    this.boxWidth = document.getElementById("box").offsetWidth;
    this.boxHeight = document.getElementById("box").offsetHeight;
    this.dom = null;
    //气球标号
    this.type = parseInt(Math.random() * 12);
    //初始气球实例x轴的位置
    this.x = Math.random() * (this.boxWidth - 138);
    // 初始气球实例y轴的位置
    this.y = this.boxHeight;

    //设置气球的步长
    this.step = (function() {
        if(self.type <= 8) {
            return self.type + 2;
        } else if(self.type == 9) {
            return 10;
        } else if(self.type == 10) {
            return 20;
        } else if(self.type == 11) {
            return parseInt(Math.random() * 10) + 1;
        }
    })();
    // 该球的分数
    this.score = 0;
    // 创建气球dom
    this.init();
    arr.push(this);
}
Ballon.prototype = {
    //创建dom
    init: function() {
        this.dom = document.createElement("div");
        this.dom.setAttribute("class","ballon");
        document.getElementById("box").appendChild(this.dom);
        //设置气球的位置
        this.dom.style.left = this.x + "px";
        this.dom.style.top = this.y + "px";
        // 设置气球的背景图
        this.dom.style.backgroundPosition = -138 * (this.type % 4) + "px " + -175 * parseInt(this.type / 4) + "px";
    },
    update: function() {
        this.y -= this.step;
        this.dom.style.top = this.y + "px";
        if(this.y <= -this.boxHeight - this.dom.offsetHeight) {
            this.goDie();
        }
    },
    bindEvent: function() {
        if(this.type <= 8) {
            score += this.type + 1;
        } else if(this.type == 9) {
            score *= 2;
        } else if(this.type == 10) {
            score /= 2;
        } else {
            score += parseInt(Math.random() * 10) + 1;
        }
        console.log(score);
        document.getElementById("score").innerHTML = score;
    },
    goDie: function() {
        //销毁元素
        this.dom.parentNode.removeChild(this.dom);
        //移除数组中的该元素
        for(var i=0; i<arr.length; i++) {
            if(arr[i] == this) {
                arr.splice(i,1);
            }
        }
    }

};

var arr = [],
    f = 0,
    score = 0;
document.onclick = function(e) {
    var x = e.clientX;
    var y = e.clientY;
    for(var i=0; i<arr.length; i++) {
        //UI方面作图没有根据气球大小进行匹配
        if(arr[i].x >= x-118 && arr[i].x <= x+118
            &&
            arr[i].y >= y-168 && arr[i].y <= y+168) {
            arr[i].bindEvent();
            arr[i].goDie();
        }

    }
};
setInterval(function() {
    ++f;
    if(f % 50 == 0)  new Ballon();
    for(var i=0; i<arr.length; i++) {
        arr[i].update();
    }

},20);


