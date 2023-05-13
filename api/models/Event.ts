import mongoose from "mongoose";

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
});

const Event = mongoose.model('Event', EventSchema);
export default Event;