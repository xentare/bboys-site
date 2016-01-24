var Post = require('../models/post');

module.exports = function (app) {

	app.get('/api/post/all', function (req, res, next) {
		Post.find({
			hidden: 'false'
		}, function (err, data) {
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

	app.post('/api/post', function (req, res, next) {
		var params = req.body;
		var post = new Post({
			title: params.title,
			content: params.content
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

	app.delete('/api/post', function (req, res, next) {
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