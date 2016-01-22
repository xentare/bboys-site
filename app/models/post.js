var mongoose = require('mongoose');

module.exports = mongoose.model('Post',{
	title: {
		type: String,
		default: ''
	},
	date: {
		type: Date,
		default: Date.now
	},
	content: {
		type: String,
		default: ''
	}
})