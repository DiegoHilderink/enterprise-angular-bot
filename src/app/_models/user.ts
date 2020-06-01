import { Role } from "./role";

export class User {
    id: number;
    email: string;
    password: string;
    phone: number;
    dimFiscal: string = null;
    cif: string = null;
    firstName: string;
    lastName: string;
    role: Role;
    empresa: string = null;
    token?: string;
}