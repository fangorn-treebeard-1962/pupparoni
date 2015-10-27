'use strict';

angular.module('pupparoniApp')
  .controller('ProductsXController',
    ['$scope', '$http', 'productsXService', function ($scope, $http, productsXService) {
      $scope.products = [];

      $scope.searchByName = function(name) {
        productsXService.getProductByName(name).success(function(productList) {
          $scope.products = productList;
        });
      };

      productsXService.getAll().success(function(productList) {
          $scope.products = productList;
        });
    }])

  .controller('ProductsXDetailsController',
    ['$stateParams', '$state', '$scope', 'productsXService', function ($stateParams, $state, $scope, productsXService) {
      $scope.singleProduct = {};

      $scope.getProductById=function(id){
        return productsXService.getProductById(id);
      };

      $scope.closeProduct=function(){
        $state.go('allProducts');
      };

      console.log("in ProductsXDetailsController, id is " + $stateParams.id);
      $scope.getProductById($stateParams.id).success(function(product) {
        $scope.singleProduct=product;
      });

  }]);
