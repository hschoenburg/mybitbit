
var helpers = require('../support/helpers')

describe('User', function() {

  it('should have a first_name prop', function(done) {
    helpers.factory.build('user').then(function(user) {
      expect(user.first_name).toEqual('AJ');
      user.save().then(function(user) {
        done();
      })
    }).catch(function(err) {
      done(err);
    })
  })
})
