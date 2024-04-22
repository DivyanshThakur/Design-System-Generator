import express from 'express';
import {
    createComponent,
    getAllComponents,
    getComponentById,
    updateComponentById,
} from '../controllers/component';
import authMiddleware from '../middleware/auth';

const componentRouter = express.Router();

componentRouter
    .route('/projects/:projectId/components')
    .post(authMiddleware, createComponent)
    .get(authMiddleware, getAllComponents);

componentRouter
    .route('/projects/:projectId/components/:componentId')
    .patch(authMiddleware, updateComponentById)
    .get(authMiddleware, getComponentById);

export default componentRouter;
