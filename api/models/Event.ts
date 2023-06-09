import mongoose, { Types } from 'mongoose';
import User from './User';
import Project from './Project';
import Task from './Task';

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
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
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    validate: {
      validator: async (value: Types.ObjectId) => Project.findById(value),
      message: 'Project does not exist',
    },
  },
  task: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
    validate: {
      validator: async (value: Types.ObjectId) => Task.findById(value),
      message: 'Task does not exist',
    },
  },
  backgroundColor: String,
  borderColor: String,
});

const Event = mongoose.model('Event', EventSchema);
export default Event;
