// config/passport.js

var models = require('../models/index')
var user_creator = require('../lib/user_creator')

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
      console.log(profile);
      // Notes
      // Try to look up the user in the database, then sign them in
      // If you cant find them,
      // Create a lib object user_creator.js that takes the fb data and saves the user to the db
      // Probably sends a confirmation email as well, validates data etc.
      // Mock the FB data and unit test the user_creator.js
      // done!
      // find the user in the database based on their facebook id
      models.User.findOne({where: { facebook_id: profile.id } }).then(function(user) {
        if(user) {
          return done(null, user)
        } else {
        // if there is no user found with that facebook id, create them
          user_creator.create_from_facebook({
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
