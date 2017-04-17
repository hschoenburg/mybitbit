
module.exports = function(app, passport) {

  // send to facebook to do the authentication
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
      passport.authenticate('facebook', {
          successRedirect : '/fbsuccess',
          failureRedirect : '/fbfail'
      })
  );

  app.get('/fbsuccess', function(req, res, next) {
    res.send("FB SUCCESS")
  })

  app.get('/fbfail', function(req, res, next) {
    res.send('FB FAIL');
    console.log("FACEBOOK FAIL")
  })

}
