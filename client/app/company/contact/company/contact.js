'use strict';

angular.module('pupparoniApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('company/contact', {
        url: '/company/contact',
        templateUrl: 'app/company/contact/company/contact.html',
        controller: 'CompanyContactCtrl'
      });
  });