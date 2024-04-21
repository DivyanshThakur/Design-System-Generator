import { Router } from "express";
import authRouter from "./auth";
import projectRouter from "./project";
import themeRouter from "./theme";

const appRouter = Router();

appRouter.use('/auth', authRouter);
appRouter.use('/projects/:projectId/themes', themeRouter);
appRouter.use('/projects', projectRouter)

export default appRouter;