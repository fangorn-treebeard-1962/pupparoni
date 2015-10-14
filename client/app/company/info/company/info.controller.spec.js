'use strict';

describe('Controller: CompanyInfoCtrl', function () {

  // load the controller's module
  beforeEach(module('pupparoniApp'));

  var CompanyInfoCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CompanyInfoCtrl = $controller('CompanyInfoCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
