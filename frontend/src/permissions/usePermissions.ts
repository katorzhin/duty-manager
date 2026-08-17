import {permissions} from "./permissions.ts";

export function usePermissions() {

    const role =
        localStorage.getItem("role") ?? "USER";

    return permissions[
        role as keyof typeof permissions
        ];
}