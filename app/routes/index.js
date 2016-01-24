'use strict';

module.exports = function (app) {

	require('./slack')(app);
	require('./login')(app);
	require('./post')(app);
	require('./user')(app);
	require('./invite')(app);
	require('./register')(app);
}