import {useState} from "react";
import {useTranslation} from "react-i18next";
import {
    Box, Button, Container, TablePagination, Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import {tableStyles} from "../../shared/tableStyles";

import AuditLogTable from "./AuditLogTable";
import AuditLogFilters from "./AuditLogFilters";
import {useAuditLogs} from "./useAuditLogs";

function AuditLogs() {

    const {
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
    } = useAuditLogs();
    const {t} = useTranslation();

    const [showFilters, setShowFilters] = useState(false);

    return (
        <Container>

            <Box sx={tableStyles.pageHeader}>

                <Typography variant="h4">{t("auditLogs.title")}</Typography>

                <Button
                    variant="outlined"
                    color={showFilters ? "primary" : "inherit"}
                    startIcon={<FilterListIcon/>}
                    onClick={() => setShowFilters(!showFilters)}>
                    {t("common.filters")}
                </Button>

            </Box>

            {showFilters && (
                <AuditLogFilters
                    dateFrom={dateFrom}
                    dateTo={dateTo}
                    setDateFrom={setDateFrom}
                    setDateTo={setDateTo}
                    actions={actions}
                    selectedAction={selectedAction}
                    setSelectedAction={setSelectedAction}
                />
            )}

            <AuditLogTable
                auditLogs={auditLogs}
            />

            <TablePagination
                labelRowsPerPage={t("common.rowsPerPage")}
                component="div"
                count={totalElements}
                page={page}
                onPageChange={(_, newPage) =>
                    setPage(newPage)
                }
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(event) => {

                    setRowsPerPage(
                        Number(event.target.value)
                    );

                    setPage(0);
                }}
                rowsPerPageOptions={[5, 10, 20]}
            />

        </Container>
    );
}

export default AuditLogs;