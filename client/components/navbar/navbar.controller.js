'use strict';

angular.module('pupparoniApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/',
      'type': 'menuItem'
    }, {
      'title': 'ProductsX',
      'link': '/productsX',
      'type': 'menuItem'
    }, {
      'title': 'Products',
      'link': '/productList',
      'type': 'menuItem'
    }, {
      'title': 'Company',
      'link': '/company',
      'type': 'dropdown',
      'menu': [{
        'title': 'Contact Info',
        'link': '/company/contact',
        'type': 'menuItem'
        }, {
          'title': 'Support',
          'link': '/company/support',
          'type': 'menuItem'
        }, {
          'title': 'Info',
          'link': '/company/info',
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
    }

    $scope.isSubMenu = function(item) {
      return item.type == 'dropdown';
    }
  });
