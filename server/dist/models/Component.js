"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const componentSchema = new Schema({
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
    type: {
        type: String,
        enum: ['button', 'input-text', 'radio', 'checkbox', 'select'],
        required: true,
    },
    themeId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Theme',
        required: true,
    },
    variantId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Variant',
    },
    styles: {
        textColor: String,
        backgroundColor: String,
        borderColor: String,
        borderRadius: String,
        paddingX: String,
        paddingY: String,
    },
}, {
    timestamps: true,
});
const Component = model('Component', componentSchema);
exports.default = Component;
//# sourceMappingURL=Component.js.map