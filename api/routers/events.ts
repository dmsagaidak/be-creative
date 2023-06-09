import express from 'express';
import Event from '../models/Event';
import auth, { RequestWithUser } from '../middleware/auth';
import mongoose from 'mongoose';

const eventsRouter = express.Router();

eventsRouter.get('/', async (req, res, next) => {
  try {
    const events = await Event.find().populate('createdBy').populate('project').populate('task');
    return res.send(events);
  } catch (e) {
    return next(e);
  }
});

eventsRouter.get('/:id', async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy').populate('project').populate('task');

    if (!event) {
      return res.status(404).send({ error: 'Event not found!' });
    }

    return res.send(event);
  } catch (e) {
    return next(e);
  }
});

eventsRouter.post('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    if (!user) {
      return res.status(401).send({ error: 'Wrong token!' });
    }

    const userId = user._id.toString();

    const event = await Event.create({
      title: req.body.title,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      createdBy: userId,
      backgroundColor: '#6e6e6e',
      borderColor: '#6e6e6e',
    });

    return res.send(event);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

eventsRouter.delete('/:id', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const removingItem = await Event.findById(req.params.id);

    if (!user) {
      return res.status(401).send({ error: 'Wrong token!' });
    } else if (!removingItem) {
      return res.status(404).send({ error: 'Event not found' });
    } else if (!user._id.equals(removingItem.createdBy)) {
      return res.status(403).send({ error: 'You can remove only your events' });
    } else {
      await Event.deleteOne({ _id: req.params.id });
      return res.send({ message: `Event with id: ${removingItem._id} was removed` });
    }
  } catch (e) {
    return next(e);
  }
});

eventsRouter.put('/:id', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const updatingEvent = await Event.findById(req.params.id);

    if (!user) {
      return res.status(401).send({ error: 'Wrong token' });
    } else if (!updatingEvent) {
      return res.status(404).send({ error: 'Event does not exist' });
    } else if (!user._id.equals(updatingEvent.createdBy)) {
      return res.status(403).send({ error: 'You can modify only your events' });
    } else {
      updatingEvent.title = req.body.title || updatingEvent.title;
      updatingEvent.description = req.body.description || updatingEvent.description;
      updatingEvent.start = req.body.start || updatingEvent.start;
      updatingEvent.end = req.body.end || updatingEvent.end;

      await updatingEvent.save();
      return res.send({ message: 'Event was updated', updatingEvent });
    }
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default eventsRouter;
