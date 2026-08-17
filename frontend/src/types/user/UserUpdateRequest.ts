import type {UserRole} from "../../permissions/permissions.ts";

export type UserUpdateRequest = {
    email: string;
    role: UserRole;
};