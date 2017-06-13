var app = require('../../app')
var request = require('supertest')
var factory = require('../support/helpers').factory
var models = require('../support/helpers').models
var jwt = require('../../lib/jwt_utils')
var creators = require('../../lib/creators/index')
var Promise = require('bluebird');



describe('POST a new recipient', function() {

  var user, recipient_data, token;

  beforeEach(function(done) {

      factory.create('user').then(function(new_user) {
        user = new_user;
      
        recipient_data = {
          phone: 4783920,
          email: '',
          name: "Bob in Manilla",
        }

        token = jwt.createJwt({user_id: user.id, profile: recipient_data})
        done();
      })
    })

  //.set('x-api-token', jwt_token)
  it('fail without a valid token', function(done) {
    request(app)
      .post('/recipients')
      .set('x-api-token', 'ksdksfkdsfkdnsf')
      .send( {recipient: recipient_data} )
      .end(function(err, res) {
        expect(res.statusCode).toEqual(401);
        done();
      })
  })

  it('creates a recipient with the proper method and sender_id', function(done) {
    request(app)
      .post('/recipients')

      .set('x-api-token', token)
      .send( {recipient: recipient_data} )
      .end(function(err, res) {
        expect(res.statusCode).toEqual(200)
        models.Recipient.findOne({where: {sender_id: user.id}}).then(function(recipient) {
          expect(recipient.phone).toEqual(recipient_data.phone.toString())
          done()
        })
      })
  })


  it('responds with the id of the id of the newly created recipient', function(done) {
    request(app)
      .post('/recipients')

      .set('x-api-token', token)
      .send( {recipient: recipient_data} )
      .end(function(err, res) {
        expect(res.statusCode).toEqual(200)
        models.Recipient.findOne({where: {sender_id: user.id}}).then(function(recipient) {
          expect(recipient.phone).toEqual(recipient_data.phone.toString())
          expect(res.body.recipient_id).toBeGreaterThan(0)
          done()
        })
      })
  })
})

describe('GET recipients', function() {

  var user, token, recipient;

  beforeEach(function(done) {

      factory.create('user').then(function(new_user) {
        user = new_user;
        token = jwt.createJwt({user_id: user.id, usd_amount: 6})

        return creators.recipient.create_with_verifs({
          phone: 4783920,
          email: '',
          name: "Bob in Manilla",
          sender_id: user.id
        })
      }).then(function(new_recipient) {
        recipient = new_recipient;
        done();
      }).catch(function(err) { throw err; })
    })

  it('should return a list of recipients saved by the user using the user_id in the token', function(done) {
    request(app)
      .get('/recipients')
      .set('x-api-token', token)
      .end(function(err, res) {
        expect(res.statusCode).toEqual(200)
        expect(res.body.recipients[0].sender_id).toEqual(user.id)
        expect(res.body.recipients[0].name).toEqual("Bob in Manilla")
        done()
      })
    })
})




