import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Project from '../models/Project';
import User from '../models/User';
import ErrorResponse from '../utils/ErrorResponse';
import { protectedHandler } from '../utils/protectedHandler';
import Theme from '../models/Theme';
import Component from '../models/Component';

const ObjectId = mongoose.Types.ObjectId;

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

        const pxList = [
            {
                name: 'xs',
                value: '4',
            },
            {
                name: 's',
                value: '6',
            },
            {
                name: 'sm',
                value: '10',
            },
            {
                name: 'm',
                value: '16',
            },
            {
                name: 'ml',
                value: '24',
            },
            {
                name: 'lg',
                value: '36',
            },
            {
                name: 'xl',
                value: '54',
            },
        ];

        // Initializing basic theme setting so that user can edit or add more
        const theme = await Theme.create({
            projectId: project._id,
            userId: user._id,
            colors: [
                {
                    name: 'Primary',
                    value: 'blue',
                },
                {
                    name: 'Secondary',
                    value: 'green',
                },
            ],
            radiusList: pxList,
            spacingList: pxList,
        });

        const componentTypes = [
            'button',
            'input-text',
            'radio',
            'checkbox',
            'select',
        ];

        // Initializing components with default styles
        await Promise.all(
            componentTypes.map((type) => {
                return Component.create({
                    projectId: project._id,
                    userId: user._id,
                    type,
                    themeId: theme._id,
                    styles: {
                        textColor: '',
                        backgroundColor: '',
                        borderColor: 'Primary',
                        borderRadius: 's',
                        paddingX: 'm',
                        paddingY: 's',
                    },
                });
            }),
        );

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
        const projects = await Project.find({ userId: new ObjectId(userId) });
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
        const projects = await Project.findOne({
            _id: new ObjectId(projectId),
            userId: new ObjectId(userId),
        });
        res.json({
            success: true,
            data: projects,
            message: 'Projects fetched successfully',
        });
    },
);
