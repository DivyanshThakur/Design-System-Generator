import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
import ErrorResponse from '../utils/ErrorResponse';
import { protectedHandler } from '../utils/protectedHandler';
import Theme from '../models/Theme';
import Component from '../models/Component';

const ObjectId = mongoose.Types.ObjectId;

interface Item {
    _id: string;
    name: string;
    value?: string;
}

interface ICreateThemeBody {
    colors: Item[];
    radiusList: Item[];
    spacingList: Item[];
}

/**
 * @desc Create Theme
 * @route POST /api/projects/:projectId/themes
 * @access Private
 */
export const createTheme = protectedHandler(
    async (req: Request, res: Response) => {
        const { colors, radiusList, spacingList } =
            req.body as ICreateThemeBody;
        const userId = res.locals.userId as string;
        const projectId = req.params.projectId;

        const user = await User.findById(userId);

        if (!user) {
            throw new ErrorResponse('User not found', 400);
        }

        const theme = await Theme.create({
            projectId,
            colors,
            radiusList,
            spacingList,
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

        const updateObj: any = {};

        if (body.colors?.length >= 2) updateObj.colors = body.colors;
        if (body.radiusList?.length >= 7)
            updateObj.radiusList = body.radiusList;
        if (body.spacingList?.length >= 7)
            updateObj.spacingList = body.spacingList;
        if (body.variants?.length >= 1) updateObj.variants = body.variants;

        const addedVariants: string[] = body.addedVariants ?? [];
        const deletedVariants: string[] = body.deletedVariants ?? [];

        const componentTypes = [
            'button',
            'input-text',
            'radio',
            'checkbox',
            'select',
        ];

        const theme = await Theme.findOneAndUpdate(
            {
                userId: new ObjectId(userId),
                projectId: new ObjectId(projectId),
            },
            updateObj,
            { returnOriginal: false },
        );

        await Promise.all(
            theme.variants
                .filter((v) => addedVariants.includes(v.name))
                .map(async (v: any) => {
                    await Promise.all(
                        componentTypes.map((type) => {
                            return Component.create({
                                projectId,
                                userId,
                                type,
                                themeId: theme._id,
                                variantId: v._id,
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
                }),
        );

        await Promise.all(
            theme.variants
                .filter((v: any) => deletedVariants.includes(v._id))
                .map(async (v: any) => {
                    const components = await Component.find({
                        userId: theme.userId,
                        projectId: theme.projectId,
                        variantId: v._id,
                    });

                    await Component.deleteMany(components);
                }),
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
