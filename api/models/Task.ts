import mongoose, { Types } from 'mongoose';
import Project from './Project';
import User from './User';

const Schema = mongoose.Schema;

function validateDeadline(this: any, deadline: Date): boolean {
  return deadline >= this.start;
}

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
    enum: ['To do', 'In progress', 'On hold', 'Done'],
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
  pdfFile: String,
  start: {
    type: Date,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
    validate: {
      validator: validateDeadline,
      message: 'Deadline must be later than start date',
    },
  },
});

TaskSchema.path('deadline').validate(async function (value: Date) {
  const project = await Project.findById(this.project);
  if (project) {
    return value >= this.start && value <= project.deadline;
  }
}, 'Deadline must be later than project start date and earlier than project deadline date');

TaskSchema.path('start').validate(async function (value: Date) {
  const project = await Project.findById(this.project);
  if (project) {
    return value >= project.start && value <= project.deadline;
  }
}, 'Start must be equal or later than project start date and earlier than project deadline date');

const Task = mongoose.model('Task', TaskSchema);
export default Task;
