var mongoose = require('mongoose');

module.exports = mongoose.model('Invite', {
	date: {
		type: Date,
		default: Date.now
	},
	key: {
		type: String,
		default: ''
	}
});