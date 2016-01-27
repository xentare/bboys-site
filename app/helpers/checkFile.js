module.exports = function (req, res, next) {
	if (typeof req.file == 'undefined' || req.file == 'undefined') {
		res.parameterMissing();
	} else {
		next();
	}
}