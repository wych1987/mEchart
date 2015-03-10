
// Initialize your app
var myApp = new Framework7({
		swipePanel: 'left'
	});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
		// Because we use fixed-through navbar we can enable dynamic navbar
		dynamicNavbar : true

	});
myApp.onPageInit('list', function (page) {
	$$("#listBox").on("click", function (e) {
		//
		var elem = e.target;
		if (elem.nodeName.toLowerCase() !== "li") {
			elem = $$(elem).parents("li");
		}
		if (elem.length) {
			var product = elem.attr("data-product");
			var itemName = elem.attr("data-item");
			var data = listObj.allData[product][itemName];
			myChart.rightPanel.data = data;
			myChart.rightPanel.create(data);
			//设置默认的参数
			myChart.selectData={product:product,data:data.item[0]};
			mainView.router.loadContent(myChart.html);
		}
	})

});

// Callbacks to run specific code for specific pages, for example for About page:
//myApp.onPageAfterAnimation('myChart', function (page) {
myApp.onPageInit('myChart', function (page) {
	// run createContentPage func after link was clicked
	//  myApp.alert("我的详情页");
	myChart.init();
	myChart.getData();
});

$$("#goPC").on("click",function(){
	location.href="/mis/index";
});
$$('#loginForm').on('submit', function (e) {
	//验证用户名密码是否为空
	var r = loginObj.test();
	//loading 列表页
	if (r) {
		myApp.showPreloader();
		//ajax
		var p = {
			user : loginObj.userName.val(),
			password : loginObj.pwd.val()
		}
		loginObj.login({
			errno : 0
		});
		/*  $$.post("/mis/login/userlogin",p,function(serverData){

		},"json");
		 */
		return false;
	}
});
var loginObj = {};
loginObj.logined = false;
loginObj.configName = { //配置某些人跳转到新版页面
	bi_111 : 1
};
loginObj.userName = $$("#userName");
loginObj.pwd = $$("#pwd");
loginObj.init = function () {
	if (loginObj.logined) {
		mainView.router.loadContent(listObj.html);
	}
	if (window.localStorage && window.localStorage.getItem) {
		var userName = localStorage.getItem('m_bi_userName');
		if (userName) {
			loginObj.userName.val(userName);
		}
	}
}
loginObj.test = function () {
	//验证用户名密码
	if (loginObj.userName.val() === "") {
		myApp.alert(" ", "用户名不能为空");
		return false;
	}
	if (loginObj.pwd.val() === "") {
		myApp.alert(" ", "密码不能为空");
		return false;
	}
	if (window.localStorage && window.localStorage.setItem) {
		localStorage.setItem("m_bi_userName", loginObj.userName.val());
	}
	return true;
}
loginObj.login = function (serverData) {
	myApp.hidePreloader();
	if (serverData.errno == 0) {
		//登录成功
		if (loginObj.configName[loginObj.userName.val()]) {
			loginObj.logined = true;
			mainView.router.loadContent(listObj.html);
		} else {
			location.href = "/mis/index";
		}
	} else if (severData.errno == 2) {
		location.href = "/mis/login/changepassword";
	} else {
		myApp.alert("", "登录失败，稍后再试");
	}
}

//list.html
var listObj = listObj || {};
listObj.tplStr = '<!-- List View -->' +
	'<div class="navbar ">' +
	'<div class="navbar-inner">' +
	'<!-- We have home navbar without left link-->' +
	'<div class="left"><a href="#" data-panel="left" class="open-panel">更多</a></p></div>'+
	'<div class="center sliding title01">业务监控列表</div>' +
	'</div>' +
	'</div>' +
	'<div class="pages">' +
	'<!-- Page, data-page contains page name-->' +
	'<div data-page="list" class="page">' +
	'<!-- Scrollable page content-->' +
	'<div class="page-content">' +
	'<div class="content-block product-list-box" id="listBox">' +
	'{{#each this}}' +
	'<div class="content-block-title">{{product_name}}</div>' +
	'<div class="list-block">' +
	'<ul>' +
	'{{#each item}}' +
	'<li data-item="{{value}}" data-product="{{product_name}}" data-name="{{name}}"><div  class="item-link" > ' +
	'<div class="item-content">' +
	'<div class="item-inner">' +
	'<div class="item-title" >{{name}}</div>' +
	'</div>' +
	'</div>' +
	'</div>' +
	'</li>' +
	'{{/each}}' +
	'</ul>' +
	'</div>' +
	'{{/each}}' +
	'</div>' +
	'</div>' +
	'</div>' +
	'</div>';
