'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name:String,
  productId:String,
  category:String,
  shortDescription:String,
  longDescription:String,
  tags:[String],
  size:String,
  price:Number

});

module.exports = mongoose.model('Product', ProductSchema);
