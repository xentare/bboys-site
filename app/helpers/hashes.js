var crypto = require('crypto');

module.exports = {
	// creates 
	random: function (hash) {
		hash = hash || 'md5';
		var date = (new Date()).valueOf().toString();
		var rnd = Math.random().toString();
		return crypto.createHash(hash).update(date + rnd).digest('hex');
	}
}