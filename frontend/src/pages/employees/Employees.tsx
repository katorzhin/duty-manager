import {
    Box, Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography,
} from "@mui/material";
import {useTranslation} from "react-i18next";

import {useEmployees} from "./useEmployees.ts";
import {useState} from "react";
import EmployeeDialog from "../../dialogs/employeeDialog/EmployeeDialog.tsx";
import {tableStyles} from "../../shared/tableStyles";
import type {Employee} from "../../types/employee/Employee.ts";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import type {EmployeeRequest} from "../../types/employee/EmployeeRequest.ts";
import ConfirmDialog from "../../dialogs/confirmDialog/ConfirmDialog.tsx";
import {notifyError, notifySuccess} from "../../shared/toast.ts";
import {usePermissions} from "../../permissions/usePermissions.ts";
import EmployeeStatusChip from "../../shared/employeeStatus.tsx";

function Employees() {

    const {
        employees, handleCreate, handleUpdate, handleDelete
    } = useEmployees();

    const permission = usePermissions();
    const {t} = useTranslation();

    const [open, setOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);

    const handleOpenCreateDialog = () => {
        setSelectedEmployee(null);
        setOpen(true);
    };

    const handleOpenEditDialog = (
        employee: Employee
    ) => {
        setSelectedEmployee(employee);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setSelectedEmployee(null);
    };

    const handleSubmitEmployee = async (
        request: EmployeeRequest
    ) => {

        if (selectedEmployee) {
            await handleUpdate(selectedEmployee.id, request);
            notifySuccess(t("employees.updated"));
            return;
        }

        await handleCreate(request);

        notifySuccess(t("employees.created"));
    };

    const handleConfirmDelete = async () => {

        if (!employeeToDelete) {
            return;
        }

        try {

            await handleDelete(employeeToDelete.id);
            notifySuccess(t("employees.deleted"));

        } catch (error: any) {

            notifyError(
                error.response?.data?.message ??
                t("employees.deleteFailed"));

        } finally {

            setEmployeeToDelete(null);
        }
    };

    return (
        <Container>
            <Box sx={tableStyles.pageHeader}>
                <Typography variant="h4">{t("employees.title")}</Typography>

                {permission.createEmployee && (
                    <Button
                        variant="contained"
                        onClick={handleOpenCreateDialog}>
                        {t("employees.add")}
                    </Button>
                )}
            </Box>

            <Table>
                <TableHead sx={tableStyles.tableHead}>
                    <TableRow>
                        <TableCell sx={tableStyles.headerCell}>{t("employees.name")}</TableCell>
                        <TableCell sx={tableStyles.headerCell}>{t("employees.email")}</TableCell>
                        <TableCell sx={tableStyles.headerCell}>{t("employees.status")}</TableCell>

                        {(permission.editEmployee ||
                            permission.deleteEmployee) && (
                            <TableCell sx={tableStyles.headerCell}>{t("common.actions")}</TableCell>
                        )}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {employees.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={3}
                                align="center">
                                {t("employees.noData")}
                            </TableCell>
                        </TableRow>
                    ) : (
                        employees.map(employee => (

                            <TableRow key={employee.id}>
                                <TableCell>{employee.name}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>
                                    <EmployeeStatusChip status={employee.status} />
                                </TableCell>

                                <TableCell>
                                    {permission.editEmployee && (
                                        <IconButton
                                            onClick={() =>
                                                handleOpenEditDialog(employee)
                                            }>
                                            <EditIcon/>
                                        </IconButton>
                                    )}
                                    {permission.deleteEmployee && (
                                        <IconButton
                                            onClick={() =>
                                                setEmployeeToDelete(employee)
                                            }>
                                            <DeleteIcon/>
                                        </IconButton>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            <EmployeeDialog
                open={open}
                onClose={handleCloseDialog}
                onSave={handleSubmitEmployee}
                employee={selectedEmployee}
            />

            <ConfirmDialog
                confirmText={t("common.delete")}
                confirmColor="error"
                open={!!employeeToDelete}
                title={t("employees.deleteTitle")}
                message={t("employees.deleteMessage", {
                    name: employeeToDelete?.name,
                })}
                onClose={() => setEmployeeToDelete(null)}
                onConfirm={handleConfirmDelete}
            />

        </Container>
    );
}

export default Employees;