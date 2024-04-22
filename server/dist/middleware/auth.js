"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const general_config_1 = __importDefault(require("../config/general.config"));
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized Access!' });
        }
        jsonwebtoken_1.default.verify(token, general_config_1.default.ACCESS_TOKEN_SECRET, (err) => {
            if (err) {
                return res
                    .status(401)
                    .json({ message: 'Unauthorized Access!' });
            }
            const decodedData = jsonwebtoken_1.default.decode(token);
            res.locals.tokenVersion = decodedData.tokenVersion;
            res.locals.userId = decodedData.id;
            next();
        });
    }
    catch (error) {
        return res.status(500).send('Something went wrong');
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=auth.js.map