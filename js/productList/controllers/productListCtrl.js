; (function(angular){
  
  	"use strict";

	var appController = angular.module('productList');

	appController.controller('ProductListCtrl', function ($scope, productsService){
		
		$scope.sortOptions = productsService.sortOptions();
		$scope.sortBy = null;

		productsService.get().then(function(d){
			$scope.products = d.packs;
		});
		

	});
})(angular);