listObj.tplFunc = Template7.compile(listObj.tplStr);
listObj.data = [{
		product_name : "出租车业务",
		item : [{
				value : 0,
				name : "实时订单",
				item : [{
						id : "taxi_real_order_succrate",
						name : "实时订单呼叫量"
					}, {
						id : "taxi_real_order_succrate",
						name : "实时订单成交量"
					}, {
						id : "taxi_real_order_succrate",
						name : "实时订单成交率"
					}, {
						id : "taxi_real_order_succrate",
						name : "司机在线"
					}, {
						id : "taxi_real_order_succrate",
						name : "实时平台奖励订单量"
					}, {
						id : "taxi_real_order_succrate",
						name : "实时平台奖励金额"
					}
				]
			}, {
				value : 1,
				name : "预约订单",
				item : [{
						id : "taxi_real_order_succrate",
						name : "1实时订单呼叫量"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时订单成交量"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时订单成交率"
					}, {
						id : "taxi_real_order_succrate",
						name : "1司机在线"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时平台奖励订单量"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时平台奖励金额"
					}
				]
			}, {
				value : 2,
				name : "滴米及平台奖励",
				item : [{
						id : "taxi_real_order_succrate",
						name : "2实时订单呼叫量"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时订单成交量"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时订单成交率"
					}, {
						id : "taxi_real_order_succrate",
						name : "1司机在线"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时平台奖励订单量"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时平台奖励金额"
					}
				]
			}, {
				value : 3,
				name : "策略播单数量监控",
				item : [{
						id : "taxi_real_order_succrate",
						name : "3实时订单呼叫量"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时订单成交量"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时订单成交率"
					}, {
						id : "taxi_real_order_succrate",
						name : "1司机在线"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时平台奖励订单量"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时平台奖励金额"
					}
				]
			}, {
				value : 4,
				name : "乘客",
				item : [{
						id : "taxi_real_order_succrate",
						name : "4实时订单呼叫量"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时订单成交量"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时订单成交率"
					}, {
						id : "taxi_real_order_succrate",
						name : "1司机在线"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时平台奖励订单量"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时平台奖励金额"
					}
				]
			}
		]
	}, {
		product_name : "专车业务",
		item : [{
				value : 0,
				name : "实时订单",
				item : [{
						id : "taxi_real_order_succrate",
						name : "1实时订单呼叫量专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时订单成交量专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时订单成交率专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1司机在线专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时平台奖励订单量专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时平台奖励金额专车"
					}
				]
			}, {
				value : 1,
				name : "预约订单",
				item : [{
						id : "taxi_real_order_succrate",
						name : "2实时订单呼叫量专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时订单成交量专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时订单成交率专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1司机在线专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时平台奖励订单量专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时平台奖励金额专车"
					}
				]
			}, {
				value : 2,
				name : "司机在线",
				item : [{
						id : "taxi_real_order_succrate",
						name : "3实时订单呼叫量专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时订单成交量专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时订单成交率专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1司机在线专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时平台奖励订单量专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时平台奖励金额专车"
					}
				]
			}, {
				value : 3,
				name : "微信提现",
				item : [{
						id : "taxi_real_order_succrate",
						name : "4实时订单呼叫量专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时订单成交量专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时订单成交率专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1司机在线专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时平台奖励订单量专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时平台奖励金额专车"
					}
				]
			}, {
				value : 4,
				name : "司机奖励",
				item : [{
						id : "taxi_real_order_succrate",
						name : "5实时订单呼叫量专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时订单成交量专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时订单成交率专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1司机在线专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时平台奖励订单量专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时平台奖励金额专车"
					}
				]
			}, {
				value : 5,
				name : "超级任务",
				item : [{
						id : "taxi_real_order_succrate",
						name : "6实时订单呼叫量专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时订单成交量专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时订单成交率专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1司机在线专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时平台奖励订单量专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时平台奖励金额专车"
					}
				]
			}, {
				value : 6,
				name : "微信免密",
				item : [{
						id : "taxi_real_order_succrate",
						name : "7实时订单呼叫量专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时订单成交量专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时订单成交率专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1司机在线专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时平台奖励订单量专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时平台奖励金额专车"
					}
				]
			}, {
				value : 7,
				name : "微信支付",
				item : [{
						id : "taxi_real_order_succrate",
						name : "8实时订单呼叫量专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时订单成交量专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时订单成交率专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1司机在线专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时平台奖励订单量专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时平台奖励金额专车"
					}
				]
			}, {
				value : 8,
				name : "分享系统",
				item : [{
						id : "taxi_real_order_succrate",
						name : "9实时订单呼叫量专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时订单成交量专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时订单成交率专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1司机在线专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时平台奖励订单量专车"
					}, {
						id : "taxi_real_order_succrate",
						name : "1实时平台奖励金额专车"
					}
				]
			}
		]
	}
];
listObj.formatData = function (data) {
	var d = {};
	for (var i = 0; i < data.length; i++) {
		var n = data[i].product_name;
		d[n] = {};
		for (var m = 0; m < data[i].item.length; m++) {
			var k = data[i].item[m];
			k.product_name = n;
			d[n][k.value] = k;
		}
	}
	return d;
}
listObj.allData = listObj.formatData(listObj.data);
listObj.html = listObj.tplFunc(listObj.data);

