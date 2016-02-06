// server.js

// set up ======================================================================
// gettin all the tools i be needin

'use strict';

var express     = require('express');
var morgan      = require('morgan');
var bodyParser  = require('body-parser');
var session     = require('express-session');
var RedisStore  = require('connect-redis')(session);
var passport    = require('passport');

var GitHubStrategy  = require('passport-github').Strategy;
var mongoose        = require('mongoose');
var flash           = require('connect-flash');
var cookieParser    = require('cookie-parser');

var configDB    = require('./config/database.js');
var app         = express();
var port        = process.env.PORT || 8080;

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating


// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
