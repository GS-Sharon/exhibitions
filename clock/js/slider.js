//案例：时钟效果
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
        msecond = time.getMilliseconds();  //为了让秒钟行走的更加精确，这里需要将秒数精确到小数，所以需要使用到Milliseconds，即Milliseconds * 1000 =
        // second，下面精确级别的hour等的获取方法类似
        hour = time.getHours() + minute / 60;
        minute = time.getMinutes() + second / 60;
        second = time.getSeconds() + msecond / 1000;
        shi.style.WebkitTransform = "rotate("+ hour % 12 * 30 +"deg)"; //时针是以每格30度单位行走的，而分针跟秒针都是以6度单位行走的
        fen.style.WebkitTransform = "rotate("+ minute * 6 +"deg)";
        miao.style.WebkitTransform = "rotate("+ (second * 6) +"deg)";
        shi.style.MozTransform = "rotate("+ hour % 12 * 30 +"deg)";
        fen.style.MozTransform = "rotate("+ minute * 6 +"deg)";
        miao.style.MozTransform = "rotate("+ (second * 6) +"deg)";
    },1);
};