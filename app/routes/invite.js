var hashes = require('../helpers/hashes');
var User = require('../models/user');
var bcrypt = require('bcrypt');
var checkToken = require('../helpers/checkToken');
var Invitation = require('../models/invitation');

module.exports = function (app) {

	app.get('/api/invite', checkToken, function (req, res, next) {
		var params = req.body;

		var md5 = hashes.random('md5');

		Invitation.create({
			key: md5,
			valid: true
		}).then(function (doc) {
			res.success(doc);
		}, function (err) {
			res.success(err);
		});
	});
}