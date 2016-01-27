var Post = require('../models/post');
var User = require('../models/user');
var checkToken = require('../helpers/checkToken');
var checkReqParams = require('../helpers/checkReqParams');

module.exports = function (app) {

	app.get('/api/post/all', function (req, res, next) {
		Post.find({
			hidden: 'false'
		}, 'title idUser content').then(function (doc) {
			User.find({}, 'username _id').then(function (users) {

				for (var i = 0; i < doc.length; i++) {
					// conver Mongoose Document Object to plain JS object
					doc[i] = doc[i].toObject();

					for (var j = 0; j < users.length; j++) {
						if (doc[i].idUser == users[j]._id) {
							doc[i].username = users[j].username;
							delete doc[i].idUser;
							break;
						}
					}
				}

				res.success(doc);
			});

		}, function (err) {
			res.badRequest();
		});
	});

	app.post('/api/post', checkToken, function (req, res, next) {
		var params = req.body;

		Post.create({
			title: params.title,
			content: params.content,
			idUser: req.user._id
		}).then(function (doc) {
			res.success(doc);
		}, function (err) {
			res.actionFailed();
		});
	});

	app.put('/api/post', checkToken, checkReqParams('_id'), function (req, res, next) {
		var params = req.body;

		Post.findOne({
			_id: params._id
		}).then(function (doc) {
			if (doc) {
				doc.update({
					title: params.title,
					content: params.content
				}).then(function (doc) {
					if (doc) {
						res.success(doc);
					} else {
						res.actionFailed();
					}
				});
			} else {
				res.notFoundErr();
			}
		});
	});

	app.delete('/api/post', checkToken, checkReqParams('_id'), function (req, res, next) {
		var params = req.body;

		Post.findOne({
			_id: params._id
		}).then(function (doc) {
			if (doc) {
				doc.update({
					hidden: true
				}).then(function (doc) {
					if (doc) {
						res.success(doc);
					} else {
						res.actionFailed();
					}
				});
			} else {
				res.notFoundErr();
			}
		});
	});
}