
module.exports = function(app, stuff) {

/* GET home page. */
	app.get('/', function(req, res, next) {
	console.log('here?');
		res.render('index', { title: 'Express' });
	});
};

