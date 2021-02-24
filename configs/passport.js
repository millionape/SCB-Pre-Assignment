const passport = require('passport'),
  passportJWT = require("passport-jwt"),
  ExtractJWT = passportJWT.ExtractJwt,
  JWTStrategy = passportJWT.Strategy,
  // LocalStrategy = require('passport-local').Strategy,
  User = require('../models/user'),
  constant = require('../const/constant')

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: constant.jwt_secret
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