'use strict';

angular.module('pupparoniApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cart1', {
        url: '/cart',
        templateUrl: 'app/cart/cart.html',
        controller: 'CartCtrl'
      });
  });
