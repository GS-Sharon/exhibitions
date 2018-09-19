/**
 * Created by asus-pc on 2017/8/9.
 */
(function(angular) {
	'use strict';
	var http = angular.module("moviecat.services.http",[]);
	http.service('HttpService',["$window",function($window) {
		this.jsonp = function(url,data,callback) {
			//挂载回调函数：将回调函数暴露在全局中
			var cbFun = "my_json_cb_" + Math.random().toString().replace(".","");
			$window[cbFun] = callback;
			//判断传进来的url有没有带？，如果没有就添加上，如果有，就添加&，&&的效果是一样的
			var querystr = url.indexOf("?")==-1 ? '?' : "&";
			for( var key in data) {
				querystr += key + "=" + data[key] + "&";
			}
			//添加回调函数
			querystr += "callback=" + cbFun;
			//防止回调函数的名字重复，所以随机生成
			var script = document.createElement("script");
			script.src = url + querystr;
			document.body.appendChild(script);

			$window.$jsonp = this.jsonp;
		}
	}])
})(angular);
