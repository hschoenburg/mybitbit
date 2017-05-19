var app = require('../../app')
var request = require('supertest')
var factory = require('../support/helpers').factory
var models = require('../support/helpers').models

  var user;
  
  beforeAll(function(done) {
    factory.create('user').then(function(new_user) {
      user =  new_user;
      done()
    })
  })

describe('account/balance/:user_id', function() {

  it('should look up user from named param', function(done) {

    request(app)
      .get('/account/balance/' + user.id)
      .end(function(err, res) {
        expect(res.body.user_id).toEqual(user.id);
        done()
      })
  })

  it('should return users balance', function(done) {
    done();

  })

})
