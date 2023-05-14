import crypto from 'crypto';
import mongoose from 'mongoose';
import config from './config';
import User from "./models/User";
import Project from "./models/Project";
import Task from "./models/Task";
import Event from "./models/Event"

const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.db);
    const db = mongoose.connection;
    
    try{
        await db.dropCollection('users');
        await db.dropCollection('projects');
        await db.dropCollection('tasks');
        await db.dropCollection('events');
    }catch (e) {
        console.log('Collections were not present, skipping drop...');
    }

    const [joe, jack, mary, ann, alex] = await User.create({
        email: 'joe@mail',
        password: '111',
        token: crypto.randomUUID(),
        displayName: 'Joe Black',
        role: 'user',
        organization: 'ABC company',
        avatar: 'fixtures/joe.jpg'
    }, {
        email: 'jack@mail',
        password: '222',
        token: crypto.randomUUID(),
        displayName: 'Jack Travis',
        role: 'user',
        organization: 'ABC company',
        avatar: 'fixtures/jack.jpg',
    }, {
        email: 'mary@gmail.com',
        password: '333',
        token: crypto.randomUUID(),
        displayName: 'Mary Jane',
        role: 'user',
        organization: 'ABC company',
        avatar: 'fixtures/mary.jpg',
    }, {
        email: 'ann@mail',
        password: '444',
        token: crypto.randomUUID(),
        displayName: 'Ann White',
        role: 'user',
        organization: 'ABC company',
        avatar: 'fixtures/ann.jpg',
    }, {
        email: 'alex@mail',
        password: '555',
        token: crypto.randomUUID(),
        displayName: 'Alex Dias',
        role: 'admin',
        organization: 'Alex & partners',
        avatar: 'fixtures/alex.jpg',
    });

    const [proj1, proj2] = await Project.create({
        title: 'Test project',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim, neque vel dignissim tempus, purus ex ornare mauris, non maximus quam quam eu arcu. Vestibulum ultricies sapien urna, ut sagittis est maximus quis. Class aptent taciti sociosqu ad litora torquent.',
        leader: joe,
        status: 'Ongoing',
        start: '2023-03-22T18:00:00.000Z',
        deadline: '2023-06-23T06:00:00.000Z',
        image: 'fixtures/proj1.jpg',
        participants: [
            {role: 'Analyst', user: ann},
            {role: 'Developer', user: jack},
        ]
    }, {
        title: 'Website development',
        description: 'Duis molestie consequat sodales. Donec ornare porta sem, eu euismod diam commodo placerat. In pulvinar nec sapien vel rutrum. Fusce porttitor ante eu metus vulputate.',
        leader: mary,
        status: 'Not started',
        start: '2023-05-12T18:00:00.000Z',
        deadline: '2023-06-23T06:00:00.000Z',
        image: 'fixtures/proj2.jpg',
        participants: [
            {role: 'Designer', user: joe},
            {role: 'Developer', user: jack},
        ]
    });

    await Task.create({
        project: proj1,
        createdBy: joe,
        title: 'Test title1',
        description: 'Cras eros ex, gravida eget gravida eu, tempus in dolor. Aenean bibendum vel tortor dignissim.',
        status: 'In progress',
        user: jack,
        link: 'https://bit.ly/3GNVEXT',
        deadline: '2023-04-22T06:00:00.000Z'
    }, {
        project: proj1,
        createdBy: joe,
        title: 'Test title2',
        description: 'Design something great',
        status: 'To do',
        user: ann,
        link: null,
        deadline: '2023-04-22T06:00:00.000Z'
    }, {
        project: proj2,
        createdBy: mary,
        title: 'Test test 1',
        description: 'Test descr',
        status: 'To do',
        link: null,
        deadline: '2023-06-23T06:00:00.000Z',
    });

    await Event.create({
        title: 'Event1',
        start: '2023-05-19',
        end: '2023-05-23'
    }, {
        title: 'Event2',
        start: '2023-05-10',
        end: '2023-05-11'
    })

    await db.close();
};

void run();