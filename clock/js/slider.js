//������ʱ��Ч��
function $(id){
    return document.getElementById(id);
}
window.onload = function(){
   var time,hour,minute,second,msecond;
    var box = $("box");
    var shi = box.children[0];
    var fen = box.children[1];
    var miao = box.children[2];
   var timer = null;
    timer = setInterval(function(){
        time = new Date();
        msecond = time.getMilliseconds();  //Ϊ�����������ߵĸ��Ӿ�ȷ��������Ҫ��������ȷ��С����������Ҫʹ�õ�Milliseconds����Milliseconds * 1000 =
        // second�����澫ȷ�����hour�ȵĻ�ȡ��������
        hour = time.getHours() + minute / 60;
        minute = time.getMinutes() + second / 60;
        second = time.getSeconds() + msecond / 1000;
        shi.style.WebkitTransform = "rotate("+ hour % 12 * 30 +"deg)"; //ʱ������ÿ��30�ȵ�λ���ߵģ�����������붼����6�ȵ�λ���ߵ�
        fen.style.WebkitTransform = "rotate("+ minute * 6 +"deg)";
        miao.style.WebkitTransform = "rotate("+ (second * 6) +"deg)";
        shi.style.MozTransform = "rotate("+ hour % 12 * 30 +"deg)";
        fen.style.MozTransform = "rotate("+ minute * 6 +"deg)";
        miao.style.MozTransform = "rotate("+ (second * 6) +"deg)";
    },1);
};