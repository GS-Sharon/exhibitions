/**
 * Created by asus-pc on 2017/8/10.
 */
(function(angular) {
	'use strict';
	angular.module("movieList",['ngRoute',"moviecat.services.http"])
		.config(["$routeProvider",function($routeProvider) {
			$routeProvider
				.when("/:category/:page?",{
					controller: "movieController",
					templateUrl: "movieList/view.html"
				})
		}])
		.controller("movieController",["$scope","HttpService","$routeParams","$route",function($scope,HttpService,$routeParams,$route) {
			//获取当前的页数
			$scope.page = $routeParams.page;
			//设置一页有cont条
			$scope.count = 10;
			//设置请求从第start条开始
			$scope.start = ($scope.page - 1) * $scope.count;
			//设置loading
			$scope.loading = true;
			//跨域开始
			HttpService.jsonp("https://api.douban.com/v2/movie/"+ $routeParams.category,{start:$scope.start,count:$scope.count,q:$routeParams.q},function(data) {
				$scope.data = data;
				//标题
				$scope.title = $scope.data.title;
				//页数
				$scope.pagecount = Math.ceil($scope.data.total / $scope.count);
				//实现上一页和下一页的功能
				$scope.go = function(page) {
					if(page >= 1 && page <= $scope.pagecount) {
						$route.updateParams({page:page});
					}
				};
				$scope.loading = false;
				//同步数据
				$scope.$apply();
			})
		}])

})(angular);
