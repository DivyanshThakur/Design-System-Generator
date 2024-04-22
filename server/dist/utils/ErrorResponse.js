"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorResponse extends Error {
    statusCode;
    constructor(message = "Server Error", statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.default = ErrorResponse;
//# sourceMappingURL=ErrorResponse.js.map