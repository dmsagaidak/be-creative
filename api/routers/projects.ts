import express from 'express';
import mongoose from 'mongoose';
import auth, {RequestWithUser} from "../middleware/auth";
import Project from "../models/Project";

const projectsRouter = express.Router();

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

export default projectsRouter;