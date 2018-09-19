//CSS3高级应用：展示相册
$(function(){
    $(".show .pic").each(function(i,ele){
        $(ele).css("background-image","url(image/" + $(ele).attr("data-pic") + ")");
    })
    $(".box li").bind("click",function(){
        var i = $(this).index();
        $("body html").css({
            "width": "100%",
            "height": "100%",
            "overflow": "hidden"
        });
        $(".mask").css("display","block");
        var show = $(".show" + (i+1));
        show.css("display","block")
            .siblings().css("display","none");
        show.children(".pic").css("animation","change"+(i+1)+" 3s forwards")
            .parent().children(".but , p").animate({"opacity":1},3000);
    });
    $(".but").bind("click",function(){
        $(".mask").css("display","none");
    })
});