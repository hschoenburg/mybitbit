var helpers = require('../../support/helpers')

var creator = require('../../../lib/creators/credit_creator')
var models = helpers.models


describe('create for reward', function() {

  // create a user
  // create a credit for them
  // play around with querying by association

  var user;
  
  beforeEach(function(done) {
    helpers.factory.create('user').then(function(new_user) {
      user =  new_user;
      done()
    })
  })
  var user;
  
  it('should save the usd_amount and user_id', function(done) {
    creator.createForReward(5, user.id).then(function(credit) {
      expect(credit.usd_amount).toEqual(5)
      expect(credit.user_id).toEqual(user.id)
      expect(credit.source).toEqual('reward')
    });

    done()

  })

  it('should belong to the user', function(done) {
    creator.createForReward(5, user.id).then(function(credit) {
      return models.User.findAll({where: {id: user.id }, include: [ {model: models.Credit} ]})

    }).then(function(q_user) {
      var credit = q_user[0].Credits[0]
      expect(credit.usd_amount).toEqual(5)
      expect(credit.user_id).toEqual(user.id)
      expect(credit.source).toEqual('reward')
      done();
    }).catch(function(err) {
      throw err;
    })
  })


  it('should error if without user_id', function(done) {
    done()
  })
})

