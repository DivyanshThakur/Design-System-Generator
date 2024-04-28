"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectById = exports.getAllProjects = exports.createProject = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Project_1 = __importDefault(require("../models/Project"));
const User_1 = __importDefault(require("../models/User"));
const ErrorResponse_1 = __importDefault(require("../utils/ErrorResponse"));
const protectedHandler_1 = require("../utils/protectedHandler");
const Theme_1 = __importDefault(require("../models/Theme"));
const Component_1 = __importDefault(require("../models/Component"));
const ObjectId = mongoose_1.default.Types.ObjectId;
/**
 * @desc Create Project
 * @route POST /api/projects
 * @access Private
 */
exports.createProject = (0, protectedHandler_1.protectedHandler)(async (req, res) => {
    const { projectName } = req.body;
    const userId = res.locals.userId;
    const user = await User_1.default.findById(userId);
    if (!user) {
        throw new ErrorResponse_1.default('User not found', 400);
    }
    const project = await Project_1.default.create({
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
    const theme = await Theme_1.default.create({
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
        variants: [{ name: 'Primary' }],
    });
    const componentTypes = [
        'button',
        'input-text',
        'radio',
        'checkbox',
        'select',
    ];
    // Initializing components with default styles
    await Promise.all(componentTypes.map((type) => {
        return Component_1.default.create({
            projectId: project._id,
            userId: user._id,
            type,
            themeId: theme._id,
            variantId: theme.variants[0]._id,
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
    res.json({
        success: true,
        data: project,
        message: 'Project created successfully',
    });
});
/**
 * @desc Get All Projects
 * @route GET /api/projects
 * @access Private
 */
exports.getAllProjects = (0, protectedHandler_1.protectedHandler)(async (_req, res) => {
    const userId = res.locals.userId;
    const projects = await Project_1.default.find({ userId: new ObjectId(userId) });
    res.json({
        success: true,
        data: projects,
        message: 'Projects fetched successfully',
    });
});
/**
 * @desc Get Project by Id
 * @route GET /api/projects/:projectId
 * @access Private
 */
exports.getProjectById = (0, protectedHandler_1.protectedHandler)(async (req, res) => {
    const userId = res.locals.userId;
    const projectId = req.params.projectId;
    const projects = await Project_1.default.findOne({
        _id: new ObjectId(projectId),
        userId: new ObjectId(userId),
    });
    res.json({
        success: true,
        data: projects,
        message: 'Projects fetched successfully',
    });
});
//# sourceMappingURL=project.js.map