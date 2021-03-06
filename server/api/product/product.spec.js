'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Product = require('./product.model');

describe('Testing /api/products', function() {

  before(function(done){
    Product.find({}).remove(function() {
      Product.create(
        {name:"Siamese If You Please",productId:"10001F",category:"Behavior",shortDescription:"Lavender based topical anti-stress therapy",longDescription:"Apply one dose weekly to your pet’s haircoat to reduce overall stress levels for your cat",tags:["lavender", "anti-stress", "feline"],size:{height:111,width:122,depth:133,weightInOunces:144},packaging:"20 ml bottle",price:"21.99",imageName:'Classic_bugsbunny.png'},
        {name:"Pugly",productId:"20001C",category:"Behavior",shortDescription:"Lavender based topical anti-stress therapy",longDescription:"Apply one dose weekly to your pet’s haircoat to reduce overall stress levels for your dog",tags:["lavender", "anti-stress", "canine"],size:{height:211,width:222,depth:233,weightInOunces:244},packaging:"30 ml bottle",price:"31.99",imageName:'Daffy_duck.png'},
        {name:"Phat Cat",productId:"30002F",category:"Behavior",shortDescription:"Oral herbal tonic that will make your cat drowsy",longDescription:"An herbal liquid that can be added to your cat’s food which will produce a natural drowsiness for several hours",tags:["sleep", "drowsy", "tonic", "herbal", "feline"],size:{height:311,width:322,depth:333,weightInOunces:344},packaging:"20 ml bottle",price:"21.99",imageName:'ElmerFudd.png'},
        {name:"Foggy Dog",productId:"40002C",category:"Behavior",shortDescription:"Herbal pill that will make your dog drowsy",longDescription:"An herbal pill that can be administered orally to your dog which will produce a natural drowsiness for several hours",tags:["sleep", "drowsy", "pill", "herbal", "canine"],size:{height:411,width:422,depth:433,weightInOunces:444},packaging:"30 pills",price:"31.99",imageName:'FoghornLeghorn.png'},
        {name:"Attack the Hack",productId:"50003F",category:"GI remedy",shortDescription:"All natural oils that will help digest hairballs ",longDescription:"A remedy that can be added to meals and uses all natural fish oils to help pass hairballs",tags:["hairball", "fish", "oil"],size:{height:511,width:522,depth:533,weightInOunces:544},packaging:"20 ml bottle",price:"15.99",imageName:'Marvin_the_Martian.png'},
        {name:"Mini Poo-Poo",productId:"60003C",category:"Behavior",shortDescription:"Combination of herbs that deters coprophagia",longDescription:"Herbal infused essential oils that will make dogs stop eating their own poop when applied to food at each meal",tags:["coprophagia", "poop", "herbs", "essental oils"],size:{height:611,width:622,depth:633,weightInOunces:644},packaging:"30 ml bottle",price:"22.99",imageName:'Pepe_Le_Pew.png'}
        , function() {
          console.log('finished populating products');
        });
    }).exec().then(function() {
      done();
    });
  });

  it('should respond with JSON array for /api/products/', function(done) {
    request(app)
      .get('/api/products/')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);

        var products = res.body;
        products.should.have.length(6);

        products[0].should.have.property('productId', '10001F');
        products[0].should.have.property('name', 'Siamese If You Please');
        done();
      });
  });

  it('should respond with JSON array for name lookup Siamese If You Please', function(done) {
    request(app)
      .get('/api/products/name/Siamese If You Please')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should respond with JSON array for category lookup Behavior', function(done) {
    request(app)
      .get('/api/products/category/Behavior')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        var products = res.body;
        products.should.have.length(5);

        done();
      });
  });

  it('should respond with JSON array for tag lookup herbal', function(done) {
    request(app)
      .get('/api/products/tag/herbal')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        var products = res.body;
        products.should.have.length(2);
        done();
      });
  });

  it('should respond with JSON array for description lookup tonic', function(done) {
    request(app)
      .get('/api/products/description/tonic')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        var products = res.body;
        products.should.have.length(1);
        done();
      });
  });

  it('should respond with an array of 1 product for productId lookup', function(done) {
    request(app)
      .get('/api/products/productId/20001C')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);

        var resultArray = res.body;
        resultArray.should.have.length(1);
        resultArray[0].should.have.property('productId', '20001C');
        resultArray[0].should.have.property('name', 'Pugly');
        done();
      });
  });

  it('should respond with empty array for unknown productId lookup', function(done) {
    request(app)
      .get('/api/products/productId/XXXXX')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);

        var products = res.body;
        products.should.have.length(0);
        done();
      });
  });

  it('should respond with 404 for a bogus type lookup', function(done) {
    request(app)
      .get('/api/products/bogus/productId')
      .expect(404)
      .end(done);
  });

  it('should respond with JSON object for id lookup', function(done) {
    Product.find({name:'Pugly'}, function (err, product) {
      if(err) { throw err; }
      if(!product) { throw err; }

      request(app)
        .get('/api/products/' + product[0]._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Object);
          res.body.should.have.property('productId', '20001C');
          res.body.should.have.property('name', 'Pugly');
          done();
        });
    });
  });

});
