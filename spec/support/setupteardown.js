var models = require('../../models/index')
require('dotenv').config({path: '../../.env'})


var Promise = require('bluebird')

beforeAll(function(done) {
  require('dotenv').config({path: '../../.env'})
  done();
})

beforeEach(function(done) {

  if(process.env.NODE_ENV === 'test') {

    Promise.join(
      models.User.destroy({truncate: true, restartIdentity: true }),
      models.Debit.destroy({truncate: true}),
      models.Credit.destroy({truncate: true}),
      models.Verif.destroy({truncate: true}),
      function(stuff) {
        done();
      }
    )
  } else {
    done();
  }
})




