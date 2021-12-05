const jwt = require('express-jwt');
const { AUTH0_API_SIGN_SECRET, AUTH0_API_AUDIENCE, AUTH0_API_SIGN_ISSUER } = require('../config/config.js');

const auth0JWTCheck = jwt({
    secret: AUTH0_API_SIGN_SECRET,
    audience: AUTH0_API_AUDIENCE,
    issuer: AUTH0_API_SIGN_ISSUER,
    algorithms: ['HS256']
});

module.exports = {
    auth0JWTCheck
}