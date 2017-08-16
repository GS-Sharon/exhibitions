//Konva案例：动态饼状图面向对象
window.onload = function(){
    //创建舞台
    var stage = new Konva.Stage({
        width : window.innerWidth,
        height : window.innerHeight,
        container : "container"
    });
    //创建层
    var layer = new Konva.Layer();
    //将层添加到舞台中
    stage.add(layer);
    //关于饼状图属性的数组
    var data = [
        {name :"HTML5", color :"red",percent :0.3},
        {name :"Java", color :"lightblue",percent : 0.1},
        {name : "PHP", color : "blue",percent : 0.2},
        {name : "Android", color : "green", percent : 0.1},
        {name : "全栈", color : "orange", percent : 0.25},
        {name : "网络营销", color : "purple", percent : 0.05}
    ];
    var piechart = new createPieChart({
        data : data
    });
    piechart.addToLayer(layer);
    piechart.addAnimation(layer);
};
//创建饼状图的构造函数
function createPieChart(options){
    this._init(options);
}
createPieChart.prototype = {
    _init : function(options){
        this.data = options.data || [];
        this.x = options.x || window.innerWidth / 2;
        this.y = options.y || window.innerHeight / 2;
        this.radius = options.radius || 150;
        //动画索引
        this.index = 0;
        this.duration = options.duration || 2;
    },
    //创建group
    createGroup : function(){
        this.group = new Konva.Group({
            x : this.x,
            y : this.y
        });
    },
    //绘制楔形和文字
    createPie : function(){
        var angle = 0,
            rotation = 0;
        for(var i=0 ; i<this.data.length; i++){
            angle = this.data[i].percent * 360;
            var wedge = new Konva.Wedge({
                radius : this.radius,
                fill : this.data[i].color,
                rotation : rotation + 90,
                angle : 0
            });
            var text = new Konva.Text({
                width : 100,
                text : this.data[i].name + " " + this.data[i].percent*100 + "%",
                fill : this.data[i].color,
                x : (this.radius + 20) *  Math.cos((rotation + 90+ angle / 2) * Math.PI / 180),
                y : (this.radius + 20) *  Math.sin((rotation + 90 +angle / 2) * Math.PI / 180),
                opacity : 0
            });
            if((rotation + 90+ angle / 2) < 270 && (rotation + 90+ angle / 2) > 90){
                text.x((this.radius + 20) *  Math.cos((rotation + 90+ angle / 2) * Math.PI / 180) - 60);
            }
            rotation += angle;
            this.group.add(wedge);
            this.group.add(text);
        }
        console.log(this.group)
    },
    //添加到层
    addToLayer : function(layer){
        this.createGroup();
        this.createPie();
        layer.add(this.group);
        layer.draw();
    },
    //添加动画
    addAnimation : function(layer){
        //得到所有的楔形
        var wedges = layer.find('Wedge');
        var texts = layer.find("Text");
        var _this = this;
        wedges[this.index].to({
            duration : this.duration * this.data[_this.index].percent,
            angle : this.data[_this.index].percent * 360,
            onFinish : function(){
                texts[_this.index].to({
                    opacity : 1
                });
                _this.index++;
                if(_this.index >= wedges.length) {
                    _this.index = 0;
                    return; //结束当前函数
                }
                //递归函数
                _this.addAnimation(layer);
            }
        });
    }
}