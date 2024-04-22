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
    const theme = await Theme_1.default.findOneAndUpdate({
        userId: new ObjectId(userId),
        projectId: new ObjectId(projectId),
    }, updateObj, { returnOriginal: false });
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