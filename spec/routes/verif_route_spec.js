var app = require('../../app')
var request = require('supertest')
var factory = require('../support/helpers').factory
var models = require('../support/helpers').models
var creators = require('../../lib/creators/index')
var Promise = require('bluebird')


describe('/verifs', function() {

    var user, code;
    code = 0;

    beforeEach(function(done) {

      factory.create('user').then(function(new_user) {
        user = new_user;
        done()
      })
    })


  describe('redeem an email verif', function() {


    var verif;
    beforeEach(function(done) {
      creators.verif.create({
        user_id: user.id,
        email: 'Bob@Manilla.com',
        method: 'email'
      }).then(function(new_verif) {
        verif = new_verif;
        code = new_verif.code

        done()
      })
    })


    it('updates the verif as redeemed and user as email_verified', function(done) {
      request(app)
        .get('/verifs/redeem/'+ verif.code)
        .end(function(err, res) {
          expect(res.statusCode).toEqual(200)
          models.Verif.findOne({where: { code: code.toString() }, include: [{model: models.User}]}).then(function(verif) {

            expect(verif.redeemed).toBe(true)
            expect(verif.User.email_verified).toBe(true)
            done()

        })
      })
    })
  })

  // Rebuild this as an invite system.
  // Resend invitations
    /*

  describe('send a verif', function() {

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


    it('sends the verif and updates sent_at', function(done) {
      // this kind of spy doesnt work with API integration tests
      //var Sparky = require('sparkpost')
      //var sparkPost = new Sparky(process.env.SPARKPOST_KEY).transmissions;

      //spyOn(sparkPost, 'send').and.callThrough()

      request(app)
        .post('/verifs/send')
        .send({recipient_id: recipient.id})
        .end(function(err, res) {

          //expect(sparkPost.send).toHaveBeenCalled()
          models.Verif.findAll({where: {recipient_id: recipient.id}}).then(function(verif) {
            expect(verif[0].sent_at).not.toBe(null)
            done()
          }).catch(function(err) {
            throw err;
          })
        })
    })
  })
  */
})
