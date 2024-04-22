"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const auth_2 = __importDefault(require("../middleware/auth"));
const authRouter = express_1.default.Router();
authRouter.route('/login').post(auth_1.loginUser);
authRouter.route('/register').post(auth_1.registerUser);
authRouter.route('/logout').post(auth_2.default, auth_1.logout);
authRouter.route('/refresh-token').post(auth_1.refreshToken);
authRouter
    .route('/revoke-refresh-tokens')
    .post(auth_2.default, auth_1.revokeRefreshTokens);
exports.default = authRouter;
//# sourceMappingURL=auth.js.map