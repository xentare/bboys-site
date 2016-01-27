var checkLogin = require('../helpers/checkLogin');
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
			key: params.invitationKey
		}, function (err, invitation) {
			if (err) {
				res.render('invitation404.ejs');
			} else {
				if (!invitation) {
					res.render('invitation404.ejs');
				} else {
					res.render('register.ejs');
				}
			}
		});

	});

	app.get('/logout', function (req, res, next) {
		res.cookie('apiKey', undefined);
		res.redirect('/login');
	}); 

	app.get('/edit', checkLogin, function (req, res, next) {
		res.render('edit.ejs');
	});

	app.get('/blog', function (req, res, next) {
		res.render('blog.ejs');
	});

	app.get('/api', function (req, res, next) {
		res.render('api.ejs');
	});
}