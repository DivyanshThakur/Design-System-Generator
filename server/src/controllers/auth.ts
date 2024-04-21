import jwt from 'jsonwebtoken';
import User, {
    getAccessToken,
    matchPassword,
    getRefreshToken,
    sendRefreshToken,
} from '../models/User';
import { protectedHandler } from '../utils/protectedHandler';
import ErrorResponse from '../utils/ErrorResponse';
import generalConfig from '../config/general.config';

/**
 * @desc User Login
 * @route POST /api/auth/login
 * @access Public
 */
export const loginUser = protectedHandler(async (req, res) => {
    const { email, password } = req.body;

    const errorMessage = 'Invalid email or password';

    const user = await User.findOne(
        { email },
        'avatar email password tokenVersion',
    );

    if (!user) {
        throw new ErrorResponse(errorMessage, 401);
    }

    const isPasswordMatched = await matchPassword(password, user.password);

    if (!isPasswordMatched) throw new ErrorResponse(errorMessage, 401);

    const token = getRefreshToken(user.id, user.tokenVersion);
    sendRefreshToken(res, token);
    res.json({
        success: true,
        data: {
            userId: user._id,
            accessToken: getAccessToken(user.id),
            expiresAt:
                Date.now() + parseInt(generalConfig.ACCESS_TOKEN_EXPIRE_MS), // 15 min
        },
    });
});

/**
 * @desc Register User
 * @route POST /api/users
 * @access Private
 */
export const registerUser = protectedHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    let userExists = await User.findOne({ email }, 'email');

    if (userExists) {
        throw new ErrorResponse('Email already exists', 400);
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
    });

    if (!user) {
        throw new ErrorResponse('Invalid user data', 400);
    }

    res.json({
        success: true,
        data: {
            userId: user._id,
            accessToken: getAccessToken(user.id),
            expiresAt:
                Date.now() + parseInt(generalConfig.ACCESS_TOKEN_EXPIRE_MS), // 15 min
        },
        message: 'User registered successfully',
    });
});

/**
 * @desc Logout current user
 * @route POST /api/auth/logout
 * @access Private
 */
export const logout = protectedHandler(async (_req, res) => {
    sendRefreshToken(res, '');
    res.json({ success: true, message: 'Successfully logged out!' });
});

/**
 * @desc Refresh current token
 * @route POST /api/auth/refresh-token
 * @access Public
 */
export const refreshToken = protectedHandler(async (req, res) => {
    let cookieData = req.cookies?.jwt;

    if (!cookieData) {
        throw new ErrorResponse('Refresh token not valid', 401);
    }

    let decoded;

    try {
        decoded = jwt.verify(
            cookieData.token,
            generalConfig.REFRESH_TOKEN_SECRET,
        );
    } catch (err) {
        throw new ErrorResponse('Refresh token not valid', 401);
    }

    // token is valid and
    // we can send back an access token
    const user = await User.findById(decoded.id, 'tokenVersion');

    if (!user || user.tokenVersion !== decoded.tokenVersion) {
        throw new ErrorResponse('Refresh token not valid', 401);
    }

    const token = getRefreshToken(user.id, user.tokenVersion);
    sendRefreshToken(res, token);

    res.json({
        success: true,
        data: {
            accessToken: getAccessToken(user.id),
            expiresAt:
                Date.now() + parseInt(generalConfig.REFRESH_TOKEN_EXPIRE_MS),
        },
    });
});

/**
 * @desc Revoke refresh token for this school and logout from all devices
 * @route POST /api/auth/revoke-refresh-tokens
 * @access Private
 */
export const revokeRefreshTokens = protectedHandler(async (_req, res) => {
    const user = res.locals.userId;
    user.tokenVersion++;
    await user.save();

    user.sendRefreshToken(res, '');

    res.json({
        success: true,
        message: 'All refresh token for this user has been revoked!',
    });
});
