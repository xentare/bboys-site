var mongoose = require('mongoose');

module.exports = mongoose.model('Image', {
	date: {
		type: Date,
		default: Date.now
	},
	filename: {
		type: String,
		default: ''
	},
	title: {
		type: String,
		default: ''
	},
	path: {
		type: String,
		default: ''
	}
});