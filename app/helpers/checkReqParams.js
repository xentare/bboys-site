module.exports = function () {
	var args = arguments;
	return function (req, res, next) {
		var found = false;
		for (var i = 0; i < args.length; i++) {
			if (typeof req.body[args[i]] == 'undefined') {
				res.parameterMissing();
				found = true;
				break;
			}
		}
		if (!found) {
			next();
		}
	}
}

