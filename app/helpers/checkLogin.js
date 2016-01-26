
module.exports = function (req, res, next) {
	if (typeof req.cookies.apiKey == "undefined") {
		res.invalidAuth();
	} else {
		next();
	}
}