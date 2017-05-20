var app = require('../../app')
var request = require('supertest')
var factory = require('../support/helpers').factory
var models = require('../support/helpers').models
var jwt = require('../../lib/jwt_utils')
var Promise = require('bluebird');

var user, debits, credits, jwt_token;

describe('request without valid token', function() {

  it('should respond with success false', function(done) {
    request(app)
      .get('/account/balance/5')

      .set('x-api-token', 'ksdksfkdsfkdnsf')
      .end(function(err, res) {
        if(err) { throw err; }
          console.log(res.body);
        expect(res.statusCode).toEqual(401);
        expect(res.body.success).toBe(false)
        done();
      })
  })
})

  
describe('account/balance/:user_id', function() {

  beforeAll(function(done) {
    factory.create('user').then(function(new_user) {
      user = new_user;

      Promise.join(factory.createMany('debit', 4, {user_id: user.id, usd_amount: 4}),
        factory.createMany('credit', 6, {user_id: user.id, usd_amount: 6}),
        jwt.createJwt({user_id: user.id, usd_amount: 6}),
        function(new_debits, new_credits, token) {
          debits = new_debits;
          credits = new_credits;
          jwt_token = token;
          done();
        })
      })
    })


  it('returns the user_id and usd_balance', function(done) {

    request(app)
      .get('/account/balance/' + user.id)

      .set('x-api-token', jwt_token)
      .end(function(err, res) {
        if(err) { throw err; }
          expect(res.body.user_id).toEqual(user.id);
          expect(res.body.usd_balance).toEqual(20);
        done();
      })
  })
})
