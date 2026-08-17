import {
    Chip, Table, TableBody, TableCell, TableHead, TableRow,
} from "@mui/material";
import {useTranslation} from "react-i18next";
import type {AuditLog} from "../../types/auditLog/AuditLog.ts";
import {tableStyles} from "../../shared/tableStyles";
import {formatDateTime} from "../../shared/dateFormatter.ts";
import {auditActionMap} from "../../shared/auditAction.ts";

type Props = {
    auditLogs: AuditLog[];
};

function AuditLogTable({auditLogs}: Props) {

    const {t} = useTranslation();

    return (
        <Table>
            <TableHead sx={tableStyles.tableHead}>
                <TableRow>
                    <TableCell sx={tableStyles.headerCell}>
                        {t("auditLogs.date")}
                    </TableCell>

                    <TableCell sx={tableStyles.headerCell}>
                        {t("auditLogs.user")}
                    </TableCell>

                    <TableCell sx={tableStyles.headerCell}>
                        {t("auditLogs.action")}
                    </TableCell>

                    <TableCell sx={tableStyles.headerCell}>
                        {t("auditLogs.details")}
                    </TableCell>
                </TableRow>
            </TableHead>

            <TableBody>

                {auditLogs.length === 0 ? (

                    <TableRow>
                        <TableCell
                            colSpan={4}
                            align="center"
                            sx={tableStyles.emptyRow}>
                            {t("auditLogs.noData")}
                        </TableCell>
                    </TableRow>

                ) : (

                    auditLogs.map((log) => (

                        <TableRow key={log.id}>

                            <TableCell>{formatDateTime(log.createdAt)}</TableCell>
                            <TableCell>{log.userEmail}</TableCell>
                            <TableCell>

                                <Chip
                                    label={auditActionMap[log.action]?.label ?? log.action}
                                    color={auditActionMap[log.action]?.color ?? "default"}
                                    size="small"
                                />

                            </TableCell>
                            <TableCell>{log.details}</TableCell>

                        </TableRow>
                    ))
                )}

            </TableBody>
        </Table>
    );
}

export default AuditLogTable;