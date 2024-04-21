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
    .route('/')
    .post(authMiddleware, createComponent)
    .get(authMiddleware, getAllComponents);

componentRouter
    .route('/:componentId')
    .patch(authMiddleware, updateComponentById)
    .get(authMiddleware, getComponentById);

export default componentRouter;
