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
                name: String,
                value: String,
            },
        ],
        spacingList: [
            {
                name: String,
                value: String,
            },
        ],
        radiusList: [
            {
                name: String,
                value: String,
            },
        ],
    },
    {
        timestamps: true,
    },
);

const Theme = model('Theme', themeSchema);

export default Theme;
