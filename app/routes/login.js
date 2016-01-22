var hashes = require('../helpers/hashes');
var User = require('../models/user');
var bcrypt = require('bcrypt');

module.exports = function (app) {

	app.post('/api/login', function (req, res, next) {
		var params = req.body;

		if (!params.username || !params.password) {
			res.send({
				msg: 'All required fields was not received.'
			}, 400);
			next();
		}

		User.findOne({
			username: params.username
		}, function (error, user) {

			if (error) {
				res.send({
					err: error,
					msg: 'Can\'t login'
				}, 400);

				next();
			} else {

				var match = bcrypt.compareSync(params.password, user.password);

				if (match) {
					res.send({
						data: user,
						msg: 'Login succesfull'
					}, 200);
					next();
				} else {
					res.send({
						msg: 'Login failed'
					}, 400);
					next();
				}
			}

		});

	});
}