//detail页面，echart
var myChart = {};
myChart.html = '<div class="navbar">' +
	'<div class="navbar-inner">' +
	'<div class="left"><a href="#" class="back link"> <i class="icon icon-back"></i><span>Back</span></a></div>' +
	'<div class="center sliding" id="titleName"></div>' +
	'<div class="right open-right-panel">' +
	'<!-- Right link contains only icon - additional "icon-only" class--><a href="#" class="link icon-only open-panel" data-panel="right"> <i class="icon icon-bars"></i></a>' +
	'</div>' +
	'</div>' +
	'</div>' +
	'<div class="pages">' +
	'<!-- Page, data-page contains page name-->' +
	'<div data-page="myChart" class="page">' +
	'<!-- Scrollable page content-->' +
	'<div class="page-content pull-to-refresh-content" data-ptr-distance="55">' +
	'<div class="pull-to-refresh-layer">'+
      '<div class="preloader"></div>'+
     ' <div class="pull-to-refresh-arrow"></div>'+
    '</div>'+
	'<div class="content-block rel"><p id="pInfo"></p>' +
	'<div class="content-block-inner">' +
	'<div class="echart-box" id="myEchart"></div>' +
	'</div>' +
	'</div>' +
	'</div>' +
	'</div>' +
	'</div>';
