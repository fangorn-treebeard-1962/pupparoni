'use strict';

angular.module('pupparoniApp')
  .controller('ProductCtrl', function ($scope, $http, socket) {
    $scope.product = '';
    
    $http.get('/api/product/:id').success(function(product) {
      $scope.product = product;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

  });
