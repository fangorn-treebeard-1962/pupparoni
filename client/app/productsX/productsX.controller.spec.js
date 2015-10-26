'use strict';

describe('Controller: ProductsXCtrl', function () {

  // load the controller's module
  beforeEach(module('pupparoniApp'));
  beforeEach(module('ui.router'));
  beforeEach(module('socketMock'));

  var ProductsXCtrl,
      scope,
      $httpBackend,
      productsXService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, _productsXService_) {
    productsXService = _productsXService_;
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/products')
      .respond(['product1', 'product2', 'product3', 'product4']);

    scope = $rootScope.$new();
    ProductsXCtrl = $controller('ProductsXController', { $scope: scope });
  }));

  it('should create "products" model with 4 products', function () {
    $httpBackend.flush();
    expect(scope.products.length).toBe(4);
  });

});

describe('ProductsXDetailsController Test\n', function(){
  beforeEach(module('pupparoniApp'));
  beforeEach(module('ui.router'));
  beforeEach(module('socketMock'));

  var ProductsXDetailsCtrl,
    scope,
    $httpBackend,
    productsXService;


    beforeEach(inject(function(_$httpBackend_, $controller, $rootScope, $state, $stateParams, _productsXService_) {

      productsXService = _productsXService_;
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/api/products')
        .respond(['product1', 'product2', 'product3', 'product4']);

      scope = $rootScope.$new();
      $stateParams.id = 2;
      ProductsXDetailsCtrl = $controller('ProductsXDetailsController', {
        $scope: scope,
        $stateParams: $stateParams,
        $state: $state,
        productsXService: _productsXService_
      });
    }));

  it('Should initialize controller with 1 post', function () {
    $httpBackend.flush();
    expect($scope.singlePost).not.toBe(undefined);
  });
});
