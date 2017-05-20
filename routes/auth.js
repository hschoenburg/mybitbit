var models = require('../models/index')
var creators = require('../lib/creators/index')

module.exports = function(app) {

  app.post('/auth/facebook', function(req, res, next) {

    var profile = req.body.profile;
    var token = req.body.token;

    models.User.findAll({where: { facebook_id: profile.id, email: profile.email } }).then(function(user) {
      if(user.email) {
        console.log("FOUND THE USER");
        console.log(user);
        res.json('hey');
      } else {
        console.log('NO USER FOUND INSERTING NEW USER')

        creators.user.create_from_facebook({
          email:          profile.email,
          facebook_id:    profile.id,
          first_name:     profile.first_name,
          last_name:      profile.last_name,
          facebook_token: token
        }).then(function(newUser) {
          res.json('hey');
        }).catch(function(err) {
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
