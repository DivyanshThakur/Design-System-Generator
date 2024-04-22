"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const component_1 = require("../controllers/component");
const auth_1 = __importDefault(require("../middleware/auth"));
const componentRouter = express_1.default.Router();
componentRouter
    .route('/projects/:projectId/components')
    .post(auth_1.default, component_1.createComponent)
    .get(auth_1.default, component_1.getAllComponents);
componentRouter
    .route('/projects/:projectId/components/:componentId')
    .patch(auth_1.default, component_1.updateComponentById)
    .get(auth_1.default, component_1.getComponentById);
exports.default = componentRouter;
//# sourceMappingURL=component.js.map