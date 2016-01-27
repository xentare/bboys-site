var request = require('request');

module.exports = function (app) {

	app.post('/api/slack', function (req, res, next) {
		var webhook = 'https://hooks.slack.com/services/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';
		var params = req.body;

		if (!params.name || !params.email) {
			res.json({
				msg: 'All required fields were not filled.'
			}, 400);
			next();
		}

		var text = params.name + ' (' + params.email + ') wrote:\n' + params.message;

		request({
			url: webhook,
			json: true,
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: {
				text: text
			}
		});

		res.json({
			msg: 'Comment sent successfully.'
		}, 200);
	});

}