//Konva案例：绘制webitcast星球旋转效果
window.onload = function(){
    //建立舞台
    var stage = new Konva.Stage({
        width : window.innerWidth,
        height : window.innerHeight,
        container : "container"
    });
    //建立固定层
    var layer = new Konva.Layer();
    //建立第二轨道动画层
    var layer1 = new Konva.Layer();
    //建立第三轨道动画层
    var layer2 = new Konva.Layer();
    //将层添加到舞台中
    stage.add(layer);
    stage.add(layer1);
    stage.add(layer2);
    //创建大轨道
    var strokeTrack1 = new createItcast({
        dash : [10,4],
        strokeWidth : 5
    });
    //创建小轨道
    var strokeTrack2 = new createItcast({
        dash : [10,4],
        radius : 150,
        strokeWidth : 5
    });
    //创建中心web全栈星球
    var planet1 = new createItcast({
        radius : 80,
        opacity : 1,
        strokeWidth : 30,
        text : "Web全栈"
    });
    //创建第二轨道的HTML5星球
    var planet2 = new createItcast({
        radius : 40,
        fill : "#FFB129",
        distancex : 150 * Math.cos(125*Math.PI / 180),
        distancey : 150 * Math.sin(125*Math.PI / 180),
        text : "HTML5"
    });
    //创建第二轨道的CSS3星球
    var planet3 = new createItcast({
        radius : 40,
        fill: "#F8D9D9",
        distancex : 0,
        distancey : -150,
        text : "CSS3"
    });
    //创建第三轨道的JS星球
    var planet4 = new createItcast({
        radius : 40,
        fill : "#A1C8F8",
        distancex : 250 * Math.cos(-45 * Math.PI / 180),
        distancey : 250 * Math.sin(-45 * Math.PI / 180),
        text : "JS",
        angleDuration : 20
    });
    //轨道数组
    var trackArr = [strokeTrack1,strokeTrack2];
    for(var i=0; i< trackArr.length; i++){
        trackArr[i].drawTrack();
        trackArr[i].drawLayer(layer);
    }
    //星球数组
    var planetArr = [planet1,planet2,planet3,planet4];
    for(var i=0; i<planetArr.length ; i++){
        planetArr[i].drawPlanet();
        if(planetArr[i] == planet1){
            planetArr[i].drawLayer(layer);
        }else{
            if(planetArr[i] == planet4){
                planetArr[i].rotateAnimation(layer2);
            }
            planetArr[i].drawLayer(layer1);
            planetArr[i].rotateAnimation(layer1);
        }
    };
    strokeTrack1.mouseEvent(layer);
};
//创建构造函数
function createItcast(options){
    this._init(options);
};
//createItcast的原型
createItcast.prototype = {
    _init: function(options){
        this.x = options.x || (window.innerWidth / 2);
        this.y = options.y || (window.innerHeight / 2);
        this.distancex = options.distancex || 0;
        this.distancey = options.distancey || 0;
        this.radius = options.radius || 250;
        this.stroke = options.stroke || "#CCC";
        this.dash = options.dash || 0;
        this.strokeWidth = options.strokeWidth || 16;
        this.fill = options.fill || "#717999";
        this.opacity = options.opacity || .7;
        this.color = options.color || "#fff";
        this.text = options.text || "";
        this.fontSize = options.fontSize || 16;
        this.angleDuration = options.angleDuration || 50;
    },
    createGroup : function(){
        this.group = new Konva.Group({
            x : this.x,
            y : this.y
        })
    },
    strokeTrack: function(){
        var strokeball = new Konva.Circle({
            x : this.distancex,
            y : this.distancey,
            radius : this.radius,
            stroke : this.stroke,
            strokeWidth : this.strokeWidth,
            dash : this.dash
        });
        this.group.add(strokeball);
    },
    fillPlanet : function(){
        var fillball = new Konva.Circle({
            x : this.distancex,
            y : this.distancey,
            radius : this.radius,
            fill : this.fill,
            opacity : this.opacity
        });
        this.group.add(fillball);
    },
    fillText : function(){
        var planetText = new Konva.Text({
            text : this.text,
            x : this.distancex - this.radius - this.strokeWidth / 2,
            y: this.distancey - this.fontSize / 2,
            translatex : -(this.radius + this.strokeWidth / 2),
            translatey : -this.fontSize / 2,
            width : this.radius*2 + this.strokeWidth,
            fontSize: this.fontSize,
            fill : this.color,
            align : "center",
            fontStyle : "bold",
            fontFamily : "微软雅黑",
            name : "text"
        });
        this.group.add(planetText);
    },
    drawTrack : function(){
        this.createGroup();
        this.strokeTrack();
    },
    drawPlanet : function(){
        this.createGroup();
        this.fillPlanet();
        this.strokeTrack();
        this.fillText();
    },
    drawLayer : function(layer){
        layer.add(this.group);
        layer.draw();
    },
//制作帧动画
    rotateAnimation : function(layer){
        var _this = this;
        var animation = new Konva.Animation(function(frame){
            var angle = _this.angleDuration * frame.timeDiff / 1000;
            _this.group.rotate(angle);
        },layer);
        animation.start();
    },
    mouseEvent : function(layer){
        //鼠标移入事件
        layer.on("mouseenter",function(){
            this.angleDuration = 30;
        });
        layer.on("mouseleave",function() {
            this.angleDuration = 50;
        });
    }
}