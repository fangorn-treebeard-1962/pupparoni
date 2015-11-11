'use strict';

describe('Service: productsXService', function () {


  // load the service's module
  beforeEach(module('pupparoniApp'));

  // instantiate service
  var productsXService;
  var httpBackend;
  beforeEach(inject(function (_productsXService_, $httpBackend) {
    productsXService = _productsXService_;
    httpBackend = $httpBackend;
    httpBackend.expectGET('/api/products')
      .respond(200, [ { 'name': 'Product1', 'id': '1' }, { 'name': 'Product2', 'id': '2' }, { 'name': 'Product3', 'id': '3' } , { 'name': 'Product4', 'id': '4' } ]);
    //.respond([{ name: 'Product1', id: 1 }]);

    httpBackend.expectGET('/api/products/2')
      .respond(200, [ { 'name': 'Product2', 'id': '2' } ]);

    httpBackend.expectGET('/api/products/name/Product4')
      .respond(200, [ { 'name': 'Product4', 'id': '4' } ]);

  }));

  it('should have a working productsXService service', inject(['productsXService',
    function(productsXService) {
      expect(productsXService.getAll).toBeDefined();
      expect(productsXService.getProductById).toBeDefined();
      expect(productsXService.getProductByName).toBeDefined();
    }]));

  it('productsXService should return 4 product objects', function() {
    //httpBackend.flush();
    productsXService.getAll().success(function (response) {
      expect(response.length).toBe(4);
    });
  });

  it('productsXService should return one object for id 2', function() {
    productsXService.getProductById(2).success(function (response) {
      expect(response.name).toBe('Product2');
    });
  });

  it('productsXService should return one object for name Product4', function() {
    productsXService.getProductByName('Product4').success(function (response) {
      expect(response.id).toBe(4);
    });
  });

});
