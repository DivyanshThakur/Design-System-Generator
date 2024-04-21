import express from 'express';
import {
    createProject,
    getAllProjects,
    getProjectById,
} from '../controllers/project';
import authMiddleware from '../middleware/auth';

const projectRouter = express.Router();

projectRouter
    .route('/')
    .post(authMiddleware, createProject)
    .get(authMiddleware, getAllProjects);

projectRouter.route('/:projectId').get(authMiddleware, getProjectById);

export default projectRouter;
