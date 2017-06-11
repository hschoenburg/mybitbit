var models = require('../models/index')
var creators = require('../lib/creators/index')
var jwt = require('../lib/jwt_utils')

module.exports = function(app) {

  app.post('/auth/facebook', function(req, res, next) {
    console.log("$$$$$$$$$$$$$$$$$$$$$$$")

    var profile = req.body.profile;
    console.log(req.body)
    console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
    console.log(profile)
    console.log('##################################' + profile)

    models.User.findAll({where: { facebook_id: profile.facebook_id, email: profile.email } }).then(function(user) {

      if(user.length > 0) {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@" + token)
        var token = jwt.createJwt({profile: profile, user_id: user[0].id})
        res.json({token: token, user_id: user[0].id})
      } else {
        var savedNewUser;
        creators.user.create_from_facebook(profile).then(function(newUser) {
          savedNewUser = newUser;

          // Create $1 Signup Credit
          return creators.credit.createForReward(1, newUser.id)
        }).then(function(credit) {
          var token = jwt.createJwt({profile: profile, user_id: savedNewUser.id})
          res.json({token: token, user_id: savedNewUser.id})
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
