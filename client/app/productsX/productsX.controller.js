'use strict';

angular.module('pupparoniApp')
  .controller('ProductsXController',
    ['$scope', '$http', 'productsXService', function ($scope, $http, productsXService) {
      $scope.products = [];

      $http.get('/api/products').success(function(productList) {
        $scope.products = productList;
        //socket.syncUpdates('products', $scope.products);
      });

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
