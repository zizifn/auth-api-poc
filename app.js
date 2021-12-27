var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
var indexRouter = require('./routes/index');
var notesRouter = require('./routes/notes.js');
var sessionRouter = require('./routes/session.js');
var corssOriginRouter = require('./routes/cross-origin.js');
var session = require('express-session')
const { NODE_ENV, AUTH0_API_SIGN_SECRET } = require('./config/config.js');
const { auth0JWTCheck, addCrossOriginHeader } = require('./utils/middleware.js');
const { NONAME } = require('dns');
var app = express();
require('express-async-errors')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var corsOptions = {
  //zizifn.github.io
  origin: ["http://localhost:4300", /\herokuapp\.com$/, /\zizi\.press$/, /\zizifn\.github\.io$/],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use('/', indexRouter);
const sess = {
  secret: AUTH0_API_SIGN_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 3600 * 12
  }
}

if (NODE_ENV === 'production') {
  sess.cookie.secure = true; // serve secure cookies
  sess.cookie.sameSite = "none"
}

app.use('/corss-origin-header', addCrossOriginHeader, cors(corsOptions), corssOriginRouter);
app.use('/session', session(sess), cors(corsOptions), sessionRouter);
app.use('/api/auth0', cors(corsOptions), auth0JWTCheck, notesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
