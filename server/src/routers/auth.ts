import express from 'express';
import {
    loginUser,
    registerUser,
    logout,
    refreshToken,
    revokeRefreshTokens,
} from '../controllers/auth';
import authMiddleware from '../middleware/auth';

const authRouter = express.Router();

authRouter.route('/login').post(loginUser);
authRouter.route('/register').post(registerUser);
authRouter.route('/logout').post(authMiddleware, logout);
authRouter.route('/refresh-token').post(refreshToken);
authRouter
    .route('/revoke-refresh-tokens')
    .post(authMiddleware, revokeRefreshTokens);

export default authRouter;
