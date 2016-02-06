// server.js

// set up ======================================================================
// gettin all the tools i be needin

'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

var mongoose = require('mongoose');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

