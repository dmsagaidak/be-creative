import mongoose, { Types } from 'mongoose';
import User from './User';

const Schema = mongoose.Schema;

const ParticipantsSchema = new Schema({
    role: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: 'User does not exist',
        },
    }
});

function validateDeadline(this: any, deadline: Date): boolean {
    return deadline >= this.start;
}

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
        validate: {
            validator: validateDeadline,
            message: 'Deadline must be later than start date',
        },
    },
    image: {
        type: String,
        required: true,
    },
    participants: {
        type: [ParticipantsSchema],
        default: [],
    },
});

const Project = mongoose.model('Project', ProjectSchema);
export default Project;