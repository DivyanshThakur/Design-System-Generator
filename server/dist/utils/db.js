"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const db_config_1 = __importDefault(require("../config/db.config"));
const connectDB = async () => {
    try {
        const conn = await mongoose_1.default.connect(db_config_1.default.MONGO_URI);
        console.log('MongoDB Connected : ', conn.connection.host);
    }
    catch (error) {
        console.error('Error: ', error.message);
    }
};
exports.default = connectDB;
//# sourceMappingURL=db.js.map