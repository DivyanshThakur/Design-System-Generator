import { Router } from 'express';
import authRouter from './auth';
import projectRouter from './project';
import componentRouter from './component';
import themeRouter from './theme';

const appRouter = Router();

appRouter.use('/', componentRouter);
appRouter.use('/', themeRouter);
appRouter.use('/auth', authRouter);
appRouter.use('/projects', projectRouter);

export default appRouter;
