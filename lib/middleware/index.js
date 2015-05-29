var _ = require('lodash');
var derbyLogin = require('derby-login');

module.exports = function(store, options) {
	options = _.merge(options, {
		hooks: require('../hooks'),
		user: {
			firstname: true,
			lastname: true
		}
	});
	return derbyLogin.middleware(store, options);
};