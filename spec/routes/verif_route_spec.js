var app = require('../../app')
var request = require('supertest')
var factory = require('../support/helpers').factory
var models = require('../support/helpers').models
var creators = require('../../lib/creators/index')
var Promise = require('bluebird')



describe('/verifs', function() {

    var user, code, recipient;
    code = 0;

    beforeEach(function(done) {

      factory.create('user').then(function(new_user) {
        user = new_user;
        return creators.recipient.create_with_verifs({
          sender_id: user.id,
          email: 'hschoenburg@gmail.com',
          phone: '',
          name: 'Bob in Manilla'
        })
      }).then(function(data) {

        code = data.verif.code;
        recipient = data.recipient;
        done()
      })
  })


  describe('verifs/redeem', function() {

    it('update the verif as redeemed', function(done) {
      request(app)
        .get('/verifs/redeem/'+ code)
        .end(function(err, res) {
          expect(res.statusCode).toEqual(200)
          models.Verif.findAll({where: { code: code }, include: [{model: models.Recipient}]}).then(function(verif) {

            expect(verif[0].redeemed).toBe(true)
            expect(verif[0].Recipient.email_verif).toBe(true)
            done()

        })
      })
    })
  })

  describe('verifs/send', function() {

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
})
