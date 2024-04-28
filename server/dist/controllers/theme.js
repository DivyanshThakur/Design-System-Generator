"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThemeByProjectId = exports.updateThemeByProjectId = exports.createTheme = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const ErrorResponse_1 = __importDefault(require("../utils/ErrorResponse"));
const protectedHandler_1 = require("../utils/protectedHandler");
const Theme_1 = __importDefault(require("../models/Theme"));
const Component_1 = __importDefault(require("../models/Component"));
const ObjectId = mongoose_1.default.Types.ObjectId;
/**
 * @desc Create Theme
 * @route POST /api/projects/:projectId/themes
 * @access Private
 */
exports.createTheme = (0, protectedHandler_1.protectedHandler)(async (req, res) => {
    const { colors, radiusList, spacingList } = req.body;
    const userId = res.locals.userId;
    const projectId = req.params.projectId;
    const user = await User_1.default.findById(userId);
    if (!user) {
        throw new ErrorResponse_1.default('User not found', 400);
    }
    const theme = await Theme_1.default.create({
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
});
/**
 * @desc Update Theme by Project Id
 * @route PATCH /api/projects/:projectId/themes
 * @access Private
 */
exports.updateThemeByProjectId = (0, protectedHandler_1.protectedHandler)(async (req, res) => {
    const userId = res.locals.userId;
    const projectId = req.params.projectId;
    const body = req.body;
    const updateObj = {};
    if (body.colors?.length >= 2)
        updateObj.colors = body.colors;
    if (body.radiusList?.length >= 7)
        updateObj.radiusList = body.radiusList;
    if (body.spacingList?.length >= 7)
        updateObj.spacingList = body.spacingList;
    if (body.variants?.length >= 1)
        updateObj.variants = body.variants;
    const addedVariants = body.addedVariants ?? [];
    const deletedVariants = body.deletedVariants ?? [];
    const componentTypes = [
        'button',
        'input-text',
        'radio',
        'checkbox',
        'select',
    ];
    const theme = await Theme_1.default.findOneAndUpdate({
        userId: new ObjectId(userId),
        projectId: new ObjectId(projectId),
    }, updateObj, { returnOriginal: false });
    await Promise.all(theme.variants
        .filter((v) => addedVariants.includes(v.name))
        .map(async (v) => {
        await Promise.all(componentTypes.map((type) => {
            return Component_1.default.create({
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
        }));
    }));
    await Promise.all(theme.variants
        .filter((v) => deletedVariants.includes(v._id))
        .map(async (v) => {
        const components = await Component_1.default.find({
            userId: theme.userId,
            projectId: theme.projectId,
            variantId: v._id,
        });
        await Component_1.default.deleteMany(components);
    }));
    res.json({
        success: true,
        data: theme,
        message: 'Theme updated successfully',
    });
});
/**
 * @desc Get Theme by Project Id
 * @route GET /api/projects/:projectId/themes
 * @access Private
 */
exports.getThemeByProjectId = (0, protectedHandler_1.protectedHandler)(async (req, res) => {
    const userId = res.locals.userId;
    const projectId = req.params.projectId;
    const theme = await Theme_1.default.findOne({
        projectId: new ObjectId(projectId),
        userId: new ObjectId(userId),
    });
    res.json({
        success: true,
        data: theme,
        message: 'Theme fetched successfully',
    });
});
//# sourceMappingURL=theme.js.map