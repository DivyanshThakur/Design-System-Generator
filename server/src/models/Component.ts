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
            enum: ['button', 'input', 'select'],
            required: true,
        },
        label: String,
        value: String,
        themeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Theme',
            required: true,
        },
        styles: {
            backgroundColor: String,
            textColor: String,
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
