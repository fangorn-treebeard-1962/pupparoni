'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

// TODO get this working!
describe.skip('GET /api/shippings/estimate/ups/12345?weight=33', function() {

  it('should respond with estimate object', function(done) {
    request(app)
      .get('/api/shippings/estimate/ups/12345?weight=33')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.zipCode.should.be.equal(12345);
        res.body.weight.should.be.equal(33);

        done();
      });
  });
});
