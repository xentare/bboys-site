var Post = require('../models/post');
var checkToken = require('../helpers/checkToken');
var checkReqParams = require('../helpers/checkReqParams');

module.exports = function (app) {

	app.get('/api/post/all', function (req, res, next) {
		Post.find({
			hidden: 'false'
		}, function (err, data) {
			if (err) {
				res.status(400).send({
					err: err
				});
			} else {
				res.status(200).send({
					data: data
				});
			}

			next();
		});
	});

	app.post('/api/post', checkToken, function (req, res, next) {
		var params = req.body;
		var post = new Post({
			title: params.title,
			content: params.content,
			idUser: req.cookies.user._id
		});
		post.save(function (err) {
			if (err) {
				res.send({
					err: err,
					msg: 'Error while adding post',
					success: false
				}, 400);
			} else {
				res.send({
					msg: 'Post added succesfully',
					success: true
				}, 200);
			}

			next();
		});
	});

	app.put('/api/post', checkToken, function (req, res, next) {
		var params = req.body;

		if (typeof params._id == 'undefined') {
			res.send({
				err: 'Post id not found',
				msg: 'Post id not found',
				success: false
			}, 400);
			next();
		}

		Post.findOne({
			_id: params._id
		}, function (err, post) {
			if (err) {
				res.send({
					err: err,
					msg: 'Can\'t find post to update',
					success: false
				}, 400);
				next();
			}

			if (post) {
				post.update({
					title: params.title || 'Untitled',
					content: params.content || 'Empty content'
				}, function (err) {
					if (err) {
						res.send({
							err: err,
							msg: 'Can\'t update',
							success: false
						}, 200);
						next();
					}

					res.send({
						msg: 'Updated succesfully',
						success: true
					}, 200);
					next();
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
						res.send({
							err: err,
							msg: 'Deletion failed',
							success: false
						}, 400);
						next();
					} else {
						res.send({
							msg: 'Deletion success',
							success: true
						}, 200);
						next();
					}
				});
			}
		})

	});
}