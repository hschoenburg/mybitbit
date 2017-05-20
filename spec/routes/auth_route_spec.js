var app = require('../../app')
var request = require('supertest')
var factory = require('../support/helpers').factory
var models = require('../support/helpers').models
var Promise = require('bluebird');

var user;
  

describe('auth/facebook Sign Up', function() {

  var profile_data = { 
    email: "blahblah@gmail.com", 
    first_name: "Hands", 
    last_name: "Shownborg", 
    name: "Hands Shownborg", 
    timezone: -6, 
    verified: true, 
    id: "blahblahblah", 
    picture: "https://graph.facebook.com/10101583…", 
    thumbnail: "https://graph.facebook.com/10101583…"
  }
  var token = "blahblahblah";

  it('should create a user with token and profile data', function(done) {
    request(app)
      .post('/auth/facebook/')
      .send( {token: token, profile: profile_data} )
      .end(function(err, res) {
        expect(res.statusCode).toEqual(200)

        models.User.findOne({where: {facebook_token: token}}).then(function(new_user) {
          expect(new_user.first_name).toEqual(profile_data.first_name)
          expect(new_user.last_name).toEqual(profile_data.last_name)
          expect(new_user.email).toEqual(profile_data.email)
          expect(new_user.facebook_id).toEqual(profile_data.id)
          done();
        })
      })
    })
})


/*
  beforeAll(function(done) {
    factory.create('user').then(function(new_user) {
      user = new_user;
    })
  })
*/

