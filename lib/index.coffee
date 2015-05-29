module.exports =
  parseRegisterProvider: (user, provider, profile, done) ->
    switch provider
      when 'linkedin'
        user.firstname = profile.name.familyName
        user.lastname = profile.name.givenName
        user.avatar = profile._json.pictureUrl

      when 'google'
        user.firstname = profile.name.familyName
        user.lastname = profile.name.givenName
        avatar = profile.photos[0].value
        avatar = avatar.substring 0, position if position = avatar.indexOf 'sz='
        user.avatar = avatar

      when 'twitter'
        user.firstname = profile.displayName.split(' ')[0]
        user.lastname = profile.displayName.split(' ')[1]
        user.avatar = profile.photos[0].value.replace '_normal', ''

      when 'facebook'
        user.firstname =  profile.name.familyName
        user.lastname =  profile.name.givenName
        user.avatar = 'http://graph.facebook.com/' + profile.id + '/picture?width=200&height=200'

    done null, user

  parseRegisterRequest: (req, res, done) ->
    email = req.body.email
    password = req.body.password
    confirm = req.body.confirm
    firstname = req.body.firstname
    lastname = req.body.lastname
    if !email or !password or !confirm or !firstname or !lastname
      return done('Please fill all fields')
    if password != confirm
      return done('Password should match confirmation')
    # There is no good way to test emails by regex. The only good way is to send confirmation letter
    # This regex should pass all correct emails, but can pass some incorrect emails also
    if !@options.emailRegex.test(email)
      return done('Incorrect email')
    if password.length < 6
      return done('Password length should be at least 6')
    # You can pass custom values to new user with help of userData parameter
    # For example we can pass userId from session
    userData =
      firstname: firstname
      lastname: lastname
    done null, email, password, userData