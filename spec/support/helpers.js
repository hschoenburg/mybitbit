process.env.NODE_ENV='test'

var models = require('../../models/index')
var factory = require('../support/factory')

module.exports = {

  factory: factory(models),

  models: models

}



