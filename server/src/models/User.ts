import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import generalConfig from '../config/general.config';

const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
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
    },
    {
        timestamps: true,
    },
);

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
});

export const matchPassword = async function (
    newPassword: string,
    currentPassword: string,
) {
    return bcrypt.compare(newPassword, currentPassword);
};

export const getAccessToken = function (id: string) {
    return jwt.sign({ id }, generalConfig.ACCESS_TOKEN_SECRET, {
        expiresIn: generalConfig.ACCESS_TOKEN_EXPIRE,
    });
};

export const getRefreshToken = function (id: string, tokenVersion: number) {
    return jwt.sign({ id, tokenVersion }, generalConfig.REFRESH_TOKEN_SECRET, {
        expiresIn: generalConfig.REFRESH_TOKEN_EXPIRE,
    });
};

export const sendRefreshToken = function (res, token: string) {
    res.cookie(
        'jwt',
        { token },
        {
            httpOnly: true,
            expires: new Date(
                Number(generalConfig.REFRESH_TOKEN_EXPIRE_MS) + Date.now(),
            ),
            path: '/api/auth/refresh-token',
            sameSite: 'none',
            secure: true,
        },
    );
};

const User = model('USER', userSchema);

export default User;
