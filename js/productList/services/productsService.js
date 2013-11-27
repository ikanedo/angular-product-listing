; (function(angular){

  "use strict";

  var appService = angular.module('productList');

  appService.factory('productsService', function($http, $q){
	var deferred = $q.defer();

	    $http.get('assets/data/packs.json').success(function(data){
	      deferred.resolve(data);
	    });

    return {
      get : function(){
		return deferred.promise;
      },
      sortOptions : function(){
      	return [
			{
				value : 'quantity',
				label : 'quantity ascending',
				reverse : false
			},
			{
				value : 'quantity',
				label : 'quantity descending',
				reverse : true
			}
		];
      }
    }
  });
  
})(angular);

