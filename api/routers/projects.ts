import express from 'express';
import mongoose from 'mongoose';
import auth, {RequestWithUser} from "../middleware/auth";
import Project from "../models/Project";
import Event from "../models/Event";
import {imagesUpload} from "../multer";
import dayjs from "dayjs";
import Task from "../models/Task";

const projectsRouter = express.Router();

projectsRouter.get('/', async (req, res, next) => {
    try{
        const projects = await Project.find({leader: req.query.user}).populate('leader');
        return res.send(projects);
    }catch (e) {
        return next(e);
    }
});

projectsRouter.get('/:id', async (req, res, next) => {
    try{
        const project = await Project.findById(req.params.id).populate('leader').populate('participants.user');

        if(!project) {
            return res.status(404).send({error: 'The project does not exist'});
        }

        return res.send(project)
    }catch (e) {
        return next(e);
    }
});

projectsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    try{
        const user = (req as RequestWithUser).user;

        if (!user) {
            return res.status(401).send({ error: 'Wrong token!' });
        }

        const userId = user._id.toString();

        const project = await  Project.create({
            title: req.body.title,
            description: req.body.description,
            leader: userId,
            start: req.body.start,
            deadline: req.body.deadline,
            image: req.file ? req.file.filename : null,
            participants: JSON.parse(req.body.participants),
        });

        const event = await Event.create({
            title: req.body.title,
            start: dayjs(req.body.start).format('YYYY-MM-DD'),
            end: dayjs(req.body.deadline).format('YYYY-MM-DD'),
            createdBy: userId,
        });

        return res.send({project: project, event: event});
    }catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            return next(e);
        }
    }
});

projectsRouter.delete('/:id', auth, async (req, res, next) => {
    try{
        const user = (req as RequestWithUser).user;
        const removingItem = await Project.findById(req.params.id);
        const relatedTasks = await Task.find({project: req.params.id});

        if(!user){
            return res.status(401).send({ error: 'Wrong token!' });
        }else if(!removingItem) {
            return res.status(404).send({error: 'Project not found'});
        }else if(removingItem.leader.toString() !== user._id.toString()) {
            return res.status(403).send({error: 'You can remove only your projects'});
        }else if(relatedTasks.length){
            return res.status(403).send({error: 'Projects having related tasks cannot be removed'});
        } else {
            await Project.deleteOne({_id: req.params.id});
            return res.send({message: `Project with id: ${removingItem._id} was removed`});
        }
    }catch (e) {
        return next(e);
    }
});

projectsRouter.put('/:id', auth, imagesUpload.single('image'), async (req, res, next) => {
    try{
        const user = (req as RequestWithUser).user;

        const updatingProject = await Project.findById(req.params.id);

        if(!updatingProject){
            return res.status(404).send({error: 'Project not found'});
        }

        if(user._id === updatingProject.leader._id) {
            return res.status(403).send({error: 'Only project leader can modify project data'});
        }

        updatingProject.title = req.body.title || updatingProject.title;
        updatingProject.description = req.body.description || updatingProject.description;
        updatingProject.status = req.body.status || updatingProject.status;
        updatingProject.start = req.body.start || updatingProject.start;
        updatingProject.deadline = req.body.deadline || updatingProject.deadline;
        if(req.file) {
            updatingProject.image = req.file.filename;
        }
        if(req.body.participants){
            updatingProject.participants = JSON.parse(req.body.participants);
        }

        await updatingProject.save();

        return res.send({message: 'Project was updated', updatingProject})

    }catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            return next(e);
        }
    }
});

export default projectsRouter;