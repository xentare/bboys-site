
module.exports = function (req, res, next) {
	if (typeof req.cookies.user == "undefined" || req.cookies.user == "undefined") {
		res.redirect('/login');
		next();
	} else {
		next();
	}
}