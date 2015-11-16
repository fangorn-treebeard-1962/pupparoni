'use strict';

describe('Controller: CartCtrl', function () {

  // load the controller's module
  beforeEach(module('pupparoniApp'));

  var CartCtrl, scope, shippingSvcMock, q, deferred;

  beforeEach(function() {
    // create the mock shippingSvc
    shippingSvcMock = {
      getEstimates: function() {
        deferred = q.defer();
        return deferred.promise;
      }
    };
  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q) {
    scope = $rootScope.$new();
    q = $q;
    CartCtrl = $controller('CartCtrl', {
      $scope: scope,
      Auth: {getCurrentUser: function() { return "MockPete"; }},
      shippingSvc: shippingSvcMock
    });
  }));

  xit('should confirm the controller signature', function () {
    expect(scope.estimateShippingCosts).toBeDefined();
    expect(scope.shipping.estimates).toBeDefined();
    expect(scope.shipping.error).toBeDefined();
    expect(scope.shipping.zip).toBeDefined();
  });

  xit('should not call shipping service if zip is not specified', function() {
    var fakeCalled = false;
    expect(scope.shipping.zip).toBe('');
    spyOn(shippingService, 'getEstimates').andCallFake(function() {fakeCalled = true;});
    scope.estimateShippingCosts();
    expect(shippingService.getEstimates).not.toHaveBeenCalled();
    expect(fakeCalled).toBeFalsy();
  });

  xit('should not call shipping service if wt is not specified', function() { });
  xit('should not call shipping service if provider is not specified', function() { });

  it('should initialize shipping.estimates if provider is successful',
    function() {
      var estimates = {type: 'Standard'};
      spyOn(shippingSvcMock, 'getEstimates').andCallThrough();

      scope.shipping.zip = 66213;
      scope.shipping.weight = 1;

      scope.estimateShippingCosts();

      deferred.resolve(estimates);
      scope.$root.$apply();

      expect(shippingSvcMock.getEstimates).toHaveBeenCalled();
      expect(scope.shipping.estimateError).toBeUndefined();
      expect(scope.shipping.estimates).toBe(estimates);
    });

  it('should initialize estimate error if provider is not successful',
    function() {
      var estimateError = 'Invalid Zip Code';
      spyOn(shippingSvcMock, 'getEstimates').andCallThrough();

      scope.shipping.zip = 66213;
      scope.shipping.weight = 1;

      scope.estimateShippingCosts();

      deferred.reject(estimateError);
      scope.$root.$apply();

      expect(shippingSvcMock.getEstimates).toHaveBeenCalled();
      expect(scope.shipping.estimates).toEqual([]);
      expect(scope.shipping.estimateError).toBe(estimateError);
    });
});
