module.exports = function (req, res, next) {
	res.success = function (data) {
		res.status(200).send({
			msg: 'Succesfully performed operation',
			success: true,
			data: data
		});
	}

	return next(); 
}