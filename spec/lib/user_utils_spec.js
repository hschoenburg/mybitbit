var helpers = require('../support/helpers')
var creators = require('../../lib/creators/index')
var models = require('../support/helpers').models
var factory = require('../support/helpers').factory

var Promise = require('bluebird')

var UserUtils = require('../../lib/user_utils')

  var user, credits, debits;

describe('user_utils.calcBalance', function() {
  
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

  it('should calculate the users usd_balance', function(done) {
    UserUtils.calcBalance(user.id).then(function(bal) {
      expect(bal).toEqual(20)
      done();
    })
  })
})
