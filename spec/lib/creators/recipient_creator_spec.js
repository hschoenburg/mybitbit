var helpers = require('../../support/helpers')
var creator = require('../../../lib/creators/recipient_creator')
var models = helpers.models
var jasmine = require('jasmine')

describe('create with verifs', function() {

  // send POST
  // expect recipient and verifs of proper type
  // and not yet verif'd

  
  var sender, opts;

  beforeAll(function(done) {
    helpers.factory.create('user').then(function(new_user) {
      sender =  new_user;

      opts = {
        email: 'hans@hans.com',
        phone: '5053503892',
        name: 'Bob in Manila',
        sender_id: sender.id
      }
      done()
    })
  })

  it('should create a recipient with the appropriate sender_id', function(done) {

    creator.create_with_verifs(opts)
      .then(function(recipient) {
        return helpers.models.Recipient.findAll({where: {email: opts.email}})
      .then(function(saved_recipient){
        var recipient = saved_recipient[0]
        expect(recipient.id).toBeGreaterThan(0);
        expect(recipient.email).toEqual(opts.email)
        expect(recipient.phone_verif).toBe(false)
        expect(recipient.email_verif).toBe(false)
        done();
      })
    })
  })

  it('should create an unredeemed verif of the appropriate type', function(done) {
    // make it an email verif
    delete opts.phone;
    creator.create_with_verifs(opts)
      .then(function(created) {
        return models.Recipient.findAll({where: {sender_id: opts.sender_id }, include: [ {model: models.Verif} ]})
      })
      .then(function(recipients) {
        var verif = recipients[0].Verifs[0]
        expect(verif.method).toEqual('email')
        expect(verif.redeemed).toBe(false)
        expect(verif.code instanceof String)
        done();
      })
    })
  })
  
