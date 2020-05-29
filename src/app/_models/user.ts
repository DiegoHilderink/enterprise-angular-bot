import { Role } from "./role";

export class User {
    id: number;
    username: string;
    password: string;
    phone: number;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    empresa: string = null;
    token?: string;
}