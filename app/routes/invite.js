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
			key: md5
		}, function (err, invitation) {
			if (err) {
				res.status(400).send({
					err: err,
					msg: 'Can\'t create invitation',
					success: false
				});
				next();
			} else {
				if (invitation) {
					res.status(200).send({
						msg: 'Invitation created',
						data: invitation,
						success: true
					});
					next();
				} else {
					res.status(400).send({
						msg: 'Can\'t create invitation',
						success: false
					});
					next();
				}
			}
		});

	});
}