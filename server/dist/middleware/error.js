"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
const general_config_js_1 = __importDefault(require("../config/general.config.js"));
const ErrorResponse_js_1 = __importDefault(require("../utils/ErrorResponse.js"));
const notFound = (req, _res, next) => {
    const error = new ErrorResponse_js_1.default(`Not Found - ${req.originalUrl}`, 404);
    next(error);
};
exports.notFound = notFound;
const errorHandler = (err, _req, res, _next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Server Error',
        stack: general_config_js_1.default.NODE_ENV === 'production' ? null : err.stack,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.js.map