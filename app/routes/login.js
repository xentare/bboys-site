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
				res.success(doc);
			} else {
				res.actionFailed();
			}
		}, function (err) {
			res.badRequest();
		});
	});
}