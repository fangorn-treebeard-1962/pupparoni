'use strict';

angular.module('pupparoniApp')
  .factory('shippingSvc', ['$q', '$http', function ($q, $http) {
    // Service logic
    // shipping service should throw an error if invoked improperly
    //
    // getEstimate(zip): promise
    // If getEstimates() invoked properly, it always returns a promise
    //    promise.resolve({estimates: []}
    //    promise.reject(err)

    var api;

    // Public API here
    return {
      UPS: 'UPS',

      getEstimates: function (provider, zip, wt) {
        if (provider === undefined) throw new Error("Shipping Provider not specified");
        if (provider !== this.UPS) throw new Error("Shipping Provider not recognized");
        if (zip === undefined) throw new Error("ZIP not specified");
        if (wt === undefined) throw new Error("Weight not specified");

        if (wt < 1) throw new Error('Weight (' + wt + ') is not a positive number');
        if (null === ('' + zip).match(/^\d\d\d\d\d$/)) throw new Error('ZIP (' + zip + ') is not a 5-digit number');

        var deferred = $q.defer(); //creates a new deferred object

        var url = '/api/shippings/estimate/' + provider + '/' + zip + '?weight=' + wt;
        $http.get(url).success(function(resp) {
          deferred.resolve(resp);
        }).error(function(err) {
          deferred.reject("service not available: " + err);
        });

        return deferred.promise;
      }

    };
  }]);
