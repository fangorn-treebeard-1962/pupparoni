'use strict';

var _ = require('lodash');
var upsAPI = require('shipping-ups');
var util = require('util');

// TOOD make these come from the config or env vars
var access = "ups-access";
var userid = "ups-userId";
var passwd = "ups-password";
var shipperNumber = 'ups-shipperNumber';

var ups = new upsAPI({
  environment: 'sandbox', // or live
  access_key: access,
  username: userid,
  password: passwd,
  pretty: true
});

// Get list of shippings
exports.index = function(req, res) {
  Shipping.find(function (err, shippings) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(shippings);
  });
};

// Get a single shipping
exports.show = function(req, res) {
  Shipping.findById(req.params.id, function (err, shipping) {
    if(err) { return handleError(res, err); }
    if(!shipping) { return res.status(404).send('Not Found'); }
    return res.json(shipping);
  });
};

// Creates a new shipping in the DB.
exports.create = function(req, res) {
  Shipping.create(req.body, function(err, shipping) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(shipping);
  });
};

// Updates an existing shipping in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Shipping.findById(req.params.id, function (err, shipping) {
    if (err) { return handleError(res, err); }
    if(!shipping) { return res.status(404).send('Not Found'); }
    var updated = _.merge(shipping, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(shipping);
    });
  });
};

// Deletes a shipping from the DB.
exports.destroy = function(req, res) {
  Shipping.findById(req.params.id, function (err, shipping) {
    if(err) { return handleError(res, err); }
    if(!shipping) { return res.status(404).send('Not Found'); }
    shipping.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

exports.estimateForZipCodeUPS = function(req, res) {
  console.log("estimating UPS shipping for " + req.params.zipCode + ', weight ' + req.query.weight);
  //var shippingEstimate = returnRatesResponse();
  //shippingEstimate.zipCode = Number.parseInt(req.params.zipCode);
  //shippingEstimate.weight = Number.parseInt(req.query.weight);
  getUpsEstimate(res, req.params.zipCode, Number.parseInt(req.query.weight));

  //console.dir(shippingEstimate);
  //return res.status(200).json(shippingEstimate);
}

function handleError(res, err) {
  return res.status(500).send(err);
}

var shipper = {
  name: 'Type Foo',
  shipper_number: shipperNumber,
  address: {
    address_line_1: '123 Fake Address',
    city: 'Dover',
    state_code: 'OH',
    country_code: 'US',
    postal_code: '44622'
  }
};

function getUpsEstimate(res, zipCode, packageWeight) {
  var shipTo = {
    //name: 'Uhsem Blee',
    address: {
      //address_line_1: '3456 Fake Address',
      //city: 'Charlotte',
      //state_code: 'NC',
      country_code: 'US',
      postal_code: zipCode
        }
    };

    ups.rates({
    shipper: shipper,
    ship_to: shipTo,
    packages: [
      {
        description: 'My Package',
        weight: packageWeight
      }
    ]
  }, function(err, estimateResp) {
    if(err) {
      return console.log(err);
    }

      estimateResp.shipTo = shipTo;
    res.status(200).json(estimateResp);

    // should return an array of rates
  });
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
