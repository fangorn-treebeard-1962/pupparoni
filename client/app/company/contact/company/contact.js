'use strict';

angular.module('pupparoniApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('company/contact1', {
        url: '/company/contact1',
        templateUrl: 'app/company/contact/company/contact.html',
        controller: 'CompanyContactCtrl'
      });
  });
