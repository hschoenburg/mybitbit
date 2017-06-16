var creators = require('../../../lib/creators/index')
var helpers = require('../../support/helpers')


describe('create', function() {

    var user;
  beforeEach(function(done) {

    helpers.factory.create('user').then(function(new_user) {
      user = new_user;
      done()
    })
  })

  it('should create a verif with method phone if phone # is provided', function(done) {

    creators.verif.create({
      user_id: user.id,
      method: 'phone'
    })

      .then(function(verif) {
        return helpers.models.Verif.findOne({where: {user_id: user.id}})
      }).then(function(saved_verif){
        expect(saved_verif.sent_at).toBe(null)
        expect(saved_verif.redeemed).toBe(false)
        expect(saved_verif.method).toEqual('phone')
        done()
    })
  })


  it('should create a verif with method email if email is provided', function(done) {

    creators.verif.create({
      user_id: user.id,
      method: 'email'
    })

      .then(function(verif) {
        return helpers.models.Verif.findOne({where: {user_id: user.id}})
      }).then(function(saved_verif){
        expect(saved_verif.sent_at).toBe(null)
        expect(saved_verif.method).toEqual('email')
        done()
      })
    })
  })
