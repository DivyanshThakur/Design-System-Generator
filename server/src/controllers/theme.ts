import { Request, Response } from 'express';
import User from '../models/User';
import ErrorResponse from '../utils/ErrorResponse';
import { protectedHandler } from '../utils/protectedHandler';
import Theme from '../models/Theme';

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
 * @desc Get All Themes
 * @route GET /api/projects/:projectId/themes
 * @access Private
 */
export const getAllThemes = protectedHandler(
    async (req: Request, res: Response) => {
        const userId = res.locals.userId;
        const projectId = req.params.projectId;

        const themes = await Theme.find({ projectId, userId });

        res.json({
            success: true,
            data: themes,
            message: 'Themes fetched successfully',
        });
    },
);

/**
 * @desc Update Theme by Id
 * @route PATCH /api/projects/:projectId/themes/:themeId
 * @access Private
 */
export const updateThemeById = protectedHandler(
    async (req: Request, res: Response) => {
        const userId = res.locals.userId as string;
        const projectId = req.params.projectId;
        const themeId = req.params.id as string;

        const theme = await Theme.findOneAndUpdate(
            { _id: themeId, userId, projectId },
            {},
            { returnOriginal: false },
        );

        res.json({
            success: true,
            data: theme,
            message: 'Theme fetched successfully',
        });
    },
);

/**
 * @desc Get Theme by Id
 * @route GET /api/projects/:projectId/themes/:themeId
 * @access Private
 */
export const getThemeById = protectedHandler(
    async (req: Request, res: Response) => {
        const userId = res.locals.userId as string;
        const projectId = req.params.projectId;
        const themeId = req.params.id as string;

        const theme = await Theme.findOne({ _id: themeId, projectId, userId });

        res.json({
            success: true,
            data: theme,
            message: 'Theme fetched successfully',
        });
    },
);
