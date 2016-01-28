var request = require('request');
var checkReqParams = require('../helpers/checkReqParams');
var checkToken = require('../helpers/checkToken');
var Slackman = require('slackman');

module.exports = function (app) {

	var siteCommentSlack = new Slackman({
		hook: 'https://hooks.slack.com/services/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'
	});

	var blogPushSlack = new Slackman({
		hook: 'https://hooks.slack.com/services/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'
	});

	app.post('/api/slack', checkReqParams('name','email','message'), function (req, res, next) {

		var webhook = 'https://hooks.slack.com/services/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';
		var params = req.body;
		var text = params.name + ' (' + params.email + ') wrote:\n' + params.message;
		siteCommentSlack.sendMessage({
			message: text
		});

		res.success();
	});

	app.post('/api/slack/blog', checkToken, function (req, res, next){
		var webhook =  'https://hooks.slack.com/services/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';
        var params = req.body;
        var text = req.user.username + ' posted a blog post with a title ' + params.title;
        blogPushSlack.sendMessage({
        	message: text
        });

        res.success();
	});

}