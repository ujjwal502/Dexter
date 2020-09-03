const express = require('express');
//to initialize bodypARSER
const bodyParser = require('body-parser');
// initialize our express app
const app = express();
const cors = require('cors');
//initialize mongoose
const mongoose = require('mongoose');

const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');


// Passport Config
require('./config/passport')(passport);
//connect to mongodb
mongoose.connect('mongodb://localhost:27017/manju', {useNewUrlParser: true},()=>{
    console.log("connected")
});
let port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

  app.use(session({ secret: 'keyboard cat',   resave: true,
  saveUninitialized: true, cookie: { maxAge: 200 }}))
  
  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Connect flash
  app.use(flash());
  
  // Global variables
  app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });
  

  app.use('/users', require('./routes/userroutes.js'))
  app.use('/educators', require('./routes/educatorroutes.js'))
app.use(cors());



app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});