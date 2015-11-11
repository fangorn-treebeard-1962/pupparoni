'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/products', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/products/')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

describe('GET /api/products/<field>/<value>', function() {

  it('should respond with JSON array for name lookup', function(done) {
    request(app)
      .get('/api/products/name/name')
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
      .get('/api/products/category/category')
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
      .get('/api/products/tag/tag')
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
      .get('/api/products/description/description')
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
      .get('/api/products/productId/productId')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });
});
