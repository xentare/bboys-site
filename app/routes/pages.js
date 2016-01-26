var checkLogin = require('../helpers/checkLogin');


module.exports = function (app) {

	app.get('/', function (req, res, next) {
		res.render('index.ejs');
		next();
	});

	app.get('/login', function (req, res, next) {
		res.render('login.ejs');
		next();
	});

	app.get('/register', function (req, res, next) {
		var params = req.query;
		Invitation.findOne({
			key: params.invitationKey
		}, function (err, invitation) {
			if (err) {
				res.render('invitation404.ejs');
				next();
			} else {
				if (!invitation) {
					res.render('invitation404.ejs');
					next();
				} else {
					res.render('register.ejs');
					next();
				}
			}
		});

	});

	app.get('/logout', function (req, res, next) {
		res.cookie('user', undefined);
		res.redirect('/login');
		next();
	}); 

	app.get('/edit', checkLogin, function (req, res, next) {
		res.render('edit.ejs');
		next();
	});

	app.get('/blog', function (req, res, next) {
		res.render('blog.ejs');
		next();
	});

	app.get('/api', function (req, res, next) {
		res.render('api.ejs');
		next();
	});
}