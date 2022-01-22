import 'express-async-errors';

import { AUTH0_API_SIGN_SECRET, NODE_ENV } from './config/config.js';
import { addCrossOriginHeader, auth0JWTCheck, disableCache } from './utils/middleware.js';
import { join, resolve } from 'path';

import { NONAME } from 'dns';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import corssOriginRouter from './routes/cross-origin.js';
import createError from 'http-errors';
import express from 'express';
import indexRouter from './routes/index.js';
import logger from 'morgan';
import notesRouter from './routes/notes.js';
import opentraceRouter from './routes/opentrace.js';
import session from 'express-session';
import sessionRouter from './routes/session.js';

var app = express();

// view engine setup
app.set('views', join(resolve(), 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(resolve(), 'public')));
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
  proxy: true,
  cookie: {
    httpOnly: true,
    maxAge: 3600 * 12 * 1000
  }
}

if (NODE_ENV === 'production') {
  sess.cookie.secure = true; // serve secure cookies
  sess.cookie.sameSite = "none"
}

app.use('/corss-origin-header', addCrossOriginHeader, cors(corsOptions), disableCache, corssOriginRouter);
app.use('/session', session(sess), cors(corsOptions), disableCache, sessionRouter);
app.use('/opentrace', opentraceRouter);
app.use('/api/auth0', cors(corsOptions), auth0JWTCheck, disableCache, notesRouter);

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

export default app;
