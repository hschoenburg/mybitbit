var app = require('../../app')
var request = require('supertest')
var factory = require('../support/helpers').factory
var models = require('../support/helpers').models
var Promise = require('bluebird');

  var user, debits, credits;
  
  beforeAll(function(done) {
    factory.create('user').then(function(new_user) {
      user = new_user;

      Promise.join(factory.createMany('debit', 4, {user_id: user.id, usd_amount: 4}),
                    factory.createMany('credit', 6, {user_id: user.id, usd_amount: 6}),
        function(new_debits, new_credits) {
          debits = new_debits;
          credits = new_credits;
          done();
        })
    })
  })

describe('account/balance/:user_id', function() {

  it('returns the user_id and usd_balance', function(done) {

    request(app)
      .get('/account/balance/' + user.id)
      .end(function(err, res) {
          expect(res.body.user_id).toEqual(user.id);
          expect(res.body.usd_balance).toEqual(20);
        done();
      })
  })

})
