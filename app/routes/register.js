/**
 * Created by Juha on 23/01/16.
 */

var User = require('../models/user');
var bcrypt = require('bcrypt');
var hashes = require('../helpers/hashes');

module.exports = function (app) {

	app.post('/api/register', function (req, res, next) {
		var params = req.body;

		if (!params.username || !params.password) {
			res.status(400).send({
				msg: 'All required parameters were not received.',
			});

			next();
		} else {
			User.find({
				username: params.username
			}, function (err, user) {
				if (user.username) {
					res.status(400).send({
						msg: 'Username already in use',
						data: user,
						success: false
					});
					next();
				} else {
					var md5 = hashes.random('md5'); 

					console.log(params.password);  
					var hash = bcrypt.hashSync(params.password, 10);

					User.create({
						username: params.username,
						password: hash,
						apiKey: md5
					}, function (err, user) {
						console.log(user);
						if (err) {
							res.status(400).send({
								success: false,
								err: err
							});
							next();
						} else {
							res.status(200).send({
								success: true
							});
							next();
						}
					});
				}

			});
		}

	});

};
