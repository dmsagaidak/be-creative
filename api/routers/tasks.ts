import express from 'express';
import mongoose from 'mongoose';
import auth, {RequestWithUser} from "../middleware/auth";
import Task from "../models/Task";
import {pdfUpload} from "../multer";
import dayjs from "dayjs";
import Event from "../models/Event";

const tasksRouter = express.Router();

tasksRouter.get('/', auth, async (req, res, next) => {
    try{
        if(req.query.project) {
            const tasks = await Task.find({project: req.query.project}).populate('project').populate('createdBy').populate('user');
            return res.send(tasks);
        }

        if(req.query.user) {
            const tasks = await Task.find({user: req.query.user}).populate('project').populate('createdBy').populate('user');
            return res.send(tasks);
        }
    }catch (e) {
        return next(e);
    }
});

tasksRouter.get('/:id', async (req, res, next) => {
    try{
        const task = await Task.findById(req.params.id).populate('project').populate('createdBy').populate('user');

        if(!task){
            return res.status(404).send('Task not found');
        }
        return res.send(task);
    }catch (e) {
        return next(e);
    }
});

tasksRouter.post('/', auth, pdfUpload.single('pdfFile'), async (req, res, next) => {
    try{
        const user = (req as RequestWithUser).user;

        if (!user) {
            return res.status(401).send({ error: 'Wrong token!' });
        }

        const userId = user._id.toString();

        const task = await Task.create({
            project: req.body.project,
            createdBy: user._id.toString(),
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            user: req.body.user,
            link: req.body.link,
            pdfFile: req.file ? req.file.filename : null,
            start: req.body.start,
            deadline: req.body.deadline,
        });

        const event = await Event.create({
            title: req.body.title,
            start: dayjs(req.body.start).format('YYYY-MM-DD'),
            end: dayjs(req.body.deadline).format('YYYY-MM-DD'),
            createdBy: userId,
            backgroundColor: '#6f98f7',
            borderColor: '#6f98f7',
            task: task._id,
        })
        return res.send({task: task, event: event});
    }catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            return next(e);
        }
    }
});

tasksRouter.delete('/:id', auth, async (req, res, next) => {
    try{
        const user = (req as RequestWithUser).user;
        const removingTask = await Task.findById(req.params.id);

        if (!user) {
            return res.status(401).send({ error: 'Wrong token!' });
        }else if(!removingTask) {
            return res.status(404).send({error: 'Task does not exist'});
        }else if(user._id.toString() !== removingTask.createdBy.toString()) {
            return res.status(403).send({error: 'You can remove tasks only from your projects'})
        }else {
            await Task.deleteOne({_id: req.params.id});
            await Event.deleteOne({task: req.params.id});
            return res.send({message: 'Task and related event were removed', removingTask})
        }
    }catch (e) {
        return next(e);
    }
});

tasksRouter.put('/:id', auth, pdfUpload.single('pdfFile'), async (req, res, next) => {
    try{
        const user = (req as RequestWithUser).user;
        const editingTask = await Task.findById(req.params.id);
        const relatedEvent = await Event.findOne({task: req.params.id});

        if(!user){
            return res.status(401).send({error: 'Wrong token'});
        }else if(!editingTask){
            return res.status(404).send({error: 'Task does not exist'});
        }else if(user._id.toString() !== editingTask.createdBy.toString()) {
            return res.status(403).send({error: 'You can modify tasks only from your project'})
        }else{
            editingTask.title = req.body.title || editingTask.title;
            editingTask.description = req.body.description || editingTask.description;
            editingTask.status = req.body.status || editingTask.status;
            editingTask.user = req.body.user || editingTask.user;
            editingTask.link = req.body.link || editingTask.link;
            editingTask.start = req.body.start || editingTask.start;
            editingTask.deadline = req.body.deadline || editingTask.deadline;

            if(req.file) {
                editingTask.pdfFile = req.file.filename;
            }

            await editingTask.save();

            if(relatedEvent) {
                relatedEvent.title = req.body.title || relatedEvent.title;
                relatedEvent.start = req.body.start || relatedEvent.start;
                relatedEvent.end = req.body.deadline || relatedEvent.end;

                await relatedEvent.save();
            }
            return res.send({message: 'Task and related event were updated', editingTask});
        }
    }catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            return next(e);
        }
    }
});

tasksRouter.patch('/:id/toggleStatus', auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const updatingTask = await Task.findById(req.params.id);

        if (!user) {
            return res.status(401).send({ error: 'Wrong token' });
        } else if (!updatingTask) {
            return res.status(404).send({ error: 'Not found' });
        } else if (
            !user._id.equals(updatingTask.createdBy) &&
            (updatingTask.user && !updatingTask.user.equals(user._id))
        ) {
            return res.status(403).send({ error: 'You have no rights to toggle this task status' });
        } else {
            await Task.updateOne({ _id: req.params.id }, { $set: { status: req.body.status } });
            return res.send({ message: `Task status was updated for ${updatingTask.status}` });
        }
    } catch (e) {
        return next(e);
    }
});

export default tasksRouter;