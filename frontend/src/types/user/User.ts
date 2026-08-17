import type {UserRole} from "../../permissions/permissions.ts";

export type User = {
    id: number;
    email: string;
    role: UserRole;
    systemAdmin: boolean;
};