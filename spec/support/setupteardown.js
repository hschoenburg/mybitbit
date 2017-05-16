var models = require('../../models/index')

var Promise = require('bluebird')

beforeAll(function(done) {
  if(process.env.NODE_ENV === 'test') {

    Promise.join(
    models.User.destroy({truncate: true, restartIdentity: true }),
      models.Debit.destroy({truncate: true}),
      models.Credit.destroy({truncate: true}),
      function(stuff) {
        done();
      }
    )
  } else {
    done();
  }
})

afterEach(function(done) {
    done();
})



