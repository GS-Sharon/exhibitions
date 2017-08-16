//Bootstrap：微金所

//轮播自适应屏幕调整item容器的高度
$(function(){
    function change(){
        var screenW = $(window).width();
        $("#main-ad>.carousel-inner>.item").each(function(i,ele){
            var data_image = $(ele).data(screenW > 960 ? "image-lg" : "image-xs");
            if(screenW > 960){
                $(ele).empty().css({
                    "height" : "410px",
                    "backgroundImage" : "url("+ data_image +")"
                });
            }else{
                $(ele).removeAttr("style").css("height","auto").html("<img src='"+ data_image +"'/>");
            }
        });
        var scro_width = 0;
        $("#products > .container > .ul-wrapper > .nav-tabs li").each(function(i,ele){
            scro_width += ele.clientWidth;
        });
        if($("#products > .container > .ul-wrapper").width() < scro_width){
            $("#products > .container > .ul-wrapper > .nav-tabs").css("width",scro_width+"px");
            $("#products > .container > .ul-wrapper").css("overflow-x","scroll");
        }else{
            $("#products > .container > .ul-wrapper > .nav-tabs").css("width","auto");
            $("#products > .container > .ul-wrapper").css("overflow-x","auto");
        }
    };
    $(window).bind("resize",function(){
        change();
    }).trigger('resize');
    $('[data-toggle="tooltip"]').tooltip();
    //新闻区域  给每一个a注册点击事件
    $("#news > .container .nav-stacked li").children().bind("click",function(){
        $(".new-title").text($(this).data("title"));
    })
    //控制轮播的左右滑动
    //1.判断手指滑动的方向，bootstrap提供了ontouchstart、touchmove、touchend三个方法，ontouchstart负责监测手指触摸时初始坐标；ontouchmove负责检测手指滑动时坐标的变化；ontouchend负责监测手指离开时手指滑动的距离并且由此判断滑动的方向
    var tStart, tMove, distance, direction;
    $(".carousel").on({
        "touchstart" : function(e){
            $this = $(this);
            tStart = e.originalEvent.touches[$(".carousel").index($this)].clientX;
        },
        "touchmove" : function(e){
            var $this = $(this);
            tMove = e.originalEvent.touches[$(".carousel").index($this)].clientX;
        },
        "touchend" : function(){
            //2.得到手指滑动的距离
            distance = tStart - tMove;
            //3.如果距离大于50px就默认是在滑动，再进行判断方向，并使用bootstrap中的carousel方法，参数是prev就向前滑动，如果是next就是向后滑动
            if(Math.abs(distance) > 50){
                direction = distance > 0 ? "next" : "prev";
                $(this).carousel(direction);
            }
        }
    });



});