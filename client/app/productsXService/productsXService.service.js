'use strict';

angular.module('pupparoniApp')
  .factory('productsXService', ['$http', function ($http) {
    // Service logic
    // ...

    // Public API here
    return {

      getAll: function() {
        return $http.get('/api/products');
      },

      getProductById: function(id) {
        return $http.get('/api/products/'+id);
      },

      getProductByName: function(name) {
        return $http.get('/api/products/name/'+name);
      }
    };
  }]);
