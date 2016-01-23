
module.exports = function (req, res, next) {
	if (req.cookies.user == "undefined") {
		res.redirect('/login');
		next();
	} else {
		next();
	}
}