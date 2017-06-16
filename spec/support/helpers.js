process.env.NODE_ENV='test'
require('dotenv').config({path: '.env'})
var models = require('../../models/index')
var factory = require('../support/factory')

module.exports = {

  factory: factory(models),

  models: models

}



