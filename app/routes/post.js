var Post = require('../models/post');

module.exports = function (app) {

	app.get('/api/post/all', function (req, res, next) {
		Post.find({}, function (err, data) {
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
					err: err
				}, 400);
			} else {
				res.send({
					success: true
				})
			}

			next();
		});
	});
}