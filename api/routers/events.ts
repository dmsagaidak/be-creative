import express from "express";
import Event from '../models/Event'

const eventsRouter = express.Router();

eventsRouter.get('/', async (req, res, next) => {
    try{
        const events = await Event.find();
        return res.send(events);
    }catch (e) {
        return next(e);
    }
});

eventsRouter.post('/', async (req, res, next) => {
    try{
        const event = await Event.create({
            title: req.body.title,
            start: req.body.start,
            end: req.body.end,
        });

        return res.send(event);
    }catch (e) {
        return next(e);
    }
});

export default eventsRouter;
