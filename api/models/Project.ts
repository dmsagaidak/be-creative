import mongoose, { Types } from 'mongoose';
import User from './User';

const Schema = mongoose.Schema;

let today = new Date();

const ProjectSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    leader: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: 'User does not exist',
        },
    },
    status: {
        type: String,
        required: true,
        enum: ['not started', 'ongoing', 'finished'],
        default: 'not started'
    },
    start: {
        type: Date,
        required: true,
        min: today,
    },
    deadline: {
        type: Date,
        required: true,
    },
});

const Project = mongoose.model('Project', ProjectSchema);
export default Project;