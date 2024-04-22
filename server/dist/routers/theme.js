"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const theme_1 = require("../controllers/theme");
const themeRouter = express_1.default.Router();
themeRouter
    .route('/projects/:projectId/themes')
    .post(auth_1.default, theme_1.createTheme)
    .patch(auth_1.default, theme_1.updateThemeByProjectId)
    .get(auth_1.default, theme_1.getThemeByProjectId);
exports.default = themeRouter;
//# sourceMappingURL=theme.js.map