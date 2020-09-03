const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/usermodels');
const educator = require('../models/educator');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
module.exports = function(passport1) {
  passport1.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      educator.findOne({
        email: email
      }).then(educator => {
        if (!educator) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, educator.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, educator);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport1.serializeUser(function(educator, done) {
    done(null, educator.id);
  });

  passport1.deserializeUser(function(id, done) {
    User.findById(id, function(err, educator) {
      done(err, educator);
    });
  });
};