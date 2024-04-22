"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectById = exports.getAllProjects = exports.createProject = void 0;
const Project_1 = __importDefault(require("../models/Project"));
const User_1 = __importDefault(require("../models/User"));
const ErrorResponse_1 = __importDefault(require("../utils/ErrorResponse"));
const protectedHandler_1 = require("../utils/protectedHandler");
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
    const projects = await Project_1.default.find({ userId });
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
    const projects = await Project_1.default.findOne({ _id: projectId, userId });
    res.json({
        success: true,
        data: projects,
        message: 'Projects fetched successfully',
    });
});
//# sourceMappingURL=project.js.map