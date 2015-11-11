'use strict';

describe('Controller: ProductsXCtrl', function () {

  // load the controller's module
  beforeEach(module('pupparoniApp'));
  beforeEach(module('ui.router'));
  beforeEach(module('socketMock'));

  var ProductsXCtrl,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {

    scope = $rootScope.$new();
    var mockedProductsXService = {
      getAll: function()  {
        return {
          success: function(cb) {
            cb([{id: 1, name: 'product1'}, {id: 2, name: 'product2'}, {id: 3, name: 'product3'}, {id: 4, name: 'product4'}]);
          }
        };
      },
      getProductById: function(id) {
        return {
          success: function(cb) {
            cb({id: id, name: 'product2'});
          }
        };
      },
      getProductByName: function(name) {
        return {
          success: function(cb) {
            cb([{id: 1, name: name}]);
          }
        };
      }
    };
    ProductsXCtrl = $controller('ProductsXController', { $scope: scope, productsXService: mockedProductsXService});
  }));

  it('should create "products" model with 4 products', function () {
    expect(scope.products.length).toBe(4);
  });

  it('should find reset successfully', function() {
    scope.myFilter = 'dave';
    scope.searchName = 'mike';
    scope.searchByName('butch');
    expect(scope.products.length).toBe(1);
    expect(scope.products[0].name).toBe('butch');

    scope.reset();
    expect(scope.myFilter).toBe('');
    expect(scope.searchName).toBe('');
    expect(scope.products.length).toBe(4);
  });

  it('should find product with name butch', function() {
    scope.searchByName('butch');
    expect(scope.products.length).toBe(1);
    expect(scope.products[0].name).toBe('butch');
  });

});

describe('ProductsXDetailsController Test\n', function(){
  beforeEach(module('pupparoniApp'));
  beforeEach(module('ui.router'));

  var ProductsXDetailsCtrl,
    scope;

    beforeEach(inject(function($controller, $rootScope, $state, $stateParams) {

      scope = $rootScope.$new();
      var mockedProductsXService = {
        getProductById: function(id) {
          return {
            success: function(cb) {
              cb({id: id, name: 'product2'});
            }
          };
        }
      }
        $stateParams.id = 2;
      ProductsXDetailsCtrl = $controller('ProductsXDetailsController', {
        $scope: scope,
        $stateParams: $stateParams,
        $state: $state,
        productsXService: mockedProductsXService
      });
    }));

  it('Should initialize controller with 1 product', function () {
    expect(scope.singleProduct).not.toBe(undefined);
    expect(scope.singleProduct.quantity).toBe(1);
    expect(scope.singleProduct.name).toBe('product2');
  });
});
