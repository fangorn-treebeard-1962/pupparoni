'use strict';

describe('Controller: ProductListCtrl', function () {

  // load the controller's module
  beforeEach(module('pupparoniApp'));

  var ProductListCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductListCtrl = $controller('ProductListCtrl', {
      $scope: scope
    });
  }));

  it('should create "productList" model with 13 products', function () {

    expect(scope.productList.length).toBe(13);
  });

});
