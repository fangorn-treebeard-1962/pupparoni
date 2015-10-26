'use strict';

var _ = require('lodash');
var Product = require('./product.model');

// Get list of products
exports.index = function(req, res) {
  Product.find(function (err, products) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(products);
  });
};

// Get a single product
exports.show = function(req, res) {
  Product.findById(req.params.id, function (err, product) {
    if(err) { return handleError(res, err); }
    if(!product) { return res.status(404).send('Not Found'); }
    return res.json(product);
  });
};

// search for products matching name
exports.searchByName = function(req, res) {
  console.log('productController.searchByName(' + req.params.name + ")");
  searchUsingFilter(req, res, {'name': req.params.name});
};

// search for products matching name
exports.searchByProductId = function(req, res) {
  console.log('productController.searchByProductId(' + req.params.productId + ")");
  searchUsingFilter(req, res, {'productId': req.params.productId});
};

// search for products matching category
exports.searchByCategory = function(req, res) {
  console.log('productController.searchByCategory(' + req.params.category + ")");
  searchUsingFilter(req, res, {'category': req.params.category});
};

// search for products matching tag
exports.searchByTag = function(req, res) {
  console.log('productController.searchByTag(' + req.params.tag + ")");
  searchUsingFilter(req, res, {'tags': req.params.tag});
};

// search for products matching tag
exports.searchByDescription = function(req, res) {
  console.log('productController.searchByDescription(' + req.params.description + ")");
  searchUsingFilter(req, res, {'shortDescription': new RegExp(req.params.description, 'i')});
};

// Creates a new product in the DB.
exports.create = function(req, res) {
  Product.create(req.body, function(err, product) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(product);
  });
};

// Updates an existing product in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Product.findById(req.params.id, function (err, product) {
    if (err) { return handleError(res, err); }
    if(!product) { return res.status(404).send('Not Found'); }
    var updated = _.merge(product, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(product);
    });
  });
};

// Deletes a product from the DB.
exports.destroy = function(req, res) {
  Product.findById(req.params.id, function (err, product) {
    if(err) { return handleError(res, err); }
    if(!product) { return res.status(404).send('Not Found'); }
    product.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}

function searchUsingFilter(req, res, filter) {
  Product.find(filter, function (err, product) {
    if(err) { return handleError(res, err); }
    if(!product) { return res.status(404).send('Not Found'); }
    return res.json(product);
  });
}
