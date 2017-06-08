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
          email: 'teseting@test.com',
          phone: '',
          name: 'Bob in Manilla'
        })
      }).then(function(data) {

        code = data.verif.code;
        recipient = data.recipient;
        done()
      })


  describe('verifs/redeem', function() {

    })

    it('update the verif as redeemed', function(done) {
      request(app)
        .get('/verifs/'+ code)
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

    fit('sends the verif', function(done) {

      // var sdk = require sdk
      //  spyOn(sdk, 'method_name').and.callThrough()
      //expect sdk.method_name.toHaveBeenCalled()

      request(app)
        .post('/verifs/send')
        .send({recipient_id: recipient.id})
        .end(function(err, res) {

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


