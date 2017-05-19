
module.exports = function(app, passport, models) {

	app.get('/', function(req, res, next) {
		res.render('index', { title: 'My BitBit', user: req.user})
	});

  app.get('/private', authCheck, function(req, res, next) {
    res.send("You are Authenticated");
  })
}

function authCheck(req, res, next) {

  if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect('/')
  }
}


