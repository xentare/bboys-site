var User = require('../models/user');
var checkToken = require('../helpers/checkToken');
var checkReqParams = require('../helpers/checkReqParams');

module.exports = function (app) {

	app.get('/api/user/all', checkToken, function (req, res, next) {
		User.find({}).then(function (docs) {
			res.success(docs);
		}, function (err) {
			res.badRequest();
		});
	});

	app.get('/api/user/current', checkToken, function (req, res, next) {
		User.findOne({
			_id: req.user._id
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

	app.post('/api/user/current', checkToken, function (req, res, next) {
		var params = req.body;

		User.findOne({
			_id: req.user._id
		}).then(function (user) {
			if (user) {
				user.username = params.username || user.username;
				user.email = params.email || user.email;

				user.save().then(function (doc) {
					res.success(doc);
				}, function (err) {
					res.actionFailed();
				});
			} else {
				res.actionFailed();
			}
		}, function (err) {
			res.badRequest();
		});
	});

	app.post('/api/user/avatar', checkToken, checkReqParams('avatar'), function (req, res, next) {
		var params = req.body;

		User.findOne({
			_id: req.user._id
		}).then(function (doc) {
			if (doc) {
				console.log(doc);
				doc.avatar = params.avatar;
				doc.save().then(function (doc) {
					res.success(doc);
				}, function (err) {
					res.actionFailed();
				});
			} else {
				res.actionFailed();
			}
		}, function (err) {
			res.actionFailed();
		});
	});

	app.get('/api/user/public', function (req, res, next) {
		User.find({}, '_id username').then(function (doc) {
			res.success(doc);
		}, function (err) {
			res.actionFailed();
		});
	});
}