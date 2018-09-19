//CSS3案例：自创扇形导航栏
$(function(){
    var lis = $(".circle li");
    lis.each(function(index,ele){
        var span = $("<span></span>");
        span.addClass("shan")
        $(ele).append(span);
    });
    $(".circle").bind("mouseenter mouseleave",function(e){
       if(e.type == "mouseenter"){
           lis.each(function(index,ele){
               $(".circle").css("background-color","rgba(0,0,0,0)").children(".txt").css("z-index","3");
               $(ele)
                   .css({
                       "transform":"rotate("+(30*index)+"deg)",
                       "opacity": 1,
                       "transition-delay":.1*index+"s"
                   });
               $(ele).children(".shan").css("background-color","rgba(100,100,100,"+(1-index *.08)+")")
           })
       }else {
           lis.each(function(index,ele){
               $(".circle").css("background-color","rgba(255,0,0,1)").children(".txt").css("z-index","0");
               $(ele)
                   .css({
                       "transform":"rotate(0deg)",
                       "opacity": 0,
                       "transition-delay":.1*(12-index)+"s"
                   });
               $(ele).children(".shan").css("background-color","rgba(100,100,100,"+(1-index *.08)+")")
           })
       }
    })
});