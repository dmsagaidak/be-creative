export interface Project {
  _id: string;
  title: string;
  description: string;
  leader: User;
  status: string;
  start: string;
  deadline: string;
}

export interface ProjectMutation {
  title: string;
  description: string;
  start: string;
  deadline: string;
}

export interface RegisterMutation {
    email: string;
    displayName: string;
    password: string;
    image: File | null;
}

export interface User {
    _id: string;
    email: string;
    displayName: string;
    role: string;
    avatar: string | null;
    token: string;
    googleId: null | string;
}

export interface RegisterResponse {
    message: string;
    user: User;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        };
    };
    message: string;
    name: string;
    _message: string;
}

export interface LoginMutation {
    email: string;
    password: string;
}

export interface GlobalError {
    error: string;
}