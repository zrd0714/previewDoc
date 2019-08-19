var isScroll = "0";
var initShowSection = 1;
myList = {
    "name":"菜单",
    "num":14,
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
		{ "id": "40000000", "link": "1", "label": "p4", "parentId":"", "name":"四、视频播放" },
		{ "id": "40100000", "link": "1", "label": "p4-1", "parentId":"40000000", "name":"4.1、播放视频简单例子" },
		{ "id": "50000000", "link": "1", "label": "p5", "parentId":"", "name":"五、图片/文件上传" },
		{ "id": "50100000", "link": "1", "label": "p5-1", "parentId":"50000000", "name":"5.1、图片文件上传简单例子" },
    ]
}

function initMenu() {
	var menuList = myList;
	var menuTemp = '';
	for(var i = 0; i < menuList.num; i++) {
		if(menuList.sites[i].parentId == "") {
			menuTemp += '<li class="menu-item menu-item-1 collapse" name="' + menuList.sites[i].label + '">';
			menuTemp += '	<a class="sub-title" href="javascript:;">' + menuList.sites[i].name + '</a>';
			menuTemp += '</li>';
			$('.menu-group').append(menuTemp);
			menuTemp = '';
		} else {
			for(var j = 0; j < menuList.num; j++) {
				if(menuList.sites[i].parentId == menuList.sites[j].id) {
					if($('[name="' + menuList.sites[j].label + '"]').children('ul').length == 0) {
						menuTemp += ' <ul>';
						menuTemp += ' </ul>';
						$('[name="' + menuList.sites[j].label + '"]').append(menuTemp);
						menuTemp = '';
					}
					
					menuTemp += '		<li class="menu-item menu-item-2">';
					menuTemp += '			<a href="#' + menuList.sites[i].label + '" class="sub-link" name="' + menuList.sites[i].label + '">' + menuList.sites[i].name + '</a>';
					menuTemp += '		</li>';
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
	
	//点击链接打开右侧折叠框
	$('.sub-link').click(function(){
		//console.log($(this).parents(".menu-item-1").attr("name"));
		
		//console.log($(this).attr("name"));
		//$(".am-panel-hd").find([id='am-active']);
		
		$(".am-panel-group").find('[id="' + $(this).attr("name") + '"]').parents("div[id^='business-section']").css("height", "auto");
		$(".am-panel-group").find('[id="' + $(this).attr("name") + '"]').parents("div[id^='business-section']").addClass("am-in");
		$(".am-panel-group").find('[id="' + $(this).attr("name") + '"]').parents("div[id^='business-section']").parent().find("#web-icon").attr("class", "am-icon-angle-down am-fr am-margin-right");
	});
	
	//折叠框icon变形
	$("div[id^='business-section']").on('open.collapse.amui', function() {
		$(this).parent().find("#web-icon").attr("class", "am-icon-angle-down am-fr am-margin-right");
	}).on('close.collapse.amui', function() {
		$(this).parent().find("#web-icon").attr("class", "am-icon-angle-right am-fr am-margin-right");
	});
	
	//折叠框初始化展开/折叠开关设定
	if(initShowSection == 1) {
		$("div[id^='business-section']").addClass("am-in");
	} else {
		$("div[id^='business-section']").removeClass("am-in");
	}
	
	//初期化视频加载
	initVideo();
	
	//初期化附件上传
	initUploadAttach();
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
		$('.main-container').css("margin-left", "230px");
		//延时方式
//		setTimeout(function() {
//			$('.menu-group').show();
//		}, 1000);
		//透明度
		$('.menu-group').css("opacity", "1");
		$(this).html("隐藏 &laquo;");
	} else {
		$('.sidebar-wrapper').css("left", "-200px");
		$('.main-container').css("margin-left", "30px");
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

function initVideo() {
	$(".title_top").text("什么是金融体系");
	var vids = document.getElementById("vids");
	var sskd = $(".controls").width();
	
	var csdz = "statics/video/";
	
	var xzdz = "什么是金融体系.mp4";
	vids.src = csdz + xzdz;
}

function initUploadAttach() {
	//渲染图片
	$('.dropify-fr').dropify({
		//maxFileSize: '1000k',
		disableRemove: true,
		messages: {
			'default': '点击或拖拽文件到这里<br>最佳尺寸：400 * 400',
			'replace': '点击或拖拽文件到这里来替换文件',
			'remove':  '移除文件',
			'error':   '错误',
		},
		error: {
			'fileSize': '文件尺寸超过最大值 ({{ value }}).',
			'minWidth': '文件宽度小于最大值 ({{ value }}px).',
			'maxWidth': '文件宽度大于最大值 ({{ value }}px).',
			'minHeight': '文件高度小于最大值 ({{ value }}px).',
			'maxHeight': '文件高度大于最大值 ({{ value }}px).',
			'imageFormat': '请使用下列图片格式 ({{ value }}).',
			'fileExtension': '请使用下列文件格式 ({{ value }}).'
		},
	});
	
	dropifyRender();
}

function dropifyRender() {
    // Used events
    var drEvent = $('.dropify-event').dropify();

//    drEvent.on('dropify.beforeClear', function(event, element){
//        return confirm("Do you really want to delete \"" + element.filename + "\" ?");
//    });
//
//    drEvent.on('dropify.afterClear', function(event, element){
//        alert('File deleted');
//    });
    
	drEvent.on('dropify.fileReady', function(event, element) {

	});
    
    drEvent.on('dropify.error.fileSize', function(event, element) {
	    alert('文件尺寸超过最大值 (' + $(this).attr('data-max-file-size') + ').');
	});
    
	drEvent.on('dropify.error.minWidth', function(event, element) {
		alert('文件宽度小于最大值 (' + $(this).attr('data-min-width') + 'px).');
	});
	
	drEvent.on('dropify.error.maxWidth', function(event, element) {
		alert('文件宽度大于最大值 (' + $(this).attr('data-max-width') + 'px).');
	});
	
	drEvent.on('dropify.error.minHeight', function(event, element) {
		alert('文件高度小于最大值 (' + $(this).attr('data-min-height') + 'px).');
	});
	
	drEvent.on('dropify.error.maxHeight', function(event, element) {
		alert('文件高度大于最大值 (' + $(this).attr('data-max-height') + 'px).');
	});
	
	drEvent.on('dropify.error.fileExtension', function(event, element) {
		alert('请使用下列文件格式 (' + $(this).attr('data-allowed-file-extensions') + ').');
	});
    
    $(".dropify-wrapper").css('padding', '0px');
    $(".dropify-wrapper").css('border', '0px');
    $(".dropify-infos-inner").css('display', 'none');
    $(".dropify-fr").css('display', 'block');
}