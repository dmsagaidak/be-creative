import express from 'express';
import User from '../models/User';
import mongoose from 'mongoose';
import {imagesUpload} from "../multer";
import {OAuth2Client} from "google-auth-library";
import config from "../config";
import {randomUUID} from "crypto";
import axios from "axios";
import {promises as fs} from 'fs';

const usersRouter = express.Router();

const client = new OAuth2Client(config.google.clientId);

usersRouter.get('/:id', async (req, res, next) => {
    try{
        const result = await User.findById(req.params.id);
        return res.send(result);
    }catch (e) {
        return next(e);
    }
});

usersRouter.post('/', imagesUpload.single('avatar'), async (req, res, next) => {
    try{
        const user = new User({
            email: req.body.email,
            password: req.body.password,
            displayName: req.body.displayName,
            organization: req.body.organization,
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

usersRouter.post('/google', async (req, res, next) => {
    try{
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: config.google.clientId,
        });

        const payload = ticket.getPayload();

        if (!payload) {
            return res.status(400).send({ error: 'Google login error!' });
        }

        const pathName = './public/images';
        const randomImgName = randomUUID() + '.jpg';
        const imagePath = `${pathName}/${randomImgName}`;

        const downloadPic = async (url: string, path: string) => {
            const response = await axios.get(url, { responseType: 'arraybuffer' });
            await fs.writeFile(path, response.data, 'binary');
        };

        if(payload.picture) {
            await downloadPic(payload.picture, imagePath);
        }

        const email = payload['email'];
        const googleId = payload['sub'];
        const displayName = payload['name'];
        const avatar = imagePath;

        if (!email) {
            return res.status(400).send({ error: 'Not enough user data to continue' });
        }

        let user = await User.findOne({ googleId });

        if(!user) {
            user = new User({
                displayName,
                email,
                password: crypto.randomUUID(),
                googleId,
                avatar
            });
        }

        user.generateToken();
        await user.save();
        return res.send({ message: 'Login with Google successful!', user });
    }catch (e) {
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

usersRouter.put('/:id', imagesUpload.single('avatar'), async (req, res, next) => {
    try{
        const updatingUser = await User.findById(req.params.id);

        if(!updatingUser) {
            return res.status(404).send({error: 'User not found'});
        }

       const user = await User.updateOne({_id: req.params.id},
           {$set:{email: req.body.email,
                    displayName: req.body.displayName,
                    password: req.body.password,
                    avatar: req.file ? req.file.filename : null,
                    organization: req.body.organization,
               }});

        return res.send(user);

    }catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        return next(e);
    }
});

export default usersRouter;