var helpers = require('../support/helpers')

var creator = require('../../lib/debit_creator')
var models = helpers.models


describe('create for transaction', function() {

  // create a user
  // create a debit for them
  // play around with querying by association

  var user;
  
  var recipient = "GCS54VO62JYX646ULIBT5CMPRM5PV64BHGOGZHSP33XJVPB5UFJNKN65";
  
  beforeAll(function(done) {
    helpers.factory.create('user').then(function(new_user) {
      user =  new_user;
      done()
    })
  })
  var user;
  
  it('should save the usd_amount and user_id', function(done) {
    creator.createForTxn({usd_amount: 5, user_id: user.id, recipient: recipient}).then(function(debit) {
      expect(debit.usd_amount).toEqual(5)
      expect(debit.user_id).toEqual(user.id)
      expect(debit.recipient_address).toEqual(recipient)
    });

    done()

  })

  it('should belong to the user', function(done) {
    creator.createForTxn({usd_amount: 5, user_id: user.id, recipient: recipient}).then(function(debit) {
      return models.User.findAll({where: {id: user.id }, include: [ {model: models.Debit} ]})

    }).then(function(q_user) {
      var debit = q_user[0].Debits[0]
      expect(debit.usd_amount).toEqual(5)
      expect(debit.user_id).toEqual(user.id)
      expect(debit.recipient_address).toEqual(recipient)
      done();
    }).catch(function(err) {
      throw err;
    })
  })


  it('should error if without user_id', function(done) {
    done()
  })
})

