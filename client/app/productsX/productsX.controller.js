'use strict';

angular.module('pupparoniApp')
  .controller('ProductsXController',
    ['$scope', 'productsXService', function ($scope, productsXService) {
      $scope.products = [];

      $scope.searchByName = function(name) {
        productsXService.getProductByName(name).success(function(productList) {
          $scope.products = productList;
        });
      };

      $scope.reset = function() {
        $scope.myFilter = '';
        $scope.searchName = '';
        productsXService.getAll().success(function(productList) {
          $scope.products = productList;
        });
      };

      productsXService.getAll().success(function(productList) {
          $scope.products = productList;
        });
    }])

  .controller('ProductsXDetailsController',
    ['$stateParams', '$state', '$scope', 'productsXService', 'cartService',
      function ($stateParams, $state, $scope, productsXService, cartService) {
      $scope.singleProduct = {quantity:1};

      $scope.getProductById=function(id) {
        productsXService.getProductById(id).success(function(product) {
          $scope.singleProduct = product;
          $scope.singleProduct.quantity = 1;
        });
      };

      $scope.closeProduct=function(){
        $state.go('allProducts');
      };

      $scope.addToCart = function(product) {
        console.log("adding to cart" + product.name);

        cartService.addItem(user, cartService);

        alert($scope.singleProduct.name + " added to cart.");
      };

      console.log("in ProductsXDetailsController, id is " + $stateParams.id);
      $scope.getProductById($stateParams.id);
      // to get back: JSON.parse(localStorage.setItem('cart.product'))

  }]);
