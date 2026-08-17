export const ROLES = [
    "USER",
    "ADMIN",
] as const;

export type UserRole = typeof ROLES[number];

export const permissions: Record<UserRole, {
    createEmployee: boolean;
    editEmployee: boolean;
    deleteEmployee: boolean;

    createDuty: boolean;
    editDuty: boolean;
    deleteDuty: boolean;

    uploadSchedule: boolean;
    viewAuditLogs: boolean;
    sendNotifications: boolean;
    manageUsers: boolean;
}> = {

    USER: {
        createEmployee: false,
        editEmployee: false,
        deleteEmployee: false,

        createDuty: true,
        editDuty: false,
        deleteDuty: false,

        uploadSchedule: false,
        viewAuditLogs: false,
        sendNotifications: false,
        manageUsers: false,
    },

    ADMIN: {
        createEmployee: true,
        editEmployee: true,
        deleteEmployee: true,

        createDuty: true,
        editDuty: true,
        deleteDuty: true,

        uploadSchedule: true,
        viewAuditLogs: true,
        sendNotifications: true,
        manageUsers: true,

    },
};