myChart.init = function () {
	//先获取数据.
	var echartDom = document.getElementById('myEchart');
	var jWin = $$(window);
	var h = jWin.height();
	var w = jWin.width();
	var titleDom = document.getElementById("titleName");
	//titleDom.innerHTML="司机在线";
	myChart.titleDom = titleDom;
	myChart.h = h;
	myChart.w = w;
	myChart.echartDom = echartDom;
	myChart.pInfo = document.getElementById("pInfo");
	echartDom.style.cssText = "width:" + w + "px;height:" + h + "px;";
	var rote = h > w ? 1 : 0;
	if (rote) {
		echartDom.style.cssText = "width:" + h + "px;height:" + w + "px;";
		echartDom.classList.add("chart-rota");
	} else {
		echartDom.classList.remove("chart-rota");
	}
}
myChart.create = function (p) {
	require(
		[
			'echarts',
			'echarts/chart/line'
		], function (echarts) {

		var ec = myChart.ec || echarts.init(myChart.echartDom);
		myChart.pInfo.innerHTML = p.pInfo;
		var option = {
			color : ['#34A637', '#6F91D0', '#F97370', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
			tooltip : {
				show : true
			},
			legend : {
				data : [myChart.date.today, myChart.date.date2, myChart.date.date3]
			},
			xAxis : [{
					type : 'category',
					data : myChart.xAxis
				}
			],
			yAxis : [{
					type : 'value'
				}
			],
			series : p.series
		};
		// 为echarts对象加载数据
		ec.setOption(option);
		window.onresize = ec.resize;

		ec.resize();
		myChart.eChart = ec;
	});

};
myChart.rightPanel = {};
myChart.rightPanel.dom = $$("#panelMonitor");
myChart.rightPanel.tplStr = ' <div class="content-block-title">{{name}}</div><div class="list-block" >' +
	'<ul>' +
	'{{#each item}}' +
	'<li class="item-content" data-id="{{id}}" data-name="{{name}}">' +
	'<div class="item-inner">' +
	'<div class="item-title">{{name}}</div>' +
	'</div>' +
	'</li>' +
	'{{/each}}' +
	'</ul></div>';
myChart.rightPanel.tplFunc = Template7.compile(myChart.rightPanel.tplStr);
myChart.rightPanel.create = function (data) {
	myChart.rightPanel.dom.html(myChart.rightPanel.tplFunc(data));
}
myChart.rightPanel.dom.on("click", function (e) {
	var elem = e.target;
	if (elem.nodeName.toLowerCase() !== "li") {
		elem = $$(elem).parents("li");
	}
	if (elem.length) {
		var name = elem.attr("data-name");
		var id = elem.attr("data-id");
		myChart.getData({
			id : id,
			name : name
		});
		myApp.closePanel('right');
	}
});
myChart.getData = function (p) {
		p = p||myChart.selectData.data;
		myChart.titleDom.innerHTML =myChart.selectData.product+p.name;
		myChart.selectData.data={id:p.id,name:p.name};
	//ajax
	//$$.get(url,p,function(serverData){},"json");
	//格式化数据
	
	var data = serverData.data;
	var d1 = myChart.date.today;
	var d2 = myChart.date.date2;
	var d3 = myChart.date.date3;
	var todayData = {
		"name" : d1,
		"type" : "line",
		"data" : []
	};
	var data2 = {
		"name" : d2,
		"type" : "line",
		"data" : []
	};
	var data3 = {
		"name" : d3,
		"type" : "line",
		"data" : []
	};

	for (var m = 0; m < myChart.xAxis.length; m++) {
		var k = myChart.xAxis[m];
		if (data[d1].seq[k]) {
			todayData.data.push(data[d1].seq[k]);
		}
		data2.data.push(data[d2].seq[k] || 0);
		data3.data.push(data[d3].seq[k] || 0);
	}
	var curr = data[d1].curr || "无";
	var time = data[d1].time || "无";
	var max = data[d1].max || "无";
	var min = data[d1].min || "无";
	var sum = data[d1].sum || "无";
	var avg = data[d1].avg || "无";

	var pInfo = '当前：' + curr + ';下载时间：' + time + '；最高值：' + max + '；最低值：' + min + '；累计值：' + sum + '；平均值：' + avg;
	var series = [todayData, data2, data3];
	myChart.create({
		series : series,
		pInfo : pInfo
	});
}
myChart.getDateByTime = function (time, day) {
	var dayTime = 1000 * 60 * 60 * 24;
	var t = time + day * dayTime;
	var d = new Date();
	d.setTime(t);
	var y = d.getFullYear();
	var m = d.getMonth() + 1;
	var day = d.getDate();
	return y + "-" + m + "-" + day;
}
myChart.date = (function () {
	/*var date3 = ""; //环比 1 天前
	var date2 = ""; //同比 7天前
	var today = ""; //今天
	var time = new Date().getTime();
	date3 = myChart.getDateByTime(time, -1);
	date2 = myChart.getDateByTime(time, -7);
	today = myChart.getDateByTime(time, 0);
	return {
		today : today,
		date2 : date2,
		date3 : date3
	};
	*/
	return {
		today : "2014-6-9",
		date2 : "2014-6-2",
		date3 : "2014-6-8"
	};
})();
myChart.xAxis = (function () {
	var a = [];
	var min = 0; //一分钟一个数据
	var hour = 0;
	for (var i = 0; i < 24; i++) {
		var h = i < 10 ? "0" + i : i;
		for (var n = 0; n < 60; n++) {
			var m = n < 10 ? "0" + n : n;
			a.push(h + ":" + m + ":00");
		}
	}
	return a;
})();
(function () {
	//初始化方法
	loginObj.init();
})();
$$(document).on('refresh', '.pull-to-refresh-content', function (e) { 
  //下拉更新echart的数据
	myChart.getData();
	myApp.pullToRefreshDone();
});