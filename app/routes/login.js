var hashes = require('../helpers/hashes');
var User = require('../models/user');
var bcrypt = require('bcrypt');

module.exports = function (app) {

	app.post('/api/login', function (req, res, next) {
		var params = req.body;

		if (!params.username || !params.password) {
			res.status(400).send({
				msg: 'All required fields were not received.',
				success: false
			});
			next();
		}

		User.findOne({
			username: params.username
		}, function (error, user) {

			if (error) {
				res.status(400).send({
					err: error,
					msg: 'Username or password incorrent.',
					success: false
				});

				next();
			} else {

				var match = bcrypt.compareSync(params.password, user.password);

				if (match) {
					res.status(200).send({
						data: user,
						msg: 'Login succesfull',
						success: true
					});

					next();
				} else {
					res.status(400).send({
						msg: 'Login failed',
						success: false
					});

					next();
				}
			}

		});

	});
}