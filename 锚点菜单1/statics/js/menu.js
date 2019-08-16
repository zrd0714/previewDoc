var isScroll = "0";

$(function() {
	var dateStr = new Date().Format("yyyy-MM-dd HH:mm:ss");
	$('.show-time').html(dateStr);
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
	//alert(isScroll);
　　//$("[class=am-active]").parents(".menu-item-1").addClass("active");
});

//滚动滑轮更新左侧菜单
var scrollFunc = function (e) {
	e = e || window.event;
	if (e.wheelDelta) {
		if (e.wheelDelta != 0) {
			$("[class='sub-link am-active']").parents(".menu-item-1").addClass("active");
			$('.menu-item-1').each(function() {
				if($("[class='sub-link am-active']").parents(".menu-item-1").attr("name") != $(this).attr("name")) {
					$(this).removeClass("active");
					$(this).addClass("collapse");
				}
			});
		}
	} else if (e.detail) {
		if (e.detail != 0) {
			$("[class='sub-link am-active']").parents(".menu-item-1").addClass("active");
			$('.menu-item-1').each(function() {
				if($("[class='sub-link am-active']").parents(".menu-item-1").attr("name") != $(this).attr("name")) {
					$(this).removeClass("active");
					$(this).addClass("collapse");
				}
			});
		} 
	}
}  

//给页面绑定滑轮滚动事件  
if (document.addEventListener) {  
	document.addEventListener('DOMMouseScroll', scrollFunc, false);  
}  

//滚动滑轮触发scrollFunc方法  
window.onmousewheel = document.onmousewheel = scrollFunc;

//点击隐藏
$('.menu-top').click(function() {
	$(this).toggleClass('active collapse');
	if($(this).hasClass('active')) {
		$('.sidebar-wrapper').css("left", "0px");
		$('.main-container').css("left", "0px");
		//延时方式
//		setTimeout(function() {
//			$('.menu-group').show();
//		}, 1000);
		//透明度
		$('.menu-group').css("opacity", "1");
		$(this).html("隐藏 &laquo;");
	} else {
		$('.sidebar-wrapper').css("left", "-200px");
		$('.main-container').css("left", "-200px");
		//延时方式
//		setTimeout(function() {
//			$('.menu-group').hide();
//		}, 1000);
		//透明度
		$('.menu-group').css("opacity", "0");
		$(this).html("显示 &raquo;");
	}
});

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}