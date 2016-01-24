var User = require('../models/user');
var checkToken = require('../helpers/checkToken');

module.exports = function (app) {

	app.get('/api/user/all', checkToken, function (req, res, next) {
		User.find({}, function (err, data) {
			if (err) {
				res.send({
					err: err
				}, 400);
			} else {
				res.send({
					data: data
				}, 200);
			}

			next();
		});
	});

	app.get('/api/user/current', checkToken, function (req, res, next) {
		User.findOne({
			_id: req.cookies.user._id
		}, function (err, user) {
			if (err) {
				res.send({
					err: err,
					msg: 'Can\'t find user',
					success: false
				}, 400);
				next();
			} else {
				if (user) {
					res.send({
						data: user,
						msg: 'User found',
						success: true
					}, 200);
					next();
				} else {
					res.send({
						msg: 'Can\'t find user',
						success: false
					}, 200);
					next();
				}
			}
		});
	});

	app.get('/api/user/public', function (req, res, next) {
		User.find({}, '_id username', function (err, users) {
			if (err) {
				res.send({
					err: err,
					msg: 'Can\'t find users',
					success: false
				}, 400);
				next();
			} else {
				if (users) {
					res.send({
						data: users,
						msg: 'Users found',
						success: true
					}, 200);
					next();
				} else {
					res.send({
						msg: 'Users not found',
						success: false
					}, 200);
					next();
				}
			}
		});
	});
}