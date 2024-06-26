"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const project_1 = require("../controllers/project");
const auth_1 = __importDefault(require("../middleware/auth"));
const projectRouter = express_1.default.Router();
projectRouter
    .route('/')
    .post(auth_1.default, project_1.createProject)
    .get(auth_1.default, project_1.getAllProjects);
projectRouter.route('/:projectId').get(auth_1.default, project_1.getProjectById);
exports.default = projectRouter;
//# sourceMappingURL=project.js.map