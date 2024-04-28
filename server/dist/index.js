"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const general_config_1 = __importDefault(require("./config/general.config"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const index_js_1 = __importDefault(require("./routers/index.js"));
const db_js_1 = __importDefault(require("./utils/db.js"));
const error_js_1 = require("./middleware/error.js");
const app = (0, express_1.default)();
(0, db_js_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)({
    origin: general_config_1.default.ALLOWED_DOMAINS,
    credentials: true,
}));
app.use('/api', index_js_1.default);
app.get('/', (_req, res) => {
    res.json({ message: 'Namaste From Identity API' });
});
/* ERROR HANDLER */
app.use(error_js_1.notFound);
app.use(error_js_1.errorHandler);
app.listen(general_config_1.default.PORT, () => console.log('Server running on port', general_config_1.default.PORT));
//# sourceMappingURL=index.js.map