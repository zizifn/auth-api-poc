#!/usr/bin/env node

/**
 * Module dependencies.
 */

import '../utils/tracing.js'

import { MONGO_DB_URL, NODE_ENV, PORT } from '../config/config.js';

import app from '../app.js';
import { createServer } from 'http';
import debug from 'debug';
import pkg from 'mongoose';
import { winstonLogger } from '../utils/middleware.js';

const { set, connect } = pkg;

debug('auth');


/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(PORT);
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
// debug info
if (NODE_ENV !== 'production') {
  set('debug', true);
}
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
// connect(MONGO_DB_URL, {
//   socketTimeoutMS: 10000,
//   serverSelectionTimeoutMS: 10000,
//   family: 4

// }).then(
//   () => {
//     server.listen(port);
//     server.on('error', onError);
//     server.on('listening', onListening);
//   }
// ).catch(err => {
//   console.log(err);
// });


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  winstonLogger.info('Listening on ' + bind);
}
