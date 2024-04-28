import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
import ErrorResponse from '../utils/ErrorResponse';
import { protectedHandler } from '../utils/protectedHandler';
import Component from '../models/Component';

const ObjectId = mongoose.Types.ObjectId;

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
            projectId: new ObjectId(projectId),
            themeId: new ObjectId(themeId),
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

        const components = await Component.find({
            projectId: new ObjectId(projectId),
            userId: new ObjectId(userId),
        });

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
        const componentId = req.params.componentId as string;
        const reqBody = req.body;

        const component = await Component.findOneAndUpdate(
            {
                _id: new ObjectId(componentId),
                userId: new ObjectId(userId),
                projectId: new ObjectId(projectId),
            },
            {
                styles: reqBody.styles,
            },
            { returnOriginal: false },
        );

        res.json({
            success: true,
            data: component,
            message: 'Component updated successfully',
        });
    },
);

/**
 * @desc DELETE Component by Variant Id
 * @route DELETE /api/projects/:projectId/components
 * @access Private
 */
export const deleteComponentsByVariantId = protectedHandler(
    async (req: Request, res: Response) => {
        const userId = res.locals.userId as string;
        const projectId = req.params.projectId;
        const variantId = req.body.variantId as string;

        const components = await Component.find({
            userId: new ObjectId(userId),
            projectId: new ObjectId(projectId),
            variantId: new ObjectId(variantId),
        });

        await Component.deleteMany(components);

        res.json({
            success: true,
            data: components,
            message: 'Components deleted successfully',
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
            _id: new ObjectId(componentId),
            userId: new ObjectId(userId),
            projectId: new ObjectId(projectId),
        });

        res.json({
            success: true,
            data: component,
            message: 'Component fetched successfully',
        });
    },
);
