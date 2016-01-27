/**
 * Created by Juha on 23/01/16.
 */

var User = require('../models/user');
var Invitation = require('../models/invitation')
var bcrypt = require('bcrypt');
var hashes = require('../helpers/hashes');
var checkReqParams = require('../helpers/checkReqParams');

module.exports = function (app) {

	app.post('/api/register', checkReqParams('apiKey', 'username', 'password', 'passwordagain'), function (req, res, next) {
		var params = req.body;

		Invitation.findOne({
			key: params.apiKey
		}).then(function (doc) {
			if (doc && doc.key == params.apiKey) {

				User.findOne({
					username: params.username
				}).then(function (doc) {
					if (doc) {
						res.actionFailed();
					} else {
						var md5 = hashes.random('md5');
						var hash = bcrypt.hashSync(params.password, 10);

						User.create({
							username: params.username,
							password: hash,
							apiKey: md5
						}).then(function (doc) {
							doc.update({
								valid: false
							});
							res.success(doc);
						}, function (err) {
							res.actionFailed();
						});
					}
				});
			}
		}, function (err) {
			res.actionFailed();
		});
	});
};
