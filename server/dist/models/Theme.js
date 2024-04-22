"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const themeSchema = new Schema({
    projectId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    colors: [
        {
            name: String,
            value: String,
        },
    ],
    spacing: {
        baseSizeInPx: Number,
        variantCount: Number,
        variants: [
            {
                variableName: String,
                sizeInPx: Number,
            },
        ],
    },
    radius: {
        isSharpRadius: {
            type: Boolean,
            default: false,
        },
        baseSizeInPx: Number,
        variantCount: Number,
        multiplier: Number,
        variants: [
            {
                variableName: String,
                sizeInPx: Number,
            },
        ],
    },
}, {
    timestamps: true,
});
const Theme = model('Theme', themeSchema);
exports.default = Theme;
//# sourceMappingURL=Theme.js.map