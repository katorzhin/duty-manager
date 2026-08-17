export type AuditLog = {
    id: number;
    createdAt: string;
    userEmail: string;
    action: string;
    details: string;
};
