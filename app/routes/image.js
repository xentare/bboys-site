var Image = require('../models/image');
var multer = require('multer');
var filename = require('../helpers/filename');
var checkReqParams = require('../helpers/checkReqParams');
var checkFile = require('../helpers/checkFile');

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

		Image.find({}).then(function (doc) {
			if (doc) {
				res.success(doc);
			} else {
				res.actionFailed();
			}
		}, function (err) {
			res.badRequest();
		});
	});

	app.post('/api/image', upload.single('imagefile'), checkFile, checkReqParams('title'), function (req, res, next) {
		Image.create({
			title: req.body.title,
			filename: req.file.filename,
			path: req.file.path.replace('public/', '')
		}).then(function (doc) {
			if (doc) {
				res.success(doc);
			} else {
				res.actionFailed();
			}
		}, function (err) {
			res.badRequest();
		});
	});
}