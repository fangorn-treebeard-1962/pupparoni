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
        {name:"Mini Poo-Poo",productId:"60003C",category:"Behavior",shortDescription:"Combination of herbs that deters coprophagia",longDescription:"Herbal infused essential oils that will make dogs stop eating their own poop when applied to food at each meal",tags:["coprophagia", "poop", "herbs", "essental oils"],size:{height:611,width:622,depth:633,weightInOunces:644},packaging:"30 ml bottle",price:"22.99",imageName:'Pepe_Le_Pew.png'},
        {name:"Shut Yo Cat Up",productId:"70004F",category:"Treat",shortDescription:"All natural crunchy treat containing tasty herbs and essential oils",longDescription:"Give your cat an all-natural tasty treat that cats love",tags:["treat", "crunchy"],size:{height:711,width:722,depth:733,weightInOunces:744},packaging:"bag of 60",price:"15.99",imageName:'Road-Runner.png'},
        {name:"Little Yippers",productId:"80004C",category:"Treat",shortDescription:"All natural chewy treat containing tasty herbs and essential oils",longDescription:"Give your dog a healthy treat that will let your pooch chew for hours",tags:["treat", "chewy"],size:{height:811,width:822,depth:833,weightInOunces:844},packaging:"bag of 60",price:"19.99",imageName:'snagglepuss.png'},
        {name:"Labradear",productId:"90001X",category:"Ear Care",shortDescription:"All-natural soothing ear wash",longDescription:"Ear wash containing witch hazel and peppermint oils that will help clean and soothe your pet’s ears",tags:["ear", "cleaner", "soothing"],size:{height:911,width:922,depth:933,weightInOunces:944},packaging:"30 ml bottle",price:"12.99",imageName:'toucheturtle.png'},
        {name:"Silky Poo",productId:"10002X",category:"Coat Care",shortDescription:"All-natural, detergent free and soothing shampoo",longDescription:"All natural soothing shampoo with hints of peppermint oil that will leave your pet’s coat beautiful and silky",tags:["shampoo", "soothing"],size:{height:1011,width:1022,depth:1033,weightInOunces:1044},packaging:"60 ml bottle",price:"17.99",imageName:'yosemite_sam.png'},
        {name:"Poo Silk",productId:"11003X",category:"Coat Care",shortDescription:"All-natural luxurious coat conditioner",longDescription:"All-natural conditioner that will leave your pet’s coat soft and shiny when used after Silky Poo",tags:["conditioner", "shiny"],size:{height:1111,width:1122,depth:1133,weightInOunces:1144},packaging:"60 ml bottle",price:"15.99",imageName:'sylvester.png'},
        {name:"Shiba Emu",productId:"12004X",category:"Coat Care",shortDescription:"All-natural all-purpose emu liniment",longDescription:"Apply this soothing ointment made from emu oil to your pet’s skin or paws when they have a boo-boo",tags:["boo-boo", "emu", "liniment"],size:{height:1211,width:1222,depth:1233,weightInOunces:1244},packaging:"20 cc canister",price:"13.99",imageName:'tazdevil.png'},
        {name:"Ground Hound",productId:"13005C",category:"Vitamins",shortDescription:"All natural vitamin supplement for your dog’s coat health",longDescription:"Vitamin powder that can be added to your dog’s food to keep the coat shiny and healthy",tags:["vitamins", "coat"],size:{height:1311,width:1322,depth:1333,weightInOunces:1344},packaging:"30 ml bottle",price:"17.99",imageName:'tweetiebird.png'}
        , function() {
          console.log('finished populating products');
        });
    }).exec().then(function() {
      done();
    });
  });

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/products/')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);

        var products = res.body;
        products.should.have.length(13);

        products[0].should.have.property('productId', '10001F');
        products[0].should.have.property('name', 'Siamese If You Please');
        done();
      });
  });

  it('should respond with JSON array for name lookup', function(done) {
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

  it('should respond with JSON array for category lookup', function(done) {
    request(app)
      .get('/api/products/category/Behavior')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should respond with JSON array for tag lookup', function(done) {
    request(app)
      .get('/api/products/tag/soothing')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should respond with JSON array for description lookup', function(done) {
    request(app)
      .get('/api/products/description/treat')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should respond with JSON object for productId lookup', function(done) {
    request(app)
      .get('/api/products/productId/20001C')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);

        var resultArray = res.body;
        resultArray[0].should.have.property('productId', '20001C');
        resultArray[0].should.have.property('name', 'Pugly');
        done();
      });
  });
  //
  //it('should respond with 404 for a bogus type lookup', function(done) {
  //  request(app)
  //    .get('/api/products/bogus/productId')
  //    .expect(404)
  //    .end(done());
  //});
});
