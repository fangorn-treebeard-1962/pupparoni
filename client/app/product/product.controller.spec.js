'use strict';

describe('Controller: ProductCtrl', function () {

  // load the controller's module
  beforeEach(module('pupparoniApp'));
  beforeEach(module('socketMock'));

  var ProductCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expect('GET', /\/api\/product\/(.+)/, undefined, undefined, ['id'])
      .respond({
        name:"Siamese If You Please",
        productId:"0001F",
        category:"Behavior",
        shortDescription:"Lavender based topical anti-stress therapy",
        longDescription:"Apply one dose weekly to your pet’s haircoat to reduce overall stress levels for your cat",
        tags:["lavender", "anti-stress", "feline"],
        size:"20 ml bottle",
        price:"21.99"});
    scope = $rootScope.$new();
    ProductCtrl = $controller('ProductCtrl', {
      $scope: scope
    });
  }));

  it('should attach a product to the scope', function () {
    $httpBackend.flush();
    expect(scope.product).toBeDefined();
    console.log(scope.product.name);
    expect(scope.product.name).toEqual('Siamese If You Please');
  });
});
