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