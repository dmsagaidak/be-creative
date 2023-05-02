import express from 'express';
import { ActiveConnections, IncomingMessage } from "../types";
import * as crypto from 'crypto';

const chatRouter = () => {
    const router = express.Router();

    const activeConnections: ActiveConnections = {};

    router.ws('/', (ws, req) => {
        const id = crypto.randomUUID();
        console.log('client connected id=', id);
        activeConnections[id] = ws;
        let username = 'Anonymous';

        ws.on('message', (message) => {
            const decodedMessage = JSON.parse(message.toString()) as IncomingMessage;
            switch (decodedMessage.type) {
                case 'SET_USERNAME':
                    username = decodedMessage.payload;
                    break;
                case 'SEND_MESSAGE':
                    Object.keys(activeConnections).forEach(id => {
                        const conn = activeConnections[id];
                        conn.send(JSON.stringify({
                            type: 'NEW_MESSAGE',
                            payload: {
                                username,
                                text: decodedMessage.payload,
                            },
                        }));
                    });
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