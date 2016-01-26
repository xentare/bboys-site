var Post = require('../models/post');
var checkToken = require('../helpers/checkToken');
var checkReqParams = require('../helpers/checkReqParams');

module.exports = function (app) {

	app.get('/api/post/all', function (req, res, next) {
		Post.find({
			hidden: 'false'
		}, function (err, data) {
			if (err) {
				res.actionFailed();
			} else {
				res.success(data);
			}
		});
	});

	app.post('/api/post', checkToken, checkReqParams('title', 'content'), function (req, res, next) {
		var params = req.body;

		var post = new Post({
			title: params.title,
			content: params.content,
			idUser: req.cookies.user._id
		});

		post.save(function (err) {
			if (err) {
				res.actionFailed();
			} else {
				res.success();
			}
		});
	});

	app.put('/api/post', checkReqParams('_id'), checkToken, function (req, res, next) {
		var params = req.body;
		Post.findOne({
			_id: params._id
		}, function (err, post) {
			if (err) {
				res.actionFailed();
			}

			if (post) {
				post.update({
					title: params.title || 'Untitled',
					content: params.content || 'Empty content'
				}, function (err) {
					if (err) {
						res.actionFailed();
					}

					res.success();
				})
			}
		});
	});

	app.delete('/api/post', checkToken, function (req, res, next) {
		var params = req.body;
		console.log(params);
		Post.findOne({
			_id: params._id
		}, function (err, post) {
			if (post) {
				post.update({
					hidden: true
				}, function (err) {
					if (err) {
						res.actionFailed();
					} else {
						res.success();
					}
				});
			}
		})

	});
}