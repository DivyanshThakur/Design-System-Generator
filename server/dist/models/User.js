"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRefreshToken = exports.getRefreshToken = exports.getAccessToken = exports.matchPassword = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const general_config_1 = __importDefault(require("../config/general.config"));
const { Schema, model } = mongoose_1.default;
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        select: false,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    tokenVersion: {
        type: Number,
        default: 1,
    },
}, {
    timestamps: true,
});
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt_1.default.hash(this.password, 10);
    }
    next();
});
const matchPassword = async function (newPassword, currentPassword) {
    return bcrypt_1.default.compare(newPassword, currentPassword);
};
exports.matchPassword = matchPassword;
const getAccessToken = function (id) {
    return jsonwebtoken_1.default.sign({ id }, general_config_1.default.ACCESS_TOKEN_SECRET, {
        expiresIn: general_config_1.default.ACCESS_TOKEN_EXPIRE,
    });
};
exports.getAccessToken = getAccessToken;
const getRefreshToken = function (id, tokenVersion) {
    return jsonwebtoken_1.default.sign({ id, tokenVersion }, general_config_1.default.REFRESH_TOKEN_SECRET, {
        expiresIn: general_config_1.default.REFRESH_TOKEN_EXPIRE,
    });
};
exports.getRefreshToken = getRefreshToken;
const sendRefreshToken = function (res, token) {
    res.cookie('jwt', { token }, {
        httpOnly: true,
        expires: new Date(Number(general_config_1.default.REFRESH_TOKEN_EXPIRE_MS) + Date.now()),
        path: '/api/auth/refresh-token',
        sameSite: 'none',
        secure: true,
    });
};
exports.sendRefreshToken = sendRefreshToken;
const User = model('USER', userSchema);
exports.default = User;
//# sourceMappingURL=User.js.map