module.exports = function(req, res, done) {
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
  done(null, email, password, userData);
};