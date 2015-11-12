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
  price:Number,
  imageName:String,
  packaging:String,
  size: {
    width: Number,
    height: Number,
    depth: Number,
    weightInOunces: Number
  }

});

module.exports = mongoose.model('Product', ProductSchema);
