import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const projectSchema = new Schema(
    {
        name: { type: String, required: true },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const Project = model('Project', projectSchema);

export default Project;
