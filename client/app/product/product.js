'use strict';

angular.module('pupparoniApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('product', {
        url: '/product',
        templateUrl: 'app/product/product.html',
        controller: 'ProductCtrl'
      });
  });