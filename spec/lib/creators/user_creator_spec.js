var helpers = require('../../support/helpers')

var creator = require('../../../lib/creators/user_creator')

describe('create_from_facebook', function() {

  var mock_fb_data = {
    email: 'pam@stellar.org',
    facebook_id: 234234
  }

  it('takes fb_data and returns a user', function(done) {
    creator.create_from_facebook(mock_fb_data).then(function(user) {
      expect(user.email).toEqual(mock_fb_data.email)
      done();
    })
  })

  it('takes fb_data and saves a user to the db', function(done) {
    creator.create_from_facebook(mock_fb_data)
      .then(function(user) {
        return helpers.models.User.findById(user.id)
      })
      .then(function(saved_user){
        expect(saved_user.id).toBeGreaterThan(0);
        expect(saved_user.email).toEqual(mock_fb_data.email)
        done();
      })
  })

});

