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
    ['$stateParams', '$state', '$scope', 'productsXService', function ($stateParams, $state, $scope, productsXService) {
      $scope.singleProduct = {quantity:1};

      $scope.getProductById=function(id){
        return productsXService.getProductById(id);
      };

      $scope.closeProduct=function(){
        $state.go('allProducts');
      };

      $scope.addToCart = function(product) {
        console.log("adding to cart" + product.name);

        var order = localStorage.getItem('cart.product');
        var obj = [];
        if (order !== null) {
          obj = JSON.parse(localStorage.getItem(('cart.product')));
        }
        obj.push($scope.singleProduct);
        localStorage.setItem('cart.product', JSON.stringify(obj));

        alert($scope.singleProduct.name + " added to cart.");
      };

      console.log("in ProductsXDetailsController, id is " + $stateParams.id);
      $scope.getProductById($stateParams.id).success(function(product) {
        $scope.singleProduct=product;
        $scope.singleProduct.quantity = 1;
        // to get back: JSON.parse(localStorage.setItem('cart.product'))
      });

  }]);
