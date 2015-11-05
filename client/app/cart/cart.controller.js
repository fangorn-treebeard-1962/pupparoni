'use strict';

angular.module('pupparoniApp')
  .controller('CartCtrl', function ($scope, Auth) {
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
      console.log("sum = " + sum);

      $scope.subTotal = sum.toFixed(2);
      $scope.tax = ($scope.subTotal * .08).toFixed(2);
      $scope.orderTotal = (Number.parseFloat($scope.subTotal) + Number.parseFloat($scope.tax)).toFixed(2);
    };

    $scope.getCurrentUser = Auth.getCurrentUser;

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

    $scope.getServiceCodeDesc = function(code) {
      return $scope.serviceCodeDesc[code];
    };

    $scope.showShippingFunc = function() {
      $scope.shipping.show = true;
    };

    $scope.estimateShippingCosts = function() {
      console.log('zip code is ' + $scope.shipping.zip);

      $scope.shipping.estimates = [
        {type: '7-10 business days', cost: '19.42'},
        {type: '3-5 business days', cost: '29.42'},
        {type: 'Overnight', cost: '39.42'}
      ];

      $scope.response = returnRatesResponse();
      console.dir($scope.response);

    };

    if (contentString != null) {
      $scope.cartContents = getCartContents();

      $scope.shipping = {
        zip:'',
        estimates:[],
        show:false
      };

      $scope.updateButton = [];
      $scope.cartContents.forEach(function(entry, index) {
        $scope.updateButton.push(false);
      });

      $scope.updateTotals();
    }
  });

function getCartContents() {
  return JSON.parse(window.localStorage.getItem('cart.product'));
}

function saveCartContents(cartContents) {
  localStorage.setItem('cart.product', JSON.stringify(cartContents));
}

