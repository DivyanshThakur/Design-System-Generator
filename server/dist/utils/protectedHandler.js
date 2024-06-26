"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedHandler = void 0;
/**
 * Async handler to wrap the API routes, allowing for async error handling.
 * @param fn Function to call for the API endpoint
 * @returns Promise with a catch statement
 */
const protectedHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
exports.protectedHandler = protectedHandler;
//# sourceMappingURL=protectedHandler.js.map