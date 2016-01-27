
module.exports = function (req, res, next) {
	console.log(typeof req.cookies.apiKey);
	if (req.cookies.apiKey == 'undefined' || typeof req.cookies.apiKey == 'undefined') {
		res.invalidAuth();
	} else {
		next();
	}
}