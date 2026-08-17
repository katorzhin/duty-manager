import api from "../api/axios";
import type {AuditLogPage} from "../types/auditLog/AuditLogPage.ts";

const AUDIT_LOGS_URL = "/audit-logs";

export const getAuditLogs = async (
    page: number,
    size: number,
    dateFrom?: string,
    dateTo?: string,
    action?: string
): Promise<AuditLogPage> => {

    let url = `${AUDIT_LOGS_URL}?page=${page}&size=${size}`;

    if (dateFrom) {
        url += `&from=${dateFrom}`;
    }

    if (dateTo) {
        url += `&to=${dateTo}`;
    }

    if (action) {
        url += `&action=${action}`;
    }

    const response = await api.get<AuditLogPage>(url);

    return response.data;
};

export const getAuditActions = async (): Promise<string[]> => {

    const response = await api.get<string[]>(
        `${AUDIT_LOGS_URL}/actions`
    );

    return response.data;
};