//Konva案例：柱形图案例—面向对象
window.onload = function(){
    //建立舞台
    var stage = new Konva.Stage({
        width : window.innerWidth,
        height : window.innerHeight,
        container : "container"
    });
    //创建层
    var layer = new Konva.Layer();
    //将层添加到舞台中
    stage.add(layer);
    //绘制坐标底线
    var totalW = window.innerWidth;
    var totalH = window.innerHeight;
    var bottomLine = new Konva.Line({
        //points : [x,y,x',y']
        //条形图的宽度为1/2totalW，高度为3/4totalH
        points : [1/4*totalW,3/4*totalH,3/4*totalW,3/4*totalH],
        strokeWidth : 2,
        stroke : "lightgreen"
    });
    //条状的数组
    var data = [
        {
            color : "#47974C",
            height : 0.8,
            textcn : "前端"
        },
        {
            color : "#4D59FF",
            height : 0.3,
            textcn : "Java"
        },
        {
            color : "#FF5F4D",
            height : 0.7,
            textcn : "PHP"
        },
        {
            color : "#FFBD49",
            height : 0.9,
            textcn : "IOS"
        },
        {
            color : "#AB5BA6",
            height : 0.4,
            textcn : "UI"
        },
        {
            color : "#FDD4D6",
            height : 0.9,
            textcn : "Node"
        }
    ];
    //相当于for循环，而且item = data[i],index = i;
    data.forEach(function(item,index){
        var newRect = new barChart({
            x : 1/4*totalW,
            y : 3/4*totalH,
            distancex : (1/2*totalW / data.length / 4) + 1/2*totalW / data.length*index,
            distancey : item.height,
            color : item.color,
            width : 1/2*totalW / data.length / 2,
            height : item.height * 3/4*totalH,
            text : item.height * 100 + "%",
            textcn : item.textcn,
            textY : 3/4*totalH + 5
        });
        newRect.drawBar();
        newRect.addToLayer(layer);
        newRect.addBarAnimation();
    });
    layer.add(bottomLine);
    layer.draw();
};
//创建构造函数
function barChart(options){
    this._init(options);
};
//构造函数的原型
barChart.prototype = {
    _init : function(options){
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.distancex = options.distancex || 0;
        this.distancey = options.distancey || 0;
        this.width = options.width || 0;
        this.height = options.height || 0;
        this.color = options.color;
        this.cornerRadius = options.cornerRadius || 10;
        this.text = options.text || "";
        this.textcn = options.textcn || "";
    },
    //创建group
    createGroup : function(){
      this.group = new Konva.Group({
          x : this.x,
          y : this.y
      })
    },
    //创建绘制矩形的方法
    createRect : function(){
        var rect = new Konva.Rect({
            x : this.distancex,
            y : 0,
            width : this.width,
            height : 0,
            fill: this.color,
            cornerRadius : this.cornerRadius,
        });
        this.group.add(rect);
    },
    //创建绘制文字的方法
    createText : function(){
        var txt = new Konva.Text({
            text : this.text,
            x : this.distancex + 10,
            y : 0,
            fill : this.color,
            name : "txt"
        });
        var txtcn = new Konva.Text({
            text : this.textcn,
            x : this.distancex + 10,
            y : 5,
            fill : this.color,
            rotation : 30
        });
        this.group.add(txt);
        this.group.add(txtcn);
    },
    //条形绘制完成方法
    drawBar : function(){
        this.createGroup();
        this.createRect();
        this.createText();
    },
    //将group添加到层中
    addToLayer : function(layer){
        layer.add(this.group);
    },
    //条状动画
    addBarAnimation : function(){
        this.group.find("Rect").to({
            height : this.height,
            y : -this.distancey*this.y,
            duration : 1,
            easing: Konva.Easings.EaseInOut
        });
        this.group.find(".txt").to({
            y : -this.distancey*this.y - 16,
            duration : 1,
            easing: Konva.Easings.EaseInOut
        });
    }
}