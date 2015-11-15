'use strict';

describe('Service: shippingSvc', function () {

  // load the service's module
  beforeEach(module('pupparoniApp'));

  var shippingApi = {getEstimates: function(provider) {}};
  var mockBackend;

  // instantiate service
  var shippingSvc;
  beforeEach(inject(function ($httpBackend, _shippingSvc_) {
    mockBackend = $httpBackend;
    shippingSvc = _shippingSvc_;
    shippingSvc.setShippingApi(shippingApi);
  }));

  it('should do confirm the service signature', function () {
    expect(shippingSvc.getEstimates).toBeDefined();
  });

  describe('shippingSvc: getEstimates', function () {

    it('should throw an error with no provider parameter passed, and should not call shipping api', function () {
      spyOn(shippingApi, 'getEstimates');
      expect(function(){shippingSvc.getEstimates()}).toThrow(new Error("Shipping Provider not specified"));
      expect(shippingApi.getEstimates).not.toHaveBeenCalled();
    });

    it('should throw an error if provider parameter is not recognized, and should not call shipping api', function () {
      spyOn(shippingApi, 'getEstimates');
      expect(function(){shippingSvc.getEstimates("dave")}).toThrow(new Error("Shipping Provider not recognized"));
      expect(shippingApi.getEstimates).not.toHaveBeenCalled();
    });

    it('should throw an error with no zip parameter passed, and should not call shipping api', function () {
      spyOn(shippingApi, 'getEstimates');
      expect(function(){shippingSvc.getEstimates(shippingSvc.UPS)}).toThrow(new Error("ZIP not specified"));
      expect(shippingApi.getEstimates).not.toHaveBeenCalled();
    });

    it('should throw an error with illegal zip parameters passed, and should not call shipping api', function () {
      spyOn(shippingApi, 'getEstimates');
      expect(function(){shippingSvc.getEstimates(shippingSvc.UPS, 1, 'wt')}).toThrow(new Error("ZIP (1) is not a 5-digit number"));
      expect(function(){shippingSvc.getEstimates(shippingSvc.UPS, 'zip', 'wt')}).toThrow(new Error("ZIP (zip) is not a 5-digit number"));
      expect(function(){shippingSvc.getEstimates(shippingSvc.UPS, 123456, 'wt')}).toThrow(new Error("ZIP (123456) is not a 5-digit number"));
      expect(shippingApi.getEstimates).not.toHaveBeenCalled();
    });

    it('should throw an error with no wt parameter passed, and should not call shipping api', function () {
      spyOn(shippingApi, 'getEstimates');
      expect(function(){shippingSvc.getEstimates(shippingSvc.UPS, 12345)}).toThrow(new Error("Weight not specified"));
      expect(shippingApi.getEstimates).not.toHaveBeenCalled();
    });

    it('should throw an error with illegal wt parameters passed, and should not call shipping api', function () {
      spyOn(shippingApi, 'getEstimates');
      expect(function(){shippingSvc.getEstimates(shippingSvc.UPS, 12345, 0)}).toThrow(new Error("Weight (0) is not a positive number"));
      expect(function(){shippingSvc.getEstimates(shippingSvc.UPS, 12345, -1)}).toThrow(new Error("Weight (-1) is not a positive number"));
      expect(shippingApi.getEstimates).not.toHaveBeenCalled();
    });

    it('should call promise errHandler if shipping api returns an error', inject(function ($rootScope) {
      var provider = shippingSvc.UPS;
      var errorSeen = false;

      // mock the shippingApi
      mockBackend.expectGET('/api/shippings/estimate/'+provider).respond(404, 'service not available');

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
      mockBackend.expectGET('/api/shippings/estimate/'+provider).respond(200, '{estimates: [{}]');

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
