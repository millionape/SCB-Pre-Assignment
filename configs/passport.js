const passport = require('passport'),
  passportJWT = require("passport-jwt"),
  ExtractJWT = passportJWT.ExtractJwt,
  JWTStrategy = passportJWT.Strategy,
  LocalStrategy = require('passport-local').Strategy
User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  (username, password, cb) => {

    //this one is typically a DB call.
    if (username !== user.username)
      return cb(null, false, {
        message: 'Incorrect username or password.'
      })

    return cb(null, user, {
      message: 'Logged In Successfully'
    })
  }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
  },
  (jwtPayload, cb) => {
    try {
      // find the user in db if needed
      User.findOne({
        id: jwtPayload.id
      }, function (err, user) {
        if (err) {
          return cb(err, false);
        }
        if (user) {
          cb(null, user);
        } else {
          cb(null, false);
        }
      });
    } catch (error) {
      return cb(error, false);
    }
  }
));