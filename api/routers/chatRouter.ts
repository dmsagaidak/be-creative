import express from 'express';
import {ActiveConnections, IncomingMessage, IUser} from "../types";
import * as crypto from 'crypto';
import {now} from "mongoose";
import Message from "../models/Message";
import User from "../models/User";
import {WebSocket} from "ws";

const chatRouter = () => {
    const router = express.Router();

    const activeConnections: ActiveConnections = {};

    const sendLastMessages = async (ws: WebSocket) => {
        const lastMessages = await Message.find().limit(30);
        lastMessages.forEach((message) => {
            ws.send(
                JSON.stringify({
                    type: 'NEW_MESSAGE',
                    payload: {
                        username: message.username,
                        text: message.text,
                    },
                })
            );
        });
    };

    router.ws('/',  (ws, req) => {
        const id = crypto.randomUUID();
        console.log('client connected id=', id);
        activeConnections[id] = ws;
        sendLastMessages(ws);
        let user: IUser | null = null;


        ws.on('message', async (message) => {
            const decodedMessage = JSON.parse(message.toString()) as IncomingMessage;
            switch (decodedMessage.type) {
                case 'LOGIN':
                    user = await User.findOne({token: decodedMessage.payload});
                    break;
                case 'SEND_MESSAGE':
                    Object.keys(activeConnections).forEach(id => {
                        const conn = activeConnections[id];
                        conn.send(JSON.stringify({
                            type: 'NEW_MESSAGE',
                            payload: {
                                username: user?.displayName || 'Anonymous',
                                text: decodedMessage.payload,
                                datetime: now().toISOString(),
                            },
                        }));
                    });
                    await Message.create({
                        username: user?.displayName || 'Anonymous',
                        text: decodedMessage.payload,
                        datetime: now().toISOString(),
                    })
                    break;
                default:
                    console.log('Unknown type:', decodedMessage.type);
            }
        });

        ws.on('close', () => {
            console.log('client disconnected id=', id);
            delete activeConnections[id];
        });
    });

    return router;
};

export default chatRouter;