(function(angular) {
	'use strict';

// Declare app level module which depends on views, and components
	angular.module('moviecat', [
		'ngRoute',
		'movieList'
	]).
		config(['$routeProvider', function($routeProvider) {
			$routeProvider.otherwise({redirectTo: '/in_theaters/1'});
		}])
		.controller("NavController",['$scope','$location',function($scope,$location) {
			$scope.loc = $location;
			if($scope.loc.path().startsWith("/in_theaters")) {
				$scope.type = "in_theaters";
			}else if($scope.loc.path().startsWith("/coming_soon")) {
				$scope.type = "coming_soon";
			}else if($scope.loc.path().startsWith("/top250")) {
				$scope.type = "top250";
			}
			$scope.$watch("loc.path()",function(now,old) {
				if(now.startsWith("/in_theaters")) {
					$scope.type = "in_theaters";
				}else if(now.startsWith("/coming_soon")) {
					$scope.type = "coming_soon";
				}else if(now.startsWith("/top250")) {
					$scope.type = "top250";
				}
			})
		}])
})(angular);

