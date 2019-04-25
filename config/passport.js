/**
 * Passport configuration file where you should configure strategies
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var JwtStrategy = require('passport-jwt').Strategy;
var bcrypt = require('bcrypt-nodejs');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
},
  async (email, password, done) => {
    try {
      const user = await User.find({email});
      if (!user || user.length < 1) {
        return done(null, false, {
          message: 'Incorrect User'
        });
      }
      bcrypt.compare(password, user[0].password, (err, res) => {
        if (err || !res) {
          return done(null, false, {
            message: 'Invalid Password'
          });
        } else {
          return done(null,user);
        }
      });
    } catch (err) {
      if (err) {
        return done(null, err);
      }
    }
  })
);

module.exports = {
  http: {
    customMiddleware: function(app) {
      app.use(passport.initialize());
      app.use(passport.session());
    }
  }
};
