var checkToken = require('../helpers/checkToken');
var Invitation = require('../models/invitation');

module.exports = function (app) {

	app.get('/', function (req, res, next) {
		res.render('index.ejs');
	});

	app.get('/login', function (req, res, next) {
		res.render('login.ejs');
	});

	app.get('/register', function (req, res, next) {
		var params = req.query;
		Invitation.findOne({
			valid: true,
			key: params.invitationKey
		}).then(function (doc) {
			if (doc) {
				res.render('register.ejs');
			} else {
				res.render('invitation404.ejs');
			}
		}, function (err) {
			res.render('invitation404.ejs');
		});
	});

	app.get('/logout', function (req, res, next) {
		res.cookie('apiKey', undefined);
		res.redirect('/login');
	}); 

	app.get('/edit', checkToken, function (req, res, next) {
		res.render('edit.ejs');
	});

	app.get('/blog', function (req, res, next) {
		res.render('blog.ejs');
	});

	app.get('/api', function (req, res, next) {
		res.render('api.ejs');
	});
}