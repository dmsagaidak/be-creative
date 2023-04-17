import mongoose, { Types } from 'mongoose';
import Project from "./Project";

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
    isAssigned: {
        type: Boolean,
        required: true,
        default: false,
    },
    user: String,
    link: String,
    deadline: {
        type: Date,
        required: true,
    },
});

const Task = mongoose.model('Task', TaskSchema);
export default Task;