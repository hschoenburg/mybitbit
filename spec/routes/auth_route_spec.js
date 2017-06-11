var app = require('../../app')
var request = require('supertest')
var factory = require('../support/helpers').factory
var models = require('../support/helpers').models
var creators = require('../../lib/creators/index')
var Promise = require('bluebird')
var jwt = require('../../lib/jwt_utils')

var user;

var profile_data = { 
  email: "blahblah@gmail.com", 
  first_name: "Hands", 
  last_name: "Shownborg", 
  name: "Hands Shownborg", 
  timezone: -6, 
  verified: true, 
  facebook_id: "982398329847293478",
  facebook_token: 'blahblahblah',
  picture: "https://graph.facebook.com/10101583…", 
  thumbnail: "https://graph.facebook.com/10101583…"
}


describe('auth/facebook Sign Up', function() {

  it('should create a user with token and profile data', function(done) {
    request(app)
      .post('/auth/facebook/')
      .send( {profile: profile_data} )
      .end(function(err, res) {
        expect(res.statusCode).toEqual(200)

        models.User.findOne({where: {facebook_token: profile_data.facebook_token}}).then(function(new_user) {
          expect(new_user.first_name).toEqual(profile_data.first_name)
          expect(new_user.last_name).toEqual(profile_data.last_name)
          expect(new_user.email).toEqual(profile_data.email)
          expect(new_user.facebook_id).toEqual(profile_data.facebook_id)
          done();
        })
      })
    })

  it('should grant the user $1 in Credit', function(done) {

    request(app)
      .post('/auth/facebook/')
      .send( {profile: profile_data} )
      .end(function(err, res) {
        expect(res.statusCode).toEqual(200)
        done()

      })
  })

  it('should send the user a verification email', function(done) {


    request(app)
      .post('/auth/facebook/')
      .send( {profile: profile_data} )
      .end(function(err, res) {
        expect(res.statusCode).toEqual(200)
        models.Credit.findAll({where: {user_id: res.body.user_id}})
        .then(function(credits) {

          var total = credits.reduce(function(total, item) { return total + item.usd_amount }, 0)
          expect(total).toEqual(1)
            done()
        }).catch(function(err) {
          throw err;
        })
      })
  })

  it('should respond with a jwt and user_id', function(done) {

    request(app)
      .post('/auth/facebook/')
      .send( {profile: profile_data} )
      .end(function(err, res) {
        expect(res.statusCode).toEqual(200)
        expect(res.body.user_id).toBeGreaterThan(0)
        var token_data = jwt.verifyJwt(res.body.token)
        
        expect(token_data.profile.email).toEqual(profile_data.email)
        done();
      })
   })
})

describe('auth/facebook Log In', function() {

  var user;

  beforeEach(function(done) {

    creators.user.create_from_facebook(profile_data).then(function(new_user) {
      user = new_user;
      done();
    })
  })

  it('should not create a new user for the same facebook id', function(done) {


    request(app)
      .post('/auth/facebook/')
      .send( {profile: profile_data} )
      .end(function(err, res) {

        models.User.findAll({where: {facebook_token: profile_data.facebook_token}}).then(function(existing_user) {
          expect(existing_user.length).toEqual(1);
          done();
        })
      })

  })

  it('should look up the user and respond with a valid jwt', function(done) {
    request(app)
      .post('/auth/facebook/')
      .send( {profile: profile_data} )
      .end(function(err, res) {
        expect(res.statusCode).toEqual(200)

        var token_data = jwt.verifyJwt(res.body.token)
        expect(token_data.profile.email).toEqual(profile_data.email)
        done();
      })
  })

  it('should respond with a token and a user_id', function(done) {
    request(app)
      .post('/auth/facebook/')
      .send( {profile: profile_data} )
      .end(function(err, res) {
        expect(res.statusCode).toEqual(200)
        expect(res.body.token).not.toBe(undefined)
        expect(res.body.user_id).not.toBe(undefined)
        done()
      })
  })
})
