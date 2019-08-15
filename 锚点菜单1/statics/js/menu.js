$(function() {
	//左侧菜单
	var h = 0;
	$('.menu-item-1 .sub-title').click(function() {
		var obj = $(this);
		$(this).parent().toggleClass('active collapse');
		$('.menu-item-1').each(function() {
			h += $(this).height();
		})
		//给菜单赋值高度
		$('.sidebar').css({
			"height": h
		});
		h = 0;
		
		$('.menu-item-1').each(function() {
			if(obj.parent().attr("name") != $(this).attr("name")) {
				$(this).removeClass("active");
				$(this).addClass("collapse");
			}
		})
	});
	
	//右上角鼠标悬浮触发下拉
	$('.dropdown-toc').hover(function() {
		$('.dropdown-body').toggle();
	});
	
	//滚动监听
	var leg = $('.maodian').length;
	$(window).scroll(function() {
		$('.imgtc').hide(); //滚动后图片放大隐藏
		var sh = $(window).scrollTop()
		//右上悬浮
		sh > 86 ? $('.anchor-toc').addClass('fixed') : $('.anchor-toc').removeClass('fixed');
		//循环遍历锚点
		for(i = 1; i <= leg; i++) {
			if($("#mao" + i).offset().top-140 <= sh) {
				$('.maodian').removeClass('active');
				$('#mao' + i).addClass("active");
				$('.toc-current').text($('#mao'+i).parent().text());
				$('.dropdown-body ul li').removeClass('active').eq(i-1).addClass('active');
			}
			
		}
		sh < 140?$('.toc-current').text("本页导航"):"";
	});
	
	//右上角点击
	$('.dropdown-body ul li').click(function(){
		var jt = $(this).index();
		$(window).scrollTop($('.maodian').eq(jt).offset().top-140);
	});
	
	//图片放大
	$('img').click(function(){
		var img = $(this).attr('src');
		$('.imgtc').show().find('img').attr('src',img);
	});
	
	$('.imgtc').click(function(){
		$(this).toggle();
	});
});

$(window).scroll(function(event){
　　//$("[class=am-active]").parents(".menu-item-1").addClass("active");
})
