
module.exports = function(app, stuff) {

/* GET home page. */
	app.get('/', function(req, res, next) {
		res.render('index', { title: 'My BitBit' });
	});
};

