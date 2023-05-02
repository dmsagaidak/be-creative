import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import expressWs from 'express-ws';
import config from "./config";
import usersRouter from "./routers/users";
import projectsRouter from "./routers/projects";
import tasksRouter from "./routers/tasks";
import chatRouter from "./routers/chatRouter";

const app = express();
expressWs(app);
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/tasks', tasksRouter);
app.use('/chat', chatRouter());

const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`The server runs on ${port} port`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(console.error);