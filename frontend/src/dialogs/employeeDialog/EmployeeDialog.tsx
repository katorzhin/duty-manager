import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stack,
    TextField, FormControl, InputLabel, Select, MenuItem,
} from "@mui/material";

import {useTranslation} from "react-i18next";
import {useEmployeeDialog} from "./useEmployeeDialog.ts";
import type {Employee} from "../../types/employee/Employee.ts";
import type {EmployeeRequest} from "../../types/employee/EmployeeRequest.ts";
import {useEffect} from "react";
import type {EmployeeStatus} from "../../types/employee/EmployeeStatus.ts";

type EmployeeDialogProps = {
    open: boolean;
    onClose: () => void;
    onSave: (request: EmployeeRequest) => Promise<void>;
    employee?: Employee | null;
};

function EmployeeDialog({open, onClose, onSave, employee}: EmployeeDialogProps) {

    const {
        name, setName, email, setEmail, status, setStatus,
        handleSave, handleClose, nameError, emailError,
    } = useEmployeeDialog(onSave, onClose);

    const {t} = useTranslation();

    useEffect(() => {

        if (employee) {
            setName(employee.name);
            setEmail(employee.email);
            setStatus(employee.status);
            return;
        }

        setName("");
        setEmail("");

    }, [employee]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                {employee
                    ? t("employeeDialog.editTitle")
                    : t("employeeDialog.addTitle")}
            </DialogTitle>

            <DialogContent>

                <Stack
                    spacing={2}
                    sx={{mt: 1}}
                >
                    <TextField
                        label={t("employees.name")}
                        value={name}
                        error={!!nameError}
                        helperText={nameError}
                        onChange={(e) =>
                            setName(e.target.value)

                        }
                        fullWidth
                    />

                    <TextField
                        label={t("employees.email")}
                        value={email}
                        error={!!emailError}
                        helperText={emailError}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        fullWidth
                    />
                    {employee && (
                        <FormControl fullWidth>
                            <InputLabel>{t("employees.status")}</InputLabel>

                            <Select
                                value={status}
                                label={t("employees.status")}
                                onChange={(e) =>
                                    setStatus(e.target.value as EmployeeStatus)
                                }
                            >
                                <MenuItem value="ACTIVE">{t("employeeDialog.active")}</MenuItem>
                                <MenuItem value="INACTIVE"> {t("employeeDialog.inactive")}</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                </Stack>

            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>
                    {t("common.cancel")}
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSave}>
                    {t("common.save")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EmployeeDialog;