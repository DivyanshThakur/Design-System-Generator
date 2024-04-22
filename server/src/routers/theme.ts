import express from 'express';
import authMiddleware from '../middleware/auth';
import {
    createTheme,
    getThemeByProjectId,
    updateThemeByProjectId,
} from '../controllers/theme';

const themeRouter = express.Router();

themeRouter
    .route('/projects/:projectId/themes')
    .post(authMiddleware, createTheme)
    .patch(authMiddleware, updateThemeByProjectId)
    .get(authMiddleware, getThemeByProjectId);

export default themeRouter;
