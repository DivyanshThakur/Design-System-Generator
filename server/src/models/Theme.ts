import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const themeSchema = new Schema(
    {
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        colors: [
            {
                variableName: String,
                hexCode: String,
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
    },
    {
        timestamps: true,
    },
);

const Theme = model('Theme', themeSchema);

export default Theme;
