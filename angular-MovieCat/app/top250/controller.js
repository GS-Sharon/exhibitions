(function(angular) {
	'use strict';
	angular.module("moviecat.top_250",['ngRoute'])
		.config(["$routeProvider",function($routeProvider) {
			$routeProvider.
				when("/top250",{
					controller: "Top250Controller",
					templateUrl: "top250/view.html"
				})
		}])
		.controller("Top250Controller",["$scope",function($scope) {
			$scope.title = "top250";
		}])
})(angular);
