import {WebSocket} from 'ws';

export interface ActiveConnections {
    [id: string]: WebSocket
}

export interface IncomingMessage {
    type: string;
    payload: string;
}

export interface IUser {
    email: string;
    password: string;
    token: string;
    displayName: string;
    role: string;
    organization: string;
    googleId?: string;
    avatar: string | null;
}