'use strict';

var express = require('express');
var controller = require('./product.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.get('/name/:name', controller.searchByName);
router.get('/productId/:productId', controller.searchByProductId);
router.get('/category/:category', controller.searchByCategory);
router.get('/tag/:tag', controller.searchByTag);
router.get('/description/:description', controller.searchByDescription);

module.exports = router;
