"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const theme_1 = require("../controllers/theme");
const auth_1 = __importDefault(require("../middleware/auth"));
const themeRouter = express_1.default.Router();
themeRouter
    .route('/')
    .post(auth_1.default, theme_1.createTheme)
    .get(auth_1.default, theme_1.getAllThemes);
themeRouter
    .route('/:themeId')
    .patch(auth_1.default, theme_1.updateThemeById)
    .get(auth_1.default, theme_1.getThemeById);
exports.default = themeRouter;
//# sourceMappingURL=theme.js.map