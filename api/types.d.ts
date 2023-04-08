export interface IUser {
    email: string;
    password: string;
    token: string;
    displayName: string;
    role: string;
    googleId?: string;
    avatar: string | null;
}