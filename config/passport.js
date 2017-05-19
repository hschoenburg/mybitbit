// config/passport.js

var models = require('../models/index')
var creators = require('../lib/creators/index')

var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(user, done) {
      models.User.findById(user.id).
        then(function(user) {
          done(null, user);
        }).catch(function(err) { done(err, null)})
    });
    
    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : process.env.FB_ID,
        clientSecret    : process.env.FB_SECRET,
        callbackURL     : process.env.FB_CALLBACK,
        profileFields   : ['id', 'emails', 'name']

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

      models.User.findOne({where: { facebook_id: profile.id } }).then(function(user) {
        if(user) {
          return done(null, user)
        } else {
        // if there is no user found with that facebook id, create them
          creators.user.create_from_facebook({
            email: profile.emails[0].value,
            facebook_id: profile.id,
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            facebook_token: token
          }).then(function(newUser) {
            return done(null, newUser);
          })
        }
      }).catch(function(err) {
        return done(err);
      })
    }))
  }
