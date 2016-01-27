var hashes = require('../helpers/hashes');
var User = require('../models/user');
var bcrypt = require('bcrypt');
var checkReqParams = require('../helpers/checkReqParams');

module.exports = function (app) {

	app.post('/api/login', checkReqParams('username', 'password'), function (req, res, next) {
		var params = req.body;

		User.findOne({
			username: params.username
		}).then(function (doc) {
			if (doc) {
				var match = bcrypt.compareSync(params.password, doc.password);
				if (match) {
					res.cookie('apiKey', doc.apiKey, { maxAge: 900000 });
					res.success();
				} else {
					res.invalidAuth();
				}
			} else {
				res.actionFailed();
			}
		}, function (err) {
			res.badRequest();
		});
	});
}