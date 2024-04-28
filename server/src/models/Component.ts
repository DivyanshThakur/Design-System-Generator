import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const componentSchema = new Schema(
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
        type: {
            type: String,
            enum: ['button', 'input-text', 'radio', 'checkbox', 'select'],
            required: true,
        },
        themeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Theme',
            required: true,
        },
        variantId: {
            type: mongoose.Schema.Types.ObjectId,
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
    },
    {
        timestamps: true,
    },
);

const Component = model('Component', componentSchema);

export default Component;
