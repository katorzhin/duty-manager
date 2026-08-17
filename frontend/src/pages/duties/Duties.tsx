import {useState} from "react";
import {useTranslation} from "react-i18next";
import {
    Container, Typography, Button, TablePagination, Box,
} from "@mui/material";

import FilterListIcon from "@mui/icons-material/FilterList";
import {tableStyles} from "../../shared/tableStyles";

import {useDuties} from "./useDuties.ts";
import DutyDialog from "../../dialogs/dutyDialog/DutyDialog.tsx";
import type {Duty} from "../../types/duty/Duty.ts";
import type {DutyRequest} from "../../types/duty/DutyRequest.ts";
import {notifyError, notifySuccess} from "../../shared/toast.ts";
import ConfirmDialog from "../../dialogs/confirmDialog/ConfirmDialog.tsx";
import {styles} from "./styles.ts";
import DutyFilters from "./DutyFilters.tsx";
import DutyTable from "./DutyTable.tsx";
import {usePermissions} from "../../permissions/usePermissions.ts";
import GenerateDutyDialog from "../../dialogs/generateDutyDialog/GenerateDutyDialog.tsx";

function Duties() {
    const {
        duties, handleDelete, handleCreate, page, loadDuties,
        setPage, rowsPerPage, setRowsPerPage, totalElements,
        handleUpdate, dateFrom, setDateFrom, dateTo,
        setDateTo, employees, selectedEmployees, setSelectedEmployees,
    } = useDuties();

    const permission = usePermissions();
    const {t} = useTranslation();

    const [open, setOpen] = useState(false);
    const [selectedDuty, setSelectedDuty] = useState<Duty | null>(null);
    const [dutyToDelete, setDutyToDelete] = useState<Duty | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [generateDialogOpen, setGenerateDialogOpen] = useState(false);

    const handleOpenCreateDialog = () => {
        setSelectedDuty(null);
        setOpen(true);
    };

    const handleOpenEditDialog = (duty: Duty) => {
        setSelectedDuty(duty);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setSelectedDuty(null);
    };

    const handleOpenGenerateDialog = () => {
        setGenerateDialogOpen(true);
    };

    const handleCloseGenerateDialog = () => {
        setGenerateDialogOpen(false);
    };

    const handleSubmitDuty = async (
        request: DutyRequest
    ) => {

        try {
            if (selectedDuty) {

                await handleUpdate(selectedDuty.id, request);
                notifySuccess(t("duties.updated"));
                return;
            }

            await handleCreate(request);

            notifySuccess(t("duties.created"));

        } catch {
            notifyError(t("duties.createFailed"));
        }
    };

    const handleConfirmDelete = async () => {

        if (!dutyToDelete) {
            return;
        }

        try {
            await handleDelete(dutyToDelete.id);
            notifySuccess(t("duties.deleted"));

        } catch {
            notifyError(t("duties.deleteFailed"));

        } finally {
            setDutyToDelete(null);
        }
    };

    return (
        <Container>
            <Box sx={tableStyles.pageHeader}>
                <Typography variant="h4">
                    {t("duties.title")}
                </Typography>
                <Box sx={styles.actions}>

                    <Button
                        variant="outlined"
                        color={showFilters ? "primary" : "inherit"}
                        startIcon={<FilterListIcon/>}
                        onClick={() => setShowFilters(!showFilters)}>
                        {t("common.filters")}
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleOpenGenerateDialog}>
                        {t("duties.generate")}
                    </Button>

                    {permission.createDuty && (
                        <Button
                            variant="contained"
                            onClick={handleOpenCreateDialog}>
                            {t("duties.add")}
                        </Button>
                    )}
                </Box>
            </Box>


            {showFilters && (
                <DutyFilters
                    dateFrom={dateFrom}
                    dateTo={dateTo}
                    setDateFrom={setDateFrom}
                    setDateTo={setDateTo}
                    employees={employees}
                    selectedEmployees={selectedEmployees}
                    setSelectedEmployees={setSelectedEmployees}
                />
            )}

            <DutyTable
                duties={duties}
                onEdit={handleOpenEditDialog}
                onDelete={setDutyToDelete}
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
            <DutyDialog
                open={open}
                onClose={handleCloseDialog}
                onSave={handleSubmitDuty}
                duty={selectedDuty}
            />
            <GenerateDutyDialog
                open={generateDialogOpen}
                onClose={handleCloseGenerateDialog}
                onGenerated={loadDuties}
            />
            <ConfirmDialog
                confirmText={t("common.delete")}
                confirmColor="error"
                open={!!dutyToDelete}
                title={t("duties.deleteTitle")}
                message={t("duties.deleteMessage", {
                    date: dutyToDelete?.dutyDate,
                })}
                onClose={() => setDutyToDelete(null)}
                onConfirm={handleConfirmDelete}
            />
        </Container>
    );
}

export default Duties;