import { Request, Response } from 'express';
import Project from '../models/Project';
import User from '../models/User';
import ErrorResponse from '../utils/ErrorResponse';
import { protectedHandler } from '../utils/protectedHandler';

interface ICreateProjectBody {
    projectName: string;
}

/**
 * @desc Create Project
 * @route POST /api/projects
 * @access Private
 */
export const createProject = protectedHandler(
    async (req: Request, res: Response) => {
        const { projectName } = req.body as ICreateProjectBody;
        const userId = res.locals.userId as string;

        const user = await User.findById(userId);

        if (!user) {
            throw new ErrorResponse('User not found', 400);
        }

        const project = await Project.create({
            name: projectName,
            userId: user._id,
        });

        res.json({
            success: true,
            data: project,
            message: 'Project created successfully',
        });
    },
);

/**
 * @desc Get All Projects
 * @route GET /api/projects
 * @access Private
 */
export const getAllProjects = protectedHandler(
    async (_req: Request, res: Response) => {
        const userId = res.locals.userId;
        const projects = await Project.find({ userId });
        res.json({
            success: true,
            data: projects,
            message: 'Projects fetched successfully',
        });
    },
);

/**
 * @desc Get Project by Id
 * @route GET /api/projects/:projectId
 * @access Private
 */
export const getProjectById = protectedHandler(
    async (req: Request, res: Response) => {
        const userId = res.locals.userId as string;
        const projectId = req.params.projectId as string;
        const projects = await Project.findOne({ _id: projectId, userId });
        res.json({
            success: true,
            data: projects,
            message: 'Projects fetched successfully',
        });
    },
);
