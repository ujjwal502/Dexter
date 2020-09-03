const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const Educator = require('../models/educator');
const { forwardAuthenticated } = require('../config/auth');

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2,skills } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2 || !skills ) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }
else {
    Educator.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.status(404).send('error:email exists');
      } else {
        const newedu = new Educator({
          name,
          email,
          password,
          skills
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newedu.password, salt, (err, hash) => {
            //if (err) throw err;
            newedu.password = hash;
            newedu
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.send('registered sucesfully');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});
// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.send('loggedout');
});

module.exports = router;