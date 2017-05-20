var models = require('../models/index')
var creators = require('../lib/creators/index')
var jwt = require('../lib/jwt_utils')

module.exports = function(app) {

  app.post('/auth/facebook', function(req, res, next) {

    var profile = req.body.profile;

    models.User.findAll({where: { facebook_id: profile.facebook_id, email: profile.email } }).then(function(user) {

      if(user.email) {
        jwt.createJwt(profile).then(function(jwt) {
          res.json({token: jwt })
        })
      } else {

        creators.user.create_from_facebook(profile).then(function(newUser) {
          return jwt.createJwt(profile)
        }).then(function(jwt) {
            res.json({token: jwt })
        }).catch(function(err) {
          throw err;
          res.send(err)
        })
      }
    })
  })


  app.get('/auth/logout', function(req, res, next) {
    req.session.destroy(function(err) {
      if(err) { throw err; }
      res.redirect('/')
    })
  })
}
