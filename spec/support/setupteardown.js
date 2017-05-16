var models = require('../../models/index')

beforeAll(function(done) {
  if(process.env.NODE_ENV === 'test') {
    models.User.destroy({truncate: true, restartIdentity: true }).then(function() {
      done();
    })
  } else {
    done();
  }
})

afterEach(function(done) {
    done();
})



