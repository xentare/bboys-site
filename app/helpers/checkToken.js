var User = require('../models/user');

module.exports = function (req, res, next) {
	if (typeof req.cookies.apiKey == 'undefined') {
		res.invalidAuth();
	} else {
		User.findOne({
			apiKey: req.cookies.apiKey
		}).then(function (doc) {
			if (doc) {
				req.user = doc;
				next();
			} else {
				res.invalidAuth();
			}
		}, function (err) {
			res.badRequest();
		});
	}
}