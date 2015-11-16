'use strict';

angular.module('pupparoniApp')
  .controller('CartCtrl', ['$scope', 'Auth', 'shippingSvc', function ($scope, Auth, shippingSvc) {
    var contentString = window.localStorage.getItem('cart.product');

    $scope.deleteOrderItem = function(index) {
      console.log('delete was pressed: [' + index + ']');
      $scope.cartContents.splice(index, 1);
      var oldCart = getCartContents();
      oldCart.splice(index, 1);
      saveCartContents(oldCart);
      $scope.updateTotals();
    };

    $scope.changeQuantity = function(index) {
      var oldCart = getCartContents();
      oldCart[index].quantity = $scope.cartContents[index].quantity;
      saveCartContents(oldCart);
      $scope.updateButton[index] = false;
      $scope.updateTotals();
    };

    $scope.checkQuantityChange = function(index) {
      console.log("checkQuantityChange(" + index + ")");

      var oldCart = getCartContents();
      var oldQuantity = oldCart[index].quantity;
      console.log("checkQuantityChange: Old (" +  oldQuantity + "), New (" + $scope.cartContents[index].quantity + ")");
      if ($scope.cartContents[index].quantity != oldQuantity) {
        console.log("quantity changed");
        $scope.updateButton[index] = true;
      } else {
        console.log("quantity not changed");
        $scope.updateButton[index] = false;
      }
    };

    $scope.updateTotals = function() {

      var sum = $scope.cartContents.reduce(function(previousValue, currentValue) {
          return previousValue + Number.parseFloat(currentValue.price) * Number.parseInt(currentValue.quantity);
        }, 0.0
      );

      $scope.numItems = $scope.cartContents.reduce(function(previousValue, currentValue) {
          return previousValue + Number.parseInt(currentValue.quantity);
        }, 0
      );

      // TODO fix this
      $scope.totalWeight = $scope.numItems;

      $scope.subTotal = sum.toFixed(2);
      $scope.tax = ($scope.subTotal * .08).toFixed(2);
      $scope.orderTotal = (Number.parseFloat($scope.subTotal) + Number.parseFloat($scope.tax)).toFixed(2);
    };

    $scope.getServiceCodeDesc = function(code) {
      return $scope.serviceCodeDesc[code];
    };

    $scope.showShippingFunc = function() {
      $scope.shipping.show = true;
    };

    $scope.estimateShippingCosts = function() {
      $scope.shipping.estimateError = undefined;
      $scope.shipping.estimates = {};

      if ($scope.shipping.zip === '') {
        $scope.shipping.estimateError = 'ZIP code must be specified';
        return;
      }
      if ($scope.numItems < 1) {
        $scope.shipping.estimateError = 'At least one product must be specified';
        return;
      }

      shippingSvc.getEstimates(shippingSvc.UPS, $scope.shipping.zip, $scope.totalWeight)
      .then(function(estimates) {
        // success
        $scope.shipping.estimates = estimates;
      }, function(err) {
        // failure
        console.log("in failure function [" + err + ']');
        $scope.shipping.estimateError = err;
      });

    };

    $scope.shipping = { zip: '', estimates: {}, show: false, estimateError: undefined };

    $scope.getCurrentUser = Auth.getCurrentUser();

    $scope.serviceCodeDesc = {
      '01': 'Next Day Air',
      '02': '2nd Day Air',
      '03': 'Ground',
      '12': '3 Day Select',
      '13': 'Next Day Air Saver',
      '14': 'UPS Next Day Air® Early',
      '59': '2nd Day Air AM',
      '70': 'UPS Access PointTM Economy'
    };

    if (contentString != null) {
      $scope.cartContents = getCartContents();

      $scope.updateButton = [];
      $scope.cartContents.forEach(function() {
        $scope.updateButton.push(false);
      });

      $scope.updateTotals();
    }
  }]);

function getCartContents() {
  return JSON.parse(window.localStorage.getItem('cart.product'));
}

function saveCartContents(cartContents) {
  localStorage.setItem('cart.product', JSON.stringify(cartContents));
}
