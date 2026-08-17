import type {AuditLog} from "./AuditLog.ts";

export interface AuditLogPage {
    content: AuditLog[];
    totalElements: number;
    totalPages: number;
    number: number;
}