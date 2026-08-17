import {useEffect, useState} from "react";

import type {AuditLog} from "../../types/auditLog/AuditLog.ts";
import {getAuditLogs, getAuditActions} from "../../services/auditLogApi.ts";
import type {Dayjs} from "dayjs";

export const useAuditLogs = () => {

    const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [dateFrom, setDateFrom] = useState<Dayjs | null>(null);
    const [dateTo, setDateTo] = useState<Dayjs | null>(null);
    const [actions, setActions] = useState<string[]>([]);
    const [selectedAction, setSelectedAction] = useState("");

    useEffect(() => {
        loadAuditLogs();
    }, [
        page, rowsPerPage, dateFrom, dateTo, selectedAction,
    ]);

    useEffect(() => {
        loadActions();
    }, []);

    const loadAuditLogs = async () => {

        try {

            const data = await getAuditLogs(
                page,
                rowsPerPage,
                dateFrom?.format("YYYY-MM-DD"),
                dateTo?.format("YYYY-MM-DD"),
                selectedAction || undefined
            );

            setAuditLogs(data.content);
            setTotalElements(data.totalElements);

        } catch (error) {
            console.error(error);
        }
    };

    const loadActions = async () => {
        try {
            const data = await getAuditActions();
            setActions(data);

        } catch (error) {
            console.error(error);
        }
    };

    return {
        auditLogs,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        totalElements,
        dateFrom,
        setDateFrom,
        dateTo,
        setDateTo,
        actions,
        selectedAction,
        setSelectedAction,
    };
};