import { AUTH0_API_AUDIENCE, AUTH0_API_SIGN_ISSUER, AUTH0_API_SIGN_SECRET } from '../config/config.js';

import jwt from 'express-jwt';
import pkg from 'winston';

const { format: _format, transports: _transports, createLogger } = pkg;


const auth0JWTCheck = jwt({
    secret: AUTH0_API_SIGN_SECRET,
    audience: AUTH0_API_AUDIENCE,
    issuer: AUTH0_API_SIGN_ISSUER,
    algorithms: ['HS256']
});

const winstonLogger = createLogger({
    level: 'info',
    format: _format.json(),
    transports: [
        new _transports.Console()
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
    if (req.query['X-Content-Type-Options']) {
        resp.header('X-Content-Type-Options', req.query['X-Content-Type-Options']);
    }

    next();
}

const disableCache = (req, resp, next) => {
    resp.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next()
}

export {
    auth0JWTCheck,
    winstonLogger,
    addCrossOriginHeader,
    disableCache
}