'use strict';

angular.module('pupparoniApp')
  .controller('ProductListCtrl', function ($scope, $http, socket) {
    $scope.productList = [];

    $http.get('/api/products').success(function(productList) {
      $scope.productList = productList;
      socket.syncUpdates('product', $scope.productList);
    });

    $scope.addProduct = function() {
      if($scope.newProduct === '') {
        return;
      }
      $http.post('/api/products', { name: $scope.newProduct });
      $scope.newProduct = '';
    };

    $scope.deleteProduct = function(product) {
      $http.delete('/api/products/' + product._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('product');
    });
  });
