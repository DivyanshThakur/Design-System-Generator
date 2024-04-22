'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.getThemeByProjectId =
    exports.updateThemeById =
    exports.getAllThemes =
    exports.createTheme =
        void 0;
const User_1 = __importDefault(require('../models/User'));
const ErrorResponse_1 = __importDefault(require('../utils/ErrorResponse'));
const protectedHandler_1 = require('../utils/protectedHandler');
const Theme_1 = __importDefault(require('../models/Theme'));
/**
 * @desc Create Theme
 * @route POST /api/projects/:projectId/themes
 * @access Private
 */
exports.createTheme = (0, protectedHandler_1.protectedHandler)(
    async (req, res) => {
        const { colors, radius, spacing } = req.body;
        const userId = res.locals.userId;
        const projectId = req.params.projectId;
        const user = await User_1.default.findById(userId);
        if (!user) {
            throw new ErrorResponse_1.default('User not found', 400);
        }
        const theme = await Theme_1.default.create({
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
exports.getAllThemes = (0, protectedHandler_1.protectedHandler)(
    async (req, res) => {
        const userId = res.locals.userId;
        const projectId = req.params.projectId;
        const themes = await Theme_1.default.find({ projectId, userId });
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
exports.updateThemeById = (0, protectedHandler_1.protectedHandler)(
    async (req, res) => {
        const userId = res.locals.userId;
        const projectId = req.params.projectId;
        const themeId = req.params.id;
        const theme = await Theme_1.default.findOneAndUpdate(
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
exports.getThemeByProjectId = (0, protectedHandler_1.protectedHandler)(
    async (req, res) => {
        const userId = res.locals.userId;
        const projectId = req.params.projectId;
        const themeId = req.params.id;
        const theme = await Theme_1.default.findOne({
            _id: themeId,
            projectId,
            userId,
        });
        res.json({
            success: true,
            data: theme,
            message: 'Theme fetched successfully',
        });
    },
);
//# sourceMappingURL=theme.js.map
