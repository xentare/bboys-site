var User = require('../models/user');

module.exports = function (req, res, next) {
	if (typeof req.cookies.user == "undefined" || req.cookies.user == "undefined") {
		res.redirect('/login');
		next();
	} else {
		
		User.findOne({
			_id: req.cookies.user._id,
			apiKey: req.cookies.user.apiKey
		}, function (err, user) {
			if (err || !user) {
				res.redirect('/login');
				next();
			}
		});

		next();
	}
}