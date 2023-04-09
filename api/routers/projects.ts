import express from 'express';
import mongoose from 'mongoose';
import auth, {RequestWithUser} from "../middleware/auth";
import Project from "../models/Project";

const projectsRouter = express.Router();

projectsRouter.get('/', auth, async (req, res, next) => {
    try{
        const user = (req as RequestWithUser).user;

        const projects = await Project.find({leader: user._id}).populate('leader');
        return res.send(projects);
    }catch (e) {
        return next(e);
    }
});

projectsRouter.get('/:id', async (req, res, next) => {
    try{
        const project = await Project.findById(req.params.id).populate('leader');

        if(!project) {
            return res.status(404).send({error: 'The project does not exist'});
        }

        return res.send(project)
    }catch (e) {
        return next(e);
    }
});

projectsRouter.post('/', auth, async (req, res, next) => {
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
        });

        return res.send(project);
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

        if(!removingItem) {
            return res.status(404).send({error: 'Project not found'})
        }else if(removingItem.leader.toString() !== user._id.toString()) {
            return res.send(403).send({error: 'You can remove only your projects'})
        }else {
            await Project.deleteOne({_id: req.params.id});
            return res.send({message: `Project with id: ${removingItem._id} was removed`})
        }
    }catch (e) {
        return next(e);
    }
});

export default projectsRouter;