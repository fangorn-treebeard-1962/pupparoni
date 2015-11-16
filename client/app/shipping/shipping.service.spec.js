'use strict';

describe('Service: shippingSvc', function () {

  // load the service's module
  beforeEach(module('pupparoniApp'));

  var mockBackend;

  // instantiate service
  var shippingSvc;
  beforeEach(inject(function ($httpBackend, _shippingSvc_) {
    mockBackend = $httpBackend;
    shippingSvc = _shippingSvc_;
  }));

  afterEach(function() {
    // Ensure that all requests to the server have actually responded (using flush())
    mockBackend.verifyNoOutstandingRequest();
  });

  it('should confirm the service signature', function () {
    expect(shippingSvc.getEstimates).toBeDefined();
  });

  describe('shippingSvc: getEstimates', function () {

    it('should throw an error with no provider parameter passed, and should not call shipping api', function () {
      expect(function(){shippingSvc.getEstimates()}).toThrow(new Error("Shipping Provider not specified"));
    });

    it('should throw an error if provider parameter is not recognized, and should not call shipping api', function () {
      expect(function(){shippingSvc.getEstimates("dave")}).toThrow(new Error("Shipping Provider not recognized"));
    });

    it('should throw an error with no zip parameter passed, and should not call shipping api', function () {
      expect(function(){shippingSvc.getEstimates(shippingSvc.UPS)}).toThrow(new Error("ZIP not specified"));
    });

    it('should throw an error with illegal zip parameters passed, and should not call shipping api', function () {
      expect(function(){shippingSvc.getEstimates(shippingSvc.UPS, 1, 'wt')}).toThrow(new Error("ZIP (1) is not a 5-digit number"));
      expect(function(){shippingSvc.getEstimates(shippingSvc.UPS, 'zip', 'wt')}).toThrow(new Error("ZIP (zip) is not a 5-digit number"));
      expect(function(){shippingSvc.getEstimates(shippingSvc.UPS, 123456, 'wt')}).toThrow(new Error("ZIP (123456) is not a 5-digit number"));
    });

    it('should throw an error with no wt parameter passed, and should not call shipping api', function () {
      expect(function(){shippingSvc.getEstimates(shippingSvc.UPS, 12345)}).toThrow(new Error("Weight not specified"));
    });

    it('should throw an error with illegal wt parameters passed, and should not call shipping api', function () {
      expect(function(){shippingSvc.getEstimates(shippingSvc.UPS, 12345, 0)}).toThrow(new Error("Weight (0) is not a positive number"));
      expect(function(){shippingSvc.getEstimates(shippingSvc.UPS, 12345, -1)}).toThrow(new Error("Weight (-1) is not a positive number"));
    });

    it('should call promise errHandler if shipping api returns an error', inject(function ($rootScope) {
      var provider = shippingSvc.UPS;
      var errorSeen = false;

      // mock the shippingApi
      mockBackend.expectGET('/api/shippings/estimate/UPS/66213?weight=10').respond(404, 'service not available');

      var promise = shippingSvc.getEstimates(provider, 66213, 10);
      mockBackend.flush();

      promise.then(function() {errorSeen = false;}, function() {errorSeen = true;});
      $rootScope.$apply();

      expect(errorSeen).toBe(true);

      // Ensure that all expects set on the $httpBackend // were actually called
      mockBackend.verifyNoOutstandingExpectation();
      // Ensure that all requests to the server // have actually responded (using flush())
      mockBackend.verifyNoOutstandingRequest();
    }));

    it('should call promise successHandler if shipping api succeeds', inject(function ($rootScope) {
      var provider = shippingSvc.UPS;
      var errorSeen = false;

      // mock the shippingApi
      mockBackend.expectGET('/api/shippings/estimate/UPS/66213?weight=10').respond(200, '{estimates: [{}]');

      var promise = shippingSvc.getEstimates(provider, 66213, 10);
      mockBackend.flush();

      promise.then(function() {errorSeen = false;}, function() {errorSeen = true;});
      $rootScope.$apply();

      expect(errorSeen).not.toBeTruthy();

      // Ensure that all expects set on the $httpBackend // were actually called
      mockBackend.verifyNoOutstandingExpectation();
      // Ensure that all requests to the server // have actually responded (using flush())
      mockBackend.verifyNoOutstandingRequest();
    }));
  });
});
