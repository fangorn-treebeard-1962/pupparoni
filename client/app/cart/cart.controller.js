'use strict';

angular.module('pupparoniApp')
  .controller('CartCtrl', function ($scope) {
    var contentString = window.localStorage.getItem('cart.product');

    //All REST – JSON requests must be sent to the following URL:
    //  https://onlinetools.ups.com/json/
    //The JSON API expects the following HTTP headers:
    //Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
    //Access-Control-Allow-Methods: POST
    //Access-Control-Allow-Origin: *
    //Content-Type: application/json

    $scope.upsTestUrl = 'https://wwwcie.ups.com/webservices/Rate';
    $scope.access = "ACCESS";
    $scope.userid = "ID";
    $scope.passwd = "PASSWORD";

    if (contentString != null) {
      $scope.cartContents = JSON.parse(window.localStorage.getItem('cart.product'));

      $scope.subTotal = 110.00;
      $scope.tax = $scope.subTotal * .08;
      $scope.orderTotal = $scope.subTotal + $scope.tax;

      $scope.shipping = {
        zip:'',
        estimates:[],
        show:false
      };
    }

    $scope.showShippingFunc = function() {
      $scope.shipping.show = true;
    }

    $scope.estimateShippingCosts = function() {
      console.log('zip code is ' + $scope.shipping.zip);

      $scope.shipping.estimates = [
        {type: '7-10 business days', cost: '19.42'},
        {type: '3-5 business days', cost: '29.42'},
        {type: 'Overnight', cost: '39.42'}
      ];
    }


  });
