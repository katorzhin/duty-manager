import type {UserRole} from "../../permissions/permissions.ts";

export type UserRequest = {
    email: string;
    password: string;
    role: UserRole;
};