(function(angular){
	'use strict';
	angular.module("movieDetails",["ngRoute","moviecat.services.http"])
		.config(["$routeProvider",function($routeProvider) {
			$routeProvider
				.when('/detail/:id?',{
					controller: "movieDetailsController",
					templateUrl: "movieDetails/view.html"
				});
		}])
		.controller("movieDetailsController",["$scope","HttpService","$routeParams",function($scope,HttpService,$routeParams) {
			$scope.id = $routeParams.id;
			HttpService.jsonp("https://api.douban.com/v2/movie/subject/" + $scope.id,{},function(data) {
				$scope.movie = data;
				$scope.$apply();
				console.log($scope.movie);
			})
		}])
})(angular);
