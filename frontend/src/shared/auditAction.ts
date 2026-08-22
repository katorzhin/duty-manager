import type {ChipProps} from "@mui/material";

export const auditActionMap: Record<string, {
    label: string;
    color: ChipProps["color"];
}
> = {
    DUTY_CREATED: {
        label: "Duty Created",
        color: "success",
    },

    DUTY_UPDATED: {
        label: "Duty Updated",
        color: "info",
    },

    DUTY_DELETED: {
        label: "Duty Deleted",
        color: "error",
    },

    EMPLOYEE_CREATED: {
        label: "Employee Created",
        color: "success",
    },

    EMPLOYEE_UPDATED: {
        label: "Employee Updated",
        color: "info",
    },

    EMPLOYEE_DELETED: {
        label: "Employee Deleted",
        color: "error",
    },

    SCHEDULE_UPLOADED: {
        label: "Schedule Uploaded",
        color: "info",
    },

    NOTIFICATION_SENT: {
        label: "Notification Sent",
        color: "secondary",
    },

    LOGIN: {
        label: "Login",
        color: "default",
    },
    USER_CREATED: {
        label: "User Created",
        color: "success",
    },
    USER_UPDATED: {
        label: "User Updated",
        color: "info",
    },
    USER_DELETED: {
        label: "User Deleted",
        color: "error",
    },
    PASSWORD_CHANGED: {
        label: "Password Changed",
        color: "info",
    },
    PASSWORD_RESET: {
        label: "Password Reset",
        color: "info",
    },
    SCHEDULE_UPLOAD_FAILED: {
        label: "Schedule Upload Failed",
        color: "warning",
    },
    DUTIES_GENERATED: {
        label: "Duties Generated",
        color: "success",
    },
};

