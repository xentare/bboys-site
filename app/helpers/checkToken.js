var User = require('../models/user');

module.exports = function (req, res, next) {
	if (typeof req.cookies.apiKey == "undefined") {
		res.invalidAuth();
	} else {
		User.findOne({
			apiKey: req.cookies.apiKey
		}, function (err, user) {
			if (err || !user) {
				res.invalidAuth();
			} else {
				req.user = user;
				next();
			}
		});
	}
}