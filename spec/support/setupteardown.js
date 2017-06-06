var models = require('../../models/index')
var dotenv = require('dotenv').config({path: '../../.env'})

var Promise = require('bluebird')

afterEach(function(done) {
  if(process.env.NODE_ENV === 'test') {

    Promise.join(
      models.User.destroy({truncate: true, restartIdentity: true }),
      models.Debit.destroy({truncate: true}),
      models.Credit.destroy({truncate: true}),
      models.Recipient.destroy({truncate: true}),
      function(stuff) {
        done();
      }
    )
  } else {
    done();
  }
})




