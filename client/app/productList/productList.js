'use strict';

angular.module('pupparoniApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('productList', {
        url: '/productList',
        templateUrl: 'app/productList/productList.html',
        controller: 'ProductListCtrl'
      });
  });