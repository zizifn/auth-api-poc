const jwt = require('express-jwt');
const winston = require('winston');
const { AUTH0_API_SIGN_SECRET, AUTH0_API_AUDIENCE, AUTH0_API_SIGN_ISSUER } = require('../config/config.js');

const auth0JWTCheck = jwt({
    secret: AUTH0_API_SIGN_SECRET,
    audience: AUTH0_API_AUDIENCE,
    issuer: AUTH0_API_SIGN_ISSUER,
    algorithms: ['HS256']
});

const winstonLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console()
    ],
});

const addCrossOriginHeader = (req, resp, next) => {
    if (req.query['Cross-Origin-Resource-Policy']) {
        resp.header('Cross-Origin-Resource-Policy', req.query['Cross-Origin-Resource-Policy']);
    }
    if (req.query['Cross-Origin-Embedder-Policy']) {
        resp.header('Cross-Origin-Embedder-Policy', req.query['Cross-Origin-Embedder-Policy']);
    }
    if (req.query['Cross-Origin-Opener-Policy']) {
        resp.header('Cross-Origin-Opener-Policy', req.query['Cross-Origin-Opener-Policy']);
    }

    next();
}

const disableCache = (req, resp, next) => {
    resp.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next()
}

module.exports = {
    auth0JWTCheck,
    winstonLogger,
    addCrossOriginHeader,
    disableCache
}