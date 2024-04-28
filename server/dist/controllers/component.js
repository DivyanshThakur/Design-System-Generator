"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComponentById = exports.deleteComponentsByVariantId = exports.updateComponentById = exports.getAllComponents = exports.createComponent = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const ErrorResponse_1 = __importDefault(require("../utils/ErrorResponse"));
const protectedHandler_1 = require("../utils/protectedHandler");
const Component_1 = __importDefault(require("../models/Component"));
const ObjectId = mongoose_1.default.Types.ObjectId;
/**
 * @desc Create Component
 * @route POST /api/projects/:projectId/components
 * @access Private
 */
exports.createComponent = (0, protectedHandler_1.protectedHandler)(async (req, res) => {
    const { label, styles, themeId, type, value } = req.body;
    const userId = res.locals.userId;
    const projectId = req.params.projectId;
    const user = await User_1.default.findById(userId);
    if (!user) {
        throw new ErrorResponse_1.default('User not found', 400);
    }
    const component = await Component_1.default.create({
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
});
/**
 * @desc Get All Components
 * @route GET /api/projects/:projectId/components
 * @access Private
 */
exports.getAllComponents = (0, protectedHandler_1.protectedHandler)(async (req, res) => {
    const userId = res.locals.userId;
    const projectId = req.params.projectId;
    const components = await Component_1.default.find({
        projectId: new ObjectId(projectId),
        userId: new ObjectId(userId),
    });
    res.json({
        success: true,
        data: components,
        message: 'Components fetched successfully',
    });
});
/**
 * @desc Update Component by Id
 * @route PATCH /api/projects/:projectId/components/:componentId
 * @access Private
 */
exports.updateComponentById = (0, protectedHandler_1.protectedHandler)(async (req, res) => {
    const userId = res.locals.userId;
    const projectId = req.params.projectId;
    const componentId = req.params.componentId;
    const reqBody = req.body;
    const component = await Component_1.default.findOneAndUpdate({
        _id: new ObjectId(componentId),
        userId: new ObjectId(userId),
        projectId: new ObjectId(projectId),
    }, {
        styles: reqBody.styles,
    }, { returnOriginal: false });
    res.json({
        success: true,
        data: component,
        message: 'Component updated successfully',
    });
});
/**
 * @desc DELETE Component by Variant Id
 * @route DELETE /api/projects/:projectId/components
 * @access Private
 */
exports.deleteComponentsByVariantId = (0, protectedHandler_1.protectedHandler)(async (req, res) => {
    const userId = res.locals.userId;
    const projectId = req.params.projectId;
    const variantId = req.body.variantId;
    const components = await Component_1.default.find({
        userId: new ObjectId(userId),
        projectId: new ObjectId(projectId),
        variantId: new ObjectId(variantId),
    });
    await Component_1.default.deleteMany(components);
    res.json({
        success: true,
        data: components,
        message: 'Components deleted successfully',
    });
});
/**
 * @desc Get Component by Id
 * @route GET /api/projects/:projectId/components/:componentId
 * @access Private
 */
exports.getComponentById = (0, protectedHandler_1.protectedHandler)(async (req, res) => {
    const userId = res.locals.userId;
    const projectId = req.params.projectId;
    const componentId = req.params.id;
    const component = await Component_1.default.findOne({
        _id: new ObjectId(componentId),
        userId: new ObjectId(userId),
        projectId: new ObjectId(projectId),
    });
    res.json({
        success: true,
        data: component,
        message: 'Component fetched successfully',
    });
});
//# sourceMappingURL=component.js.map