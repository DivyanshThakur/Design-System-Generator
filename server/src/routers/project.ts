import express from 'express';
import {
    createProject,
    getAllProjects,
    getProjectById,
} from '../controllers/project';
import authMiddleware from '../middleware/auth';
import { createTheme, getThemeByProjectId, updateThemeByProjectId } from '../controllers/theme';

const projectRouter = express.Router();

projectRouter
    .route('/')
    .post(authMiddleware, createProject)
    .get(authMiddleware, getAllProjects);

projectRouter
    .route('/:projectId/themes')
    .post(authMiddleware, createTheme)
    .patch(authMiddleware, updateThemeByProjectId)
    .get(authMiddleware, getThemeByProjectId);

projectRouter.route('/:projectId').get(authMiddleware, getProjectById);

export default projectRouter;
