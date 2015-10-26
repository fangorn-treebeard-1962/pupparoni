'use strict';

angular.module('pupparoniApp')
  .config(function ($stateProvider) {
  $stateProvider
    .state('allProducts', {
      url: '/productsX',
      templateUrl: 'app/productsX/list.html',
      controller: 'ProductsXController'
    })
    .state('productDetail', {
      url: '/productsX/:id/:permalink',
      templateUrl: 'app/productsX/detail.html',
      controller: 'ProductsXDetailsController'
    });
});
