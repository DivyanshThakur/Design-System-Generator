import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
import ErrorResponse from '../utils/ErrorResponse';
import { protectedHandler } from '../utils/protectedHandler';
import Theme from '../models/Theme';

const ObjectId = mongoose.Types.ObjectId;

interface ICreateThemeBody {
    colors: { variableName: string; hexCode: string }[];
    spacing: {
        baseSizeInPx: number;
        variantCount: number;
        variants: { variableName: string; sizeInPx: number }[];
    };
    radius: {
        isSharpRadius: boolean;
        baseSizeInPx: number;
        variantCount: number;
        multiplier: number;
        variants: { variableName: string; sizeInPx: number };
    };
}

/**
 * @desc Create Theme
 * @route POST /api/projects/:projectId/themes
 * @access Private
 */
export const createTheme = protectedHandler(
    async (req: Request, res: Response) => {
        const { colors, radius, spacing } = req.body as ICreateThemeBody;
        const userId = res.locals.userId as string;
        const projectId = req.params.projectId;

        const user = await User.findById(userId);

        if (!user) {
            throw new ErrorResponse('User not found', 400);
        }

        const theme = await Theme.create({
            projectId,
            colors,
            radius,
            spacing,
            userId: user._id,
        });

        res.json({
            success: true,
            data: theme,
            message: 'Theme created successfully',
        });
    },
);

/**
 * @desc Update Theme by Project Id
 * @route PATCH /api/projects/:projectId/themes
 * @access Private
 */
export const updateThemeByProjectId = protectedHandler(
    async (req: Request, res: Response) => {
        const userId = res.locals.userId as string;
        const projectId = req.params.projectId as string;
        const body: any = req.body;

        const theme = await Theme.findOneAndUpdate(
            {
                userId: new ObjectId(userId),
                projectId: new ObjectId(projectId),
            },
            {
                colors: body.colors,
            },
            { returnOriginal: false },
        );

        res.json({
            success: true,
            data: theme,
            message: 'Theme updated successfully',
        });
    },
);

/**
 * @desc Get Theme by Project Id
 * @route GET /api/projects/:projectId/themes
 * @access Private
 */
export const getThemeByProjectId = protectedHandler(
    async (req: Request, res: Response) => {
        const userId = res.locals.userId as string;
        const projectId = req.params.projectId;

        const theme = await Theme.findOne({
            projectId: new ObjectId(projectId),
            userId: new ObjectId(userId),
        });

        res.json({
            success: true,
            data: theme,
            message: 'Theme fetched successfully',
        });
    },
);
