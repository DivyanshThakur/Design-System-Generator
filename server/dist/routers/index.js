"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const project_1 = __importDefault(require("./project"));
const theme_1 = __importDefault(require("./theme"));
const component_1 = __importDefault(require("./component"));
const appRouter = (0, express_1.Router)();
appRouter.use('/auth', auth_1.default);
appRouter.use('/projects/:projectId/components', component_1.default);
appRouter.use('/projects/:projectId/themes', theme_1.default);
appRouter.use('/projects', project_1.default);
exports.default = appRouter;
//# sourceMappingURL=index.js.map