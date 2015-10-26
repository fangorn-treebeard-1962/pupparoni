'use strict';

angular.module('pupparoniApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('company', {
        url: '/company',
        templateUrl: 'app/company/company.html',
        controller: 'MainCtrl'
      })
      .state('company/contact', {
        url: '/company/contact',
        templateUrl: 'app/company/contact/company/contact.html',
        controller: 'CompanyContactCtrl'
      });
  });
