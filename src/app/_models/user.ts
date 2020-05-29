import { Role } from "./role";

export class User {
    id: number;
    email: string;
    password: string;
    phone: number;
    firstName: string;
    lastName: string;
    role: Role;
    empresa: string = null;
    token?: string;
}