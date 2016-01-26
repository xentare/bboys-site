module.exports = function (req, res, next) {
	
	res.notFoundErr = function () {
		res.status(404).send({
			msg: 'Not found',
			success: false
		});
	}

	res.badRequest = function () {
		res.status(400).send({
			msg: 'Bad request',
			success: false
		});
	}

	res.actionFailed = function () {
		res.status(200).send({
			msg: 'Failed to proceed the requested action',
			success: false
		});
	}

	res.parameterMissing = function () {
		res.status(400).send({
			msg: 'Parameter missing',
			success: false
		});
	}
	return next();
}