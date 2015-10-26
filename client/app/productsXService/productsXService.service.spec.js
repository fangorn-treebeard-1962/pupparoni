'use strict';

describe('Service: productsXService', function () {

  // load the service's module
  beforeEach(module('pupparoniApp'));

  // instantiate service
  var productsXService;
  beforeEach(inject(function (_productsXService_) {
    productsXService = _productsXService_;
  }));

  it('productsXService should return 4 post objects', function() {
    expect(productsXService.getAll().length).toBe(4);
  });

  it('postService should return one object for id 2', function() {
    var post=productsXService.getProductById(2);
    expect(post).not.toBe(undefined);
  });

});
