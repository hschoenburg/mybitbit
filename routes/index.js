
module.exports = function(app, stuff) {

/* GET home page. */
	app.get('/', function(req, res, next) {
		res.render('index', { title: 'My BitBit'})
	});
};

function isLoggedIn(req, res, next) {

// if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}

