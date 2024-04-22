import { Router } from 'express';
import authRouter from './auth';
import projectRouter from './project';

const appRouter = Router();

appRouter.use('/auth', authRouter);
appRouter.use('/projects', projectRouter);

export default appRouter;
