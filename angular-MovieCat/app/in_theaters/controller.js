(function(angular) {
	'use strict';
	angular.module("moviecat.in_theaters",['ngRoute',"moviecat.services.http"])
		.config(["$routeProvider",function($routeProvider) {
			$routeProvider.
				when("/in_theaters/:page?",{
					controller: "InTheatersController",
					templateUrl: "in_theaters/view.html"
				})
		}]).
		controller("InTheatersController",["$scope","HttpService","$routeParams","$route",function($scope,HttpService,$routeParams,$route) {
			$scope.loading = true;
			$scope.title = "正在热映";
			//当前页
			$scope.page = $routeParams.page;
			//每页的电影条数：
			$scope.count = 10;
			//请求第start条开始：
			$scope.start = $scope.count * ($scope.page - 1);
			//$http服务
			//从第$scope.start条开始请求，总共请求$scope.count条
			HttpService.jsonp('https://api.douban.com/v2/movie/in_theaters',{start:$scope.start,count:$scope.count},function(data){
				$scope.data = data;
				//计算有多少页
				$scope.pageCount = Math.ceil($scope.data.total / $scope.count);
				//加载完成
				$scope.loading = false;
				$scope.$apply();
			});

			//上一页和下一页的行为
			$scope.go = function(page) {
				if($scope.page >= 1 && $scope.page <= $scope.pageCount ) {
					$route.updateParams({page:page});
				}else if(typeof  $scope.page == "undefined") {
					//如果url没有页数结尾的时候
					$route.updateParams({page: 1});
				}
			}
		}])
})(angular);
