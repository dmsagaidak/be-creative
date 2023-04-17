import express from 'express';
import mongoose from 'mongoose';
import auth, {RequestWithUser} from "../middleware/auth";
import Task from "../models/Task";

const tasksRouter = express.Router();

tasksRouter.get('/', auth, async (req, res, next) => {
    try{
        if(req.query.project) {
            const tasks = await Task.find({project: req.query.project}).populate('project');
            return res.send(tasks);
        }
    }catch (e) {
        return next(e);
    }
});

export default tasksRouter;