import express from 'express';
import User from '../models/User';
import mongoose from 'mongoose';
import {imagesUpload} from "../multer";

const usersRouter = express.Router();

usersRouter.post('/', imagesUpload.single('avatar'), async (req, res, next) => {
    try{
        const user = new User({
            email: req.body.email,
            password: req.body.password,
            displayName: req.body.displayName,
            avatar: req.file ? req.file.filename : null,
        });

        user.generateToken();

        await user.save();
        return res.send(user);
    }catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        return next(e);
    }
});

usersRouter.post('/sessions', async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
        return res.status(404).send({ error: 'Password not found' });
    }

    try {
        user.generateToken();
        await user.save();
        return res.send({ message: 'Username and password are correct', user });
    } catch (e) {
        return next(e);
    }
});

usersRouter.delete('/sessions', async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        const success = { message: 'OK' };

        if (!token) {
            return res.send(success);
        }

        const user = await User.findOne({ token });

        if (!user) {
            return res.send(success);
        }

        user.generateToken();
        await user.save();
        return res.send(success);
    } catch (e) {
        return next(e);
    }
});

export default usersRouter;