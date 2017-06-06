var models = require('../models/index')
var creators = require('../lib/creators/index')

module.exports = function(app) {

  app.post('/recipients', function(req, res, next) {
    // create recipient and verifs from params

    var profile = req.body.profile;

    models.User.findAll({where: { facebook_id: profile.facebook_id, email: profile.email } }).then(function(user) {
