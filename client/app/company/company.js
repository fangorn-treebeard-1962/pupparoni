'use strict';

angular.module('pupparoniApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('company.support', {
        url: 'support',
        templateUrl: 'app/company/support/company/support.html',
        controller: 'CompanySupportCtrl'
      })
      .state('company.info', {
        url: 'info',
        templateUrl: 'app/company/info/company/info.html',
        controller: 'CompanyInfoCtrl'
      })
      .state('company.contact', {
        url: 'contact',
        templateUrl: 'app/company/contact/company/contact.html',
        controller: 'CompanyContactCtrl'
      })
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
