var isScroll = "0";
myList = {
    "name":"菜单",
    "num":10,
    "sites": [
        { "id": "10000000", "link": "1", "label": "p1", "parentId":"", "name":"一、综合安全管理单元" },
        { "id": "10100000", "link": "1", "label": "p1-1", "parentId":"10000000", "name":"1.1、安全生产管理机构人员" },
		{ "id": "10200000", "link": "1", "label": "p1-2", "parentId":"10000000", "name":"1.2、特种作业人员" },
		{ "id": "10300000", "link": "1", "label": "p1-3", "parentId":"10000000", "name":"1.3、安全生产管理制度" },
		{ "id": "10400000", "link": "1", "label": "p1-4", "parentId":"10000000", "name":"1.4、安全生产资金投入" },
		{ "id": "10500000", "link": "1", "label": "p1-5", "parentId":"10000000", "name":"1.5、教育培训" },
		{ "id": "20000000", "link": "1", "label": "p2", "parentId":"", "name":"二、周边环境" },
		{ "id": "30000000", "link": "1", "label": "p3", "parentId":"", "name":"三、生产工艺及设备" },
		{ "id": "30100000", "link": "1", "label": "p3-1", "parentId":"30000000", "name":"3.1、燃煤输送设备及系统" },
		{ "id": "30200000", "link": "1", "label": "p3-2", "parentId":"30000000", "name":"3.2、锅炉" },
    ]
}

function initMenu() {
	var menuList = myList;
	var menuTemp = '';
	for(var i = 0; i < menuList.num; i++) {
		if(menuList.sites[i].parentId == "") {
			console.log(menuList.sites[i].name);
			menuTemp += '<li class="menu-item menu-item-1 collapse" name="' + menuList.sites[i].label + '">';
			menuTemp += '	<a class="sub-title" href="javascript:;">' + menuList.sites[i].name + '</a>';
			menuTemp += '</li>';
			$('.menu-group').append(menuTemp);
			menuTemp = '';
		} else {
			for(var j = 0; j < menuList.num; j++) {
				if(menuList.sites[i].parentId == menuList.sites[j].id) {
					//if($('.' + menuList.sites[j].label).children('ul').length == 0) {
					if($('[name="' + menuList.sites[j].label + '"]').children('ul').length == 0) {
						menuTemp += ' <ul>';
						menuTemp += ' </ul>';
						$('[name="' + menuList.sites[j].label + '"]').append(menuTemp);
						menuTemp = '';
					}
					
					menuTemp += '		<li class="menu-item menu-item-2">';
					menuTemp += '			<a href="#' + menuList.sites[i].label + '" class="sub-link">' + menuList.sites[i].name + '</a>';
					menuTemp += '		</li>';
					//$('.' + menuList.sites[j].label + ' ul').append(menuTemp);
					$('[name="' + menuList.sites[j].label + '"] ul').append(menuTemp);
					menuTemp = '';
				}
			}
		}
	}
}

$(function() {
	initMenu();
	
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