function returnRatesResponse() {
  return{ Response:
  { ResponseStatusCode: '1',
    ResponseStatusDescription: 'Success' },
    RatedShipment:
      [ { Service: { Code: '03' },
        RatedShipmentWarning:
          [ 'User Id and Shipper Number combination is not qualified to receive negotiated rates.',
            'Your invoice may vary from the displayed reference rates' ],
        BillingWeight: { UnitOfMeasurement: { Code: 'LBS' }, Weight: '10.0' },
        TransportationCharges: { CurrencyCode: 'USD', MonetaryValue: '15.04' },
        ServiceOptionsCharges: { CurrencyCode: 'USD', MonetaryValue: '0.00' },
        TotalCharges: { CurrencyCode: 'USD', MonetaryValue: '15.04' },
        GuaranteedDaysToDelivery: '',
        ScheduledDeliveryTime: '',
        RatedPackage:
        { TransportationCharges: { CurrencyCode: 'USD', MonetaryValue: '15.04' },
          ServiceOptionsCharges: { CurrencyCode: 'USD', MonetaryValue: '0.00' },
          TotalCharges: { CurrencyCode: 'USD', MonetaryValue: '15.04' },
          Weight: '10.0',
          BillingWeight: { UnitOfMeasurement: { Code: 'LBS' }, Weight: '10.0' } } },
        { Service: { Code: '12' },
          RatedShipmentWarning:
            [ 'User Id and Shipper Number combination is not qualified to receive negotiated rates.',
              'Your invoice may vary from the displayed reference rates' ],
          BillingWeight: { UnitOfMeasurement: { Code: 'LBS' }, Weight: '10.0' },
          TransportationCharges: { CurrencyCode: 'USD', MonetaryValue: '25.69' },
          ServiceOptionsCharges: { CurrencyCode: 'USD', MonetaryValue: '0.00' },
          TotalCharges: { CurrencyCode: 'USD', MonetaryValue: '25.69' },
          GuaranteedDaysToDelivery: '3',
          ScheduledDeliveryTime: '',
          RatedPackage:
          { TransportationCharges: { CurrencyCode: 'USD', MonetaryValue: '25.69' },
            ServiceOptionsCharges: { CurrencyCode: 'USD', MonetaryValue: '0.00' },
            TotalCharges: { CurrencyCode: 'USD', MonetaryValue: '25.69' },
            Weight: '10.0',
            BillingWeight: { UnitOfMeasurement: { Code: 'LBS' }, Weight: '10.0' } } },
        { Service: { Code: '59' },
          RatedShipmentWarning:
            [ 'User Id and Shipper Number combination is not qualified to receive negotiated rates.',
              'Your invoice may vary from the displayed reference rates' ],
          BillingWeight: { UnitOfMeasurement: { Code: 'LBS' }, Weight: '10.0' },
          TransportationCharges: { CurrencyCode: 'USD', MonetaryValue: '38.44' },
          ServiceOptionsCharges: { CurrencyCode: 'USD', MonetaryValue: '0.00' },
          TotalCharges: { CurrencyCode: 'USD', MonetaryValue: '38.44' },
          GuaranteedDaysToDelivery: '2',
          ScheduledDeliveryTime: '10:30 A.M.',
          RatedPackage:
          { TransportationCharges: { CurrencyCode: 'USD', MonetaryValue: '38.44' },
            ServiceOptionsCharges: { CurrencyCode: 'USD', MonetaryValue: '0.00' },
            TotalCharges: { CurrencyCode: 'USD', MonetaryValue: '38.44' },
            Weight: '10.0',
            BillingWeight: { UnitOfMeasurement: { Code: 'LBS' }, Weight: '10.0' } } },
        { Service: { Code: '02' },
          RatedShipmentWarning:
            [ 'User Id and Shipper Number combination is not qualified to receive negotiated rates.',
              'Your invoice may vary from the displayed reference rates' ],
          BillingWeight: { UnitOfMeasurement: { Code: 'LBS' }, Weight: '10.0' },
          TransportationCharges: { CurrencyCode: 'USD', MonetaryValue: '33.42' },
          ServiceOptionsCharges: { CurrencyCode: 'USD', MonetaryValue: '0.00' },
          TotalCharges: { CurrencyCode: 'USD', MonetaryValue: '33.42' },
          GuaranteedDaysToDelivery: '2',
          ScheduledDeliveryTime: '',
          RatedPackage:
          { TransportationCharges: { CurrencyCode: 'USD', MonetaryValue: '33.42' },
            ServiceOptionsCharges: { CurrencyCode: 'USD', MonetaryValue: '0.00' },
            TotalCharges: { CurrencyCode: 'USD', MonetaryValue: '33.42' },
            Weight: '10.0',
            BillingWeight: { UnitOfMeasurement: { Code: 'LBS' }, Weight: '10.0' } } },
        { Service: { Code: '13' },
          RatedShipmentWarning:
            [ 'User Id and Shipper Number combination is not qualified to receive negotiated rates.',
              'Your invoice may vary from the displayed reference rates' ],
          BillingWeight: { UnitOfMeasurement: { Code: 'LBS' }, Weight: '10.0' },
          TransportationCharges: { CurrencyCode: 'USD', MonetaryValue: '93.99' },
          ServiceOptionsCharges: { CurrencyCode: 'USD', MonetaryValue: '0.00' },
          TotalCharges: { CurrencyCode: 'USD', MonetaryValue: '93.99' },
          GuaranteedDaysToDelivery: '1',
          ScheduledDeliveryTime: '3:00 P.M.',
          RatedPackage:
          { TransportationCharges: { CurrencyCode: 'USD', MonetaryValue: '93.99' },
            ServiceOptionsCharges: { CurrencyCode: 'USD', MonetaryValue: '0.00' },
            TotalCharges: { CurrencyCode: 'USD', MonetaryValue: '93.99' },
            Weight: '10.0',
            BillingWeight: { UnitOfMeasurement: { Code: 'LBS' }, Weight: '10.0' } } },
        { Service: { Code: '14' },
          RatedShipmentWarning:
            [ 'User Id and Shipper Number combination is not qualified to receive negotiated rates.',
              'Your invoice may vary from the displayed reference rates' ],
          BillingWeight: { UnitOfMeasurement: { Code: 'LBS' }, Weight: '10.0' },
          TransportationCharges: { CurrencyCode: 'USD', MonetaryValue: '126.79' },
          ServiceOptionsCharges: { CurrencyCode: 'USD', MonetaryValue: '0.00' },
          TotalCharges: { CurrencyCode: 'USD', MonetaryValue: '126.79' },
          GuaranteedDaysToDelivery: '1',
          ScheduledDeliveryTime: '8:00 A.M.',
          RatedPackage:
          { TransportationCharges: { CurrencyCode: 'USD', MonetaryValue: '126.79' },
            ServiceOptionsCharges: { CurrencyCode: 'USD', MonetaryValue: '0.00' },
            TotalCharges: { CurrencyCode: 'USD', MonetaryValue: '126.79' },
            Weight: '10.0',
            BillingWeight: { UnitOfMeasurement: { Code: 'LBS' }, Weight: '10.0' } } },
        { Service: { Code: '01' },
          RatedShipmentWarning:
            [ 'User Id and Shipper Number combination is not qualified to receive negotiated rates.',
              'Your invoice may vary from the displayed reference rates' ],
          BillingWeight: { UnitOfMeasurement: { Code: 'LBS' }, Weight: '10.0' },
          TransportationCharges: { CurrencyCode: 'USD', MonetaryValue: '95.89' },
          ServiceOptionsCharges: { CurrencyCode: 'USD', MonetaryValue: '0.00' },
          TotalCharges: { CurrencyCode: 'USD', MonetaryValue: '95.89' },
          GuaranteedDaysToDelivery: '1',
          ScheduledDeliveryTime: '10:30 A.M.',
          RatedPackage:
          { TransportationCharges: { CurrencyCode: 'USD', MonetaryValue: '95.89' },
            ServiceOptionsCharges: { CurrencyCode: 'USD', MonetaryValue: '0.00' },
            TotalCharges: { CurrencyCode: 'USD', MonetaryValue: '95.89' },
            Weight: '10.0',
            BillingWeight: { UnitOfMeasurement: { Code: 'LBS' }, Weight: '10.0' } } } ] };
}
