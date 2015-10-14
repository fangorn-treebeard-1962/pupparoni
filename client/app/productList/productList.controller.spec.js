'use strict';

describe('Controller: ProductListCtrl', function () {

  // load the controller's module
  beforeEach(module('pupparoniApp'));
  beforeEach(module('socketMock'));

  var ProductListCtrl, 
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/products')
      .respond(['product1', 'product2', 'product3', 'product4']);

    scope = $rootScope.$new();
    ProductListCtrl = $controller('ProductListCtrl', {
      $scope: scope
    });
  }));

  it('should create "productList" model with 4 products', function () {
    $httpBackend.flush();
   expect(scope.productList.length).toBe(4);
  });

});
