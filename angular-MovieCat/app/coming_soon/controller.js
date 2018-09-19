(function(angular) {
	'use strict';
	angular.module("moviecat.coming_soon",['ngRoute',"moviecat.services.http"])
		.config(["$routeProvider",function($routeProvider) {
			$routeProvider.
				when("/coming_soon/:page?",{
					controller: "Coming_soon",
					templateUrl: "coming_soon/view.html"
				})
		}])
		.controller("Coming_soon",["$scope","HttpService","$routeParams","$route",function($scope,HttpService,$routeParams,$route) {
			//设置每页的条数
			$scope.count = 10;
			//当前的页数
			$scope.page = $routeParams.page;
			if(typeof $scope.page == "undefined") {
				$route.updateParams({page:1});
			}
			//设置从第start条开始请求数据
			$scope.start = ($scope.page - 1) * $scope.count;
			//loading
			$scope.loading = true;
			//跨域请求开始
			HttpService.jsonp("https://api.douban.com/v2/movie/coming_soon",{start:$scope.start,count:$scope.count},function(data) {
				$scope.data = data;
				//即将上映标题
				$scope.title = $scope.data.title;
				//即将上映的页数
				$scope.pagecount = Math.ceil($scope.data.total / $scope.count);
				//上一页和下一页的功能实现
				$scope.go = function(page) {
					if(page >= 1 && page <= $scope.data.count) {
						$route.updateParams({page: page});
					}
				};
				$scope.loading = false;
				$scope.$apply();
			})
		}])
})(angular);
