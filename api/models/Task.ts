import mongoose, { Types } from 'mongoose';
import Project from "./Project";
import User from "./User";

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => Project.findById(value),
            message: 'Project does not exist',
        },
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: 'User does not exist',
        },
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['To do', 'In progress', 'Done'],
        default: 'To do',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        validate: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: 'User does not exist',
        },
    },
    link: String,
    deadline: {
        type: Date,
        required: true,
    },
});

const Task = mongoose.model('Task', TaskSchema);
export default Task;