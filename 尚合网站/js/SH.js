$(function(){
	var img=$(".img_box img");
	var imgLen=img.length;
	var num=1;
	var i=0;
	var circles=$(".circles_box span");
	// 图片轮播
	function change(){
		$(img[i]).css({"display":"none"});
		$(img[num]).css({"display":"block"});
		$(circles[num]).addClass("cir_a");
		$(circles[i]).removeClass("cir_a");
		i=num;
		num++;
		if(num==imgLen){num=0;}
		tim=setTimeout(change,2000);
	};	
	change();
	$(img).hover(function(){clearTimeout(tim)},function(){var tim=setTimeout(change,2000)});
		 $(circles).hover(
		 	function(){
				index=Number($(this).index());
				$(img[i]).css({display:"none"});
				$(img[index]).css({display:"block"});
				$(circles[index]).addClass("cir_a");
				$(circles[i]).removeClass("cir_a");
				clearTimeout(tim);
				i=idex;
				num=idex+1;
				if(num==imgLen){num=0};
			},
			function(){var tim=setTimeout(change,2000)})
})