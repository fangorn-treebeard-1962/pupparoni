'use strict';

angular.module('pupparoniApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('company', {
        url: '/company',
        templateUrl: 'app/company/company.html',
        controller: 'MainCtrl'
      });
  });
