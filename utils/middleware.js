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

module.exports = {
    auth0JWTCheck,
    winstonLogger
}