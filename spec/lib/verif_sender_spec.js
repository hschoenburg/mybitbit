var helpers = require('../support/helpers')
var creators = require('../../lib/creators/index')
var models = require('../support/helpers').models
var factory = require('../support/helpers').factory
var sender = require('../../lib/verif_sender')


describe('sending an email verif', function() {
  var user, verif;
  beforeEach(function(done) {


    factory.create('user').then(function(new_user) {
      user = new_user;

      return creators.verif.create({
        user_id: user.id,
        method: 'email'
      })
    })
    .then(function(new_verif) {
        verif = new_verif;
        done()
      })
    })


  it('should create a verif', function(done) {

    //sender.verifyEmail(verif.id).then(function(saved_v) {
    done();

  })


})

