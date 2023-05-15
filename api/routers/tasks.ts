import express from 'express';
import mongoose from 'mongoose';
import auth, {RequestWithUser} from "../middleware/auth";
import Task from "../models/Task";

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

tasksRouter.get('/:id', auth, async (req, res, next) => {
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

tasksRouter.post('/', auth, async (req, res, next) => {
    try{
        const user = (req as RequestWithUser).user;

        if (!user) {
            return res.status(401).send({ error: 'Wrong token!' });
        }

        const task = await Task.create({
            project: req.body.project,
            createdBy: user._id.toString(),
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            user: req.body.user,
            link: req.body.link,
            deadline: req.body.deadline
        });

        return res.send(task);
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
            return res.send({message: 'Task was removed', removingTask})
        }
    }catch (e) {
        return next(e);
    }
});

tasksRouter.put('/:id', auth, async (req, res, next) => {
    try{
        const user = (req as RequestWithUser).user;
        const editingTask = await Task.findById(req.params.id);

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
            editingTask.deadline = req.body.deadline || editingTask.deadline;

            await editingTask.save();
            return res.send({message: 'Task was updated', editingTask});
        }
    }catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            return next(e);
        }
    }
});

export default tasksRouter;