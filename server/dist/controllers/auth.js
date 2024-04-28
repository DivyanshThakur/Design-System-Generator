"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revokeRefreshTokens = exports.refreshToken = exports.logout = exports.registerUser = exports.loginUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importStar(require("../models/User"));
const protectedHandler_1 = require("../utils/protectedHandler");
const ErrorResponse_1 = __importDefault(require("../utils/ErrorResponse"));
const general_config_1 = __importDefault(require("../config/general.config"));
/**
 * @desc User Login
 * @route POST /api/auth/login
 * @access Public
 */
exports.loginUser = (0, protectedHandler_1.protectedHandler)(async (req, res) => {
    const { email, password } = req.body;
    const errorMessage = 'Invalid email or password';
    const user = await User_1.default.findOne({ email }, 'avatar email password tokenVersion');
    if (!user) {
        throw new ErrorResponse_1.default(errorMessage, 401);
    }
    const isPasswordMatched = await (0, User_1.matchPassword)(password, user.password);
    if (!isPasswordMatched)
        throw new ErrorResponse_1.default(errorMessage, 401);
    const token = (0, User_1.getRefreshToken)(user.id, user.tokenVersion);
    (0, User_1.sendRefreshToken)(res, token);
    res.json({
        success: true,
        data: {
            userId: user._id,
            accessToken: (0, User_1.getAccessToken)(user.id),
            expiresAt: Date.now() + parseInt(general_config_1.default.ACCESS_TOKEN_EXPIRE_MS), // 15 min
        },
    });
});
/**
 * @desc Register User
 * @route POST /api/users
 * @access Private
 */
exports.registerUser = (0, protectedHandler_1.protectedHandler)(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    let userExists = await User_1.default.findOne({ email }, 'email');
    if (userExists) {
        throw new ErrorResponse_1.default('Email already exists', 400);
    }
    const user = await User_1.default.create({
        firstName,
        lastName,
        email,
        password,
    });
    if (!user) {
        throw new ErrorResponse_1.default('Invalid user data', 400);
    }
    res.json({
        success: true,
        data: {
            userId: user._id,
            accessToken: (0, User_1.getAccessToken)(user.id),
            expiresAt: Date.now() + parseInt(general_config_1.default.ACCESS_TOKEN_EXPIRE_MS), // 15 min
        },
        message: 'User registered successfully',
    });
});
/**
 * @desc Logout current user
 * @route POST /api/auth/logout
 * @access Private
 */
exports.logout = (0, protectedHandler_1.protectedHandler)(async (_req, res) => {
    (0, User_1.sendRefreshToken)(res, '');
    res.json({ success: true, message: 'Successfully logged out!' });
});
/**
 * @desc Refresh current token
 * @route POST /api/auth/refresh-token
 * @access Public
 */
exports.refreshToken = (0, protectedHandler_1.protectedHandler)(async (req, res) => {
    let cookieData = req.cookies?.jwt;
    if (!cookieData) {
        throw new ErrorResponse_1.default('Refresh token not valid', 401);
    }
    let decoded;
    try {
        decoded = jsonwebtoken_1.default.verify(cookieData.token, general_config_1.default.REFRESH_TOKEN_SECRET);
    }
    catch (err) {
        throw new ErrorResponse_1.default('Refresh token not valid', 401);
    }
    // token is valid and
    // we can send back an access token
    const user = await User_1.default.findById(decoded.id, 'tokenVersion');
    if (!user || user.tokenVersion !== decoded.tokenVersion) {
        throw new ErrorResponse_1.default('Refresh token not valid', 401);
    }
    const token = (0, User_1.getRefreshToken)(user.id, user.tokenVersion);
    (0, User_1.sendRefreshToken)(res, token);
    res.json({
        success: true,
        data: {
            accessToken: (0, User_1.getAccessToken)(user.id),
            expiresAt: Date.now() + parseInt(general_config_1.default.REFRESH_TOKEN_EXPIRE_MS),
        },
    });
});
/**
 * @desc Revoke refresh token for this school and logout from all devices
 * @route POST /api/auth/revoke-refresh-tokens
 * @access Private
 */
exports.revokeRefreshTokens = (0, protectedHandler_1.protectedHandler)(async (_req, res) => {
    const user = res.locals.userId;
    user.tokenVersion++;
    await user.save();
    user.sendRefreshToken(res, '');
    res.json({
        success: true,
        message: 'All refresh token for this user has been revoked!',
    });
});
//# sourceMappingURL=auth.js.map