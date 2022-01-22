import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

const AUTH0_API_SIGN_SECRET = process.env.AUTH0_API_SIGN_SECRET;
const AUTH0_API_AUDIENCE = process.env.AUTH0_API_AUDIENCE;
const AUTH0_API_SIGN_ISSUER = process.env.AUTH0_API_SIGN_ISSUER;
const MONGO_DB_URL = process.env.MONGODB_URI;
const NODE_ENV = process.env.NODE_ENV;

export {
    PORT,
    AUTH0_API_SIGN_SECRET,
    AUTH0_API_AUDIENCE,
    AUTH0_API_SIGN_ISSUER,
    MONGO_DB_URL,
    NODE_ENV
};