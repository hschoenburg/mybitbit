
module.exports = function(app, stuff) {

/* GET home page. */
	app.get('/', setSessionUser, function(req, res, next) {
		res.render('index', { title: 'My BitBit', user: req.user})
	});

  app.get('/private', authCheck, function(req, res, next) {
    res.send("You are Authenticated");
  })
}

function setSessionUser(req, res, next) {

// if user is authenticated in the session, carry on 
  if (req.isAuthenticated()) {
    req.user = req.session.passport.user
  } else {
    req.user = false;
  }
  return next();
}



function authCheck(req, res, next) {

// if user is authenticated in the session, carry on 
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect('/')
  }
}


