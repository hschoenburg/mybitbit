var app = require('../../app')
var request = require('supertest')
var factory = require('../support/helpers').factory
var models = require('../support/helpers').models
var creators = require('../../lib/creators/index')
var Promise = require('bluebird')

var user, code;

code = 0;


describe('verifs/redeem', function() {

  beforeEach(function(done) {

    factory.create('user').then(function(new_user) {
      user = new_user;
      return creators.recipient.create_with_verifs({
        sender_id: user.id,
        email: 'teseting@test.com',
        phone: '',
        name: 'Bob in Manilla'
      })
    }).then(function(verif) {
      console.log(verif.code);
      code = verif.code;
      done()
    })

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
