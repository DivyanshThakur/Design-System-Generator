import express from 'express';
import {
    createTheme,
    getAllThemes,
    getThemeById,
    updateThemeById,
} from '../controllers/theme';
import authMiddleware from '../middleware/auth';

const themeRouter = express.Router();

themeRouter
    .route('/')
    .post(authMiddleware, createTheme)
    .get(authMiddleware, getAllThemes);

themeRouter
    .route('/:themeId')
    .patch(authMiddleware, updateThemeById)
    .get(authMiddleware, getThemeById);

export default themeRouter;
