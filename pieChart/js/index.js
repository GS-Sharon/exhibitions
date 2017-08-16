//Konva��������̬��״ͼ�������
window.onload = function(){
    //������̨
    var stage = new Konva.Stage({
        width : window.innerWidth,
        height : window.innerHeight,
        container : "container"
    });
    //������
    var layer = new Konva.Layer();
    //������ӵ���̨��
    stage.add(layer);
    //���ڱ�״ͼ���Ե�����
    var data = [
        {name :"HTML5", color :"red",percent :0.3},
        {name :"Java", color :"lightblue",percent : 0.1},
        {name : "PHP", color : "blue",percent : 0.2},
        {name : "Android", color : "green", percent : 0.1},
        {name : "ȫջ", color : "orange", percent : 0.25},
        {name : "����Ӫ��", color : "purple", percent : 0.05}
    ];
    var piechart = new createPieChart({
        data : data
    });
    piechart.addToLayer(layer);
    piechart.addAnimation(layer);
};
//������״ͼ�Ĺ��캯��
function createPieChart(options){
    this._init(options);
}
createPieChart.prototype = {
    _init : function(options){
        this.data = options.data || [];
        this.x = options.x || window.innerWidth / 2;
        this.y = options.y || window.innerHeight / 2;
        this.radius = options.radius || 150;
        //��������
        this.index = 0;
        this.duration = options.duration || 2;
    },
    //����group
    createGroup : function(){
        this.group = new Konva.Group({
            x : this.x,
            y : this.y
        });
    },
    //����Ш�κ�����
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
    //��ӵ���
    addToLayer : function(layer){
        this.createGroup();
        this.createPie();
        layer.add(this.group);
        layer.draw();
    },
    //��Ӷ���
    addAnimation : function(layer){
        //�õ����е�Ш��
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
                    return; //������ǰ����
                }
                //�ݹ麯��
                _this.addAnimation(layer);
            }
        });
    }
}