import crypto from 'crypto';
import mongoose from 'mongoose';
import config from './config';
import User from "./models/User";
import Project from "./models/Project";

const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.db);
    const db = mongoose.connection;
    
    try{
        await db.dropCollection('users');
        await db.dropCollection('projects');
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
            {role: 'Analyst', user: ann.displayName},
            {role: 'Developer', user: jack.displayName},
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
            {role: 'Designer', user: joe.displayName},
            {role: 'Developer', user: jack.displayName},
        ]
    })
    await db.close();
};

void run();