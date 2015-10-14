'use strict';

angular.module('pupparoniApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('company/info', {
        url: '/company/info',
        templateUrl: 'app/company/info/company/info.html',
        controller: 'CompanyInfoCtrl'
      });
  });