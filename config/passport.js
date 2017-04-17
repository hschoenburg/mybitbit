// config/passport.js

var models = require('../models/index')

var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
      models.user.findAll({ where: { id: id }}).
        then(function(user) {
          if(!user) { done("USER NOT FOUND") }
            done(user);
        });
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
      return done(null, {id: 1})
      // Notes
      // Try to look up the user in the database, then sign them in
      // If you cant find them,
      // Create a lib object user_creator.js that takes the fb data and saves the user to the db
      // Probably sends a confirmation email as well, validates data etc.
      // Mock the FB data and unit test the user_creator.js
    }
  ))
}
          /*
            // find the user in the database based on their facebook id
            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser            = new User();

                    // set all of the facebook information in our user model
                    newUser.facebook.id    = profile.id; // set the users facebook id                   
                    newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                    newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                    newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                    // save our user to the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });
        });

    }));

  */
