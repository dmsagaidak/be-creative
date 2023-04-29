interface Participant {
  _id: string;
  role: string;
  user: string;
}

export interface ParticipantMutation {
  role: string;
  user: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  leader: User;
  status: string;
  start: string;
  deadline: string;
  image: string;
  participants: Participant[];
}

export interface ProjectMutation {
  title: string;
  description: string;
  start: string;
  deadline: string;
  image: File | null;
  participants: ParticipantMutation[]
}

export interface Task {
  _id: string;
  project: Project;
  title: string;
  description: string;
  status: string;
  user: User;
  link: string;
  deadline: string;
}

export interface TaskMutation {
  project: string;
  title: string;
  description: string;
  status: string;
  user: string;
  link: string;
  deadline: string;
}

export interface RegisterMutation {
    email: string;
    displayName: string;
    password: string;
    avatar: File | null;
    organization: string;
}

export interface User {
    _id: string;
    email: string;
    displayName: string;
    role: string;
    organization: string;
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