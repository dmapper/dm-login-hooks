module.exports = {
	parseRegisterProvider: function(user, provider, profile, done) {
		var avatar, position;
		switch (provider) {
			case 'linkedin':
				user.firstname = profile.name.familyName;
				user.lastname = profile.name.givenName;
				user.avatar = profile._json.pictureUrl;
				break;
			case 'google':
				user.firstname = profile.name.familyName;
				user.lastname = profile.name.givenName;
				avatar = profile.photos[0].value;
				if (position = avatar.indexOf('sz=')) {
					avatar = avatar.substring(0, position);
				}
				user.avatar = avatar;
				break;
			case 'twitter':
				user.firstname = profile.displayName.split(' ')[0];
				user.lastname = profile.displayName.split(' ')[1];
				user.avatar = profile.photos[0].value.replace('_normal', '');
				break;
			case 'facebook':
				user.firstname = profile.name.familyName;
				user.lastname = profile.name.givenName;
				user.avatar = 'http://graph.facebook.com/' + profile.id + '/picture?width=200&height=200';
			default:
				user.firstname = '';
				user.lastname = '';
				user.avatar = '';
		}
		return done(null, user);
	},
	parseRegisterRequest: function(req, res, done) {
		var confirm, email, firstname, lastname, password, userData;
		email = req.body.email;
		password = req.body.password;
		confirm = req.body.confirm;
		firstname = req.body.firstname;
		lastname = req.body.lastname;
		if (!email || !password || !confirm || !firstname || !lastname) {
			return done('Please fill all fields');
		}
		if (password !== confirm) {
			return done('Password should match confirmation');
		}
		if (!this.options.emailRegex.test(email)) {
			return done('Incorrect email');
		}
		if (password.length < 6) {
			return done('Password length should be at least 6');
		}
		userData = {
			firstname: firstname,
			lastname: lastname
		};
		return done(null, email, password, userData);
	}
};