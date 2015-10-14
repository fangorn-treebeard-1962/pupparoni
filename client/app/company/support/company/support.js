'use strict';

angular.module('pupparoniApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('company/support', {
        url: '/company/support',
        templateUrl: 'app/company/support/company/support.html',
        controller: 'CompanySupportCtrl'
      });
  });