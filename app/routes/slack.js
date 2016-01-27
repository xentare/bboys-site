var request = require('request');
var checkReqParams = require('helpers/checkReqParams');
var checkToken = require('helpers/checkToken');

module.exports = function (app) {

	app.post('/api/slack', checkReqParams('name','email','message'), function (req, res, next) {
		var webhook = 'https://hooks.slack.com/services/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';
		var params = req.body;
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

	app.post('/api/slack/blog', checkToken, function (req, res, params){
		var webhook =  'https://hooks.slack.com/services/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';
        var params = req.body;
        var text = req.user.username + 'posted a blog post with a title ' + params.title;

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

	});

}