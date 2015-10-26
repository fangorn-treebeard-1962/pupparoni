'use strict';

angular.module('pupparoniApp')
  .controller('ProductsXController',
    ['$scope', 'productsXService', function ($scope, productsXService) {
      $scope.getAllProducts=function(){
        return productsXService.getAll();
      };

      $scope.products=$scope.getAllProducts();
  }])

  .controller('ProductsXDetailsController',
    ['$stateParams', '$state', '$scope', 'productsXService', function ($stateParams, $state, $scope, productsXService) {
      $scope.getProductById=function(id){
        return productsXService.getProductById(id);
      };

      $scope.closeProduct=function(){
        $state.go('allProducts');
      };

      $scope.singleProduct=$scope.getProductById($stateParams.id);

  }]);
