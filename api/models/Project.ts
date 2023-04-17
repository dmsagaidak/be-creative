import mongoose, { Types } from 'mongoose';
import User from './User';

const Schema = mongoose.Schema;

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
        enum: ['Not started', 'Ongoing', 'Finished'],
        default: 'Not started'
    },
    start: {
        type: Date,
        required: true,
        min: new Date('January 1, 2023, 00:00'),
    },
    deadline: {
        type: Date,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    participants: {
        type: Array,
        default: [],
    },
});

const Project = mongoose.model('Project', ProjectSchema);
export default Project;