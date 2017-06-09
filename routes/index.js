
module.exports = function(app) {

	app.get('/', function(req, res, next) {

    var bundle_path;

    if(process.env.NODE_ENV == 'development') {
      bundle_path = 'http://localhost:8080/client_bundle.js'
    } else if(process.env.NODE_ENV == 'production') {
      bundle_path = '/javascripts/client_bundle.js'
    }
      
		res.render('index', { title: 'My BitBit', user: req.user, bundle_path: bundle_path })
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


