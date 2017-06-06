var models = require('../models/index')
var creators = require('../lib/creators/index')
var jwt = require('../lib/jwt_utils')

module.exports = function(app) {

  app.post('/auth/facebook', function(req, res, next) {

    var profile = req.body.profile;

    models.User.findAll({where: { facebook_id: profile.facebook_id, email: profile.email } }).then(function(user) {

      if(user.length > 0) {
        jwt.createJwt(profile).then(function(jwt) {
          res.json({token: jwt, user_id: user[0].id})
        })
      } else {
        var savedNewUser;
        creators.user.create_from_facebook(profile).then(function(newUser) {
          savedNewUser = newUser;
          return jwt.createJwt(profile)
        }).then(function(jwt) {
            res.json({token: jwt, user_id: savedNewUser.id})
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
