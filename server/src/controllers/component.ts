import { Request, Response } from 'express';
import User from '../models/User';
import ErrorResponse from '../utils/ErrorResponse';
import { protectedHandler } from '../utils/protectedHandler';
import Component from '../models/Component';

interface ICreateComponentBody {
    type: 'button' | 'input' | 'select';
    label: string;
    value: string;
    themeId: string;
    styles: {
        backgroundColor: string;
        textColor: string;
        borderColor: string;
        borderRadius: string;
        paddingX: string;
        paddingY: string;
    };
}

/**
 * @desc Create Component
 * @route POST /api/projects/:projectId/components
 * @access Private
 */
export const createComponent = protectedHandler(
    async (req: Request, res: Response) => {
        const { label, styles, themeId, type, value } =
            req.body as ICreateComponentBody;
        const userId = res.locals.userId as string;
        const projectId = req.params.projectId;

        const user = await User.findById(userId);

        if (!user) {
            throw new ErrorResponse('User not found', 400);
        }

        const component = await Component.create({
            projectId,
            themeId,
            type,
            styles,
            label,
            value,
            userId: user._id,
        });

        res.json({
            success: true,
            data: component,
            message: 'Component created successfully',
        });
    },
);

/**
 * @desc Get All Components
 * @route GET /api/projects/:projectId/components
 * @access Private
 */
export const getAllComponents = protectedHandler(
    async (req: Request, res: Response) => {
        const userId = res.locals.userId;
        const projectId = req.params.projectId;

        const components = await Component.find({ projectId, userId });

        res.json({
            success: true,
            data: components,
            message: 'Components fetched successfully',
        });
    },
);

/**
 * @desc Update Component by Id
 * @route PATCH /api/projects/:projectId/components/:componentId
 * @access Private
 */
export const updateComponentById = protectedHandler(
    async (req: Request, res: Response) => {
        const userId = res.locals.userId as string;
        const projectId = req.params.projectId;
        const componentId = req.params.id as string;

        const component = await Component.findOneAndUpdate(
            { _id: componentId, userId, projectId },
            {},
            { returnOriginal: false },
        );

        res.json({
            success: true,
            data: component,
            message: 'Component fetched successfully',
        });
    },
);

/**
 * @desc Get Component by Id
 * @route GET /api/projects/:projectId/components/:componentId
 * @access Private
 */
export const getComponentById = protectedHandler(
    async (req: Request, res: Response) => {
        const userId = res.locals.userId as string;
        const projectId = req.params.projectId;
        const componentId = req.params.id as string;

        const component = await Component.findOne({
            _id: componentId,
            projectId,
            userId,
        });

        res.json({
            success: true,
            data: component,
            message: 'Component fetched successfully',
        });
    },
);
