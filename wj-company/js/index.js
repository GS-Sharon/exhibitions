//Bootstrap��΢����

//�ֲ�����Ӧ��Ļ����item�����ĸ߶�
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
    //��������  ��ÿһ��aע�����¼�
    $("#news > .container .nav-stacked li").children().bind("click",function(){
        $(".new-title").text($(this).data("title"));
    })
    //�����ֲ������һ���
    //1.�ж���ָ�����ķ���bootstrap�ṩ��ontouchstart��touchmove��touchend����������ontouchstart��������ָ����ʱ��ʼ���ꣻontouchmove��������ָ����ʱ����ı仯��ontouchend��������ָ�뿪ʱ��ָ�����ľ��벢���ɴ��жϻ����ķ���
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
            //2.�õ���ָ�����ľ���
            distance = tStart - tMove;
            //3.����������50px��Ĭ�����ڻ������ٽ����жϷ��򣬲�ʹ��bootstrap�е�carousel������������prev����ǰ�����������next������󻬶�
            if(Math.abs(distance) > 50){
                direction = distance > 0 ? "next" : "prev";
                $(this).carousel(direction);
            }
        }
    });



});