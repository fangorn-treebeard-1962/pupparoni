'use strict';

describe('Controller: CompanySupportCtrl', function () {

  // load the controller's module
  beforeEach(module('pupparoniApp'));

  var CompanySupportCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CompanySupportCtrl = $controller('CompanySupportCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
