var Image = require('../models/image');
var multer = require('multer');
var filename = require('../helpers/filename');

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/uploads/');
	},
	filename: function (req, file, cb) {
		var fname = filename.random(file.mimetype);
		console.log(fname);
		cb(null, fname);
	}
});

var upload = multer({ 
	storage: storage,
});

module.exports = function (app) {

	app.get('/api/image', function (req, res, next) {
		var params = req.body;

		Image.find({}, function (err, images) {
			if (err) {
				res.status(400).send({
					err: err,
					msg: 'Can\'t query images',
					success: false
				});
				next();
			} else {
				if (images) {
					res.status(200).send({
						msg: 'Images queried',
						data: images,
						success: true
					});
					next();
				} else {
					res.status(200).send({
						msg: 'Can\'t query images',
						success: false
					});
					next();
				}
			}
		});
	});

	app.post('/api/image', upload.single('imagefile'), function (req, res, next) {
		if (!req.body.title || !req.file) {
			res.status(400).send({
				msg: 'Title or file not found',
				success: false
			});
			next();
		} else {
			console.log(req.file);
			Image.create({
				title: req.body.title,
				filename: req.file.filename,
				path: req.file.path.replace('public/', '')
			}, function (err, image) {
				if (err) {
					res.status(400).send({
						msg: 'Upload failed',
						success: false
					});
					next();
				} else {	
					res.status(200).send({
						data: req.file,
						msg: 'Upload succesfull',
						success: true
					});
					next();
				}
			});
		}

	});
}