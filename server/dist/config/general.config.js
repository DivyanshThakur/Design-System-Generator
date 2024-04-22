"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const ALLOWED_DOMAINS = process.env.ALLOWED_DOMAINS;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRE = process.env.ACCESS_TOKEN_EXPIRE;
const ACCESS_TOKEN_EXPIRE_MS = process.env.ACCESS_TOKEN_EXPIRE_MS;
const REFRESH_TOKEN_EXPIRE = process.env.REFRESH_TOKEN_EXPIRE;
const REFRESH_TOKEN_EXPIRE_MS = process.env.REFRESH_TOKEN_EXPIRE_MS;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const generalConfig = {
    PORT,
    NODE_ENV,
    ALLOWED_DOMAINS,
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRE,
    ACCESS_TOKEN_EXPIRE_MS,
    REFRESH_TOKEN_EXPIRE,
    REFRESH_TOKEN_EXPIRE_MS,
    REFRESH_TOKEN_SECRET,
};
exports.default = generalConfig;
//# sourceMappingURL=general.config.js.map