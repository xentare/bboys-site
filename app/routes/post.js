var Post = require('../models/post');
var checkToken = require('../helpers/checkToken');
var checkReqParams = require('../helpers/checkReqParams');

module.exports = function (app) {

	app.get('/api/post/all', function (req, res, next) {
		Post.find({
			hidden: 'false'
		}).then(function (doc) {
			res.success(doc);
		}, function (err) {
			res.badRequest();
		});
	});

	app.post('/api/post', checkToken, checkReqParams('title', 'content'), function (req, res, next) {
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