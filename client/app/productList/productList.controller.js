'use strict';

angular.module('pupparoniApp')
  .controller('ProductListCtrl', function ($scope, $http, socket) {
    $scope.productList = [
      //{'name': 'Nexus S',
      //  'snippet': 'Fast just got faster with Nexus S.'},
      //{'name': 'Motorola XOOM™ with Wi-Fi',
      //  'snippet': 'The Next, Next Generation tablet.'},
      //{'name': 'MOTOROLA XOOM™',
      //  'snippet': 'The Next, Next Generation tablet.'}
    ];

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
