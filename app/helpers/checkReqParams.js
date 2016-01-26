module.exports = function () {
	var args = arguments;
	return function (req, res, next) {
		for (var i = 0; i < args.length; i++) {
			if (typeof req.body[args[i]] == 'undefined') {
				res.status(400).send({
					msg: 'Parameters missing',
					success: false
				});
			}
		}
		next();
	}
}

