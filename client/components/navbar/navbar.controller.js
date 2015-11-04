'use strict';

angular.module('pupparoniApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/',
      'type': 'menuItem'
    }, {
      'title': 'Products',
      'link': '/productsX',
      'type': 'menuItem'
    }, {
      'title': 'Company',
      'link': '/company',
      'type': 'dropdown',
      'menu': [{
        'title': 'Contact Info',
        'link': '/companycontact',
        'type': 'menuItem'
        }, {
          'title': 'Support',
          'link': '/companysupport',
          'type': 'menuItem'
        }, {
          'title': 'Info',
          'link': '/companyinfo',
          'type': 'menuItem'
        }]
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.isMenuItem = function(item) {
      return item.type == 'menuItem';
    };

    $scope.isSubMenu = function(item) {
      return item.type == 'dropdown';
    }
  });
