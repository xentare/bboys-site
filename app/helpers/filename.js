var mime = require('mime');
var hashes = require('./hashes');

module.exports = {
	random: function (mimetype) {
		if (!mimetype) {
			console.log('Mimetype not defined! filename.js');
		}

		return hashes.random('md5') + Date.now() + '.' + mime.extension(mimetype);
	}
}