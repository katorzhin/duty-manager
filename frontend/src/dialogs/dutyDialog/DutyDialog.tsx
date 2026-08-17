import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Select, MenuItem, TextField, Stack, FormControl, InputLabel,
} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useDutyDialog} from "./useDutyDialog.ts";
import type {DutyRequest} from "../../types/duty/DutyRequest.ts";
import type {Duty} from "../../types/duty/Duty.ts";
import {useEffect} from "react";

type DutyDialogProps = {
    open: boolean;
    onClose: () => void;
    onSave: (request: DutyRequest) => Promise<void>;
    duty?: Duty | null;
};

function DutyDialog({open, onClose, onSave, duty}: DutyDialogProps) {
    const {
        employees, dutyDate, setDutyDate,
        handleSave, handleClose, selectedEmployees,
        setSelectedEmployees
    } = useDutyDialog(onSave, onClose);

    const {t} = useTranslation();

    useEffect(() => {

        if (!duty) {
            return;
        }

        setDutyDate(duty.dutyDate);
        setSelectedEmployees(duty.employeeIds);
    }, [duty]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                {duty
                    ? t("dutyDialog.editTitle")
                    : t("dutyDialog.addTitle")}
            </DialogTitle>
            <DialogContent>

                <Stack spacing={2} sx={{mt: 1}}>
                    <TextField
                        type="date"
                        value={dutyDate}
                        onChange={(e) =>
                            setDutyDate(e.target.value)
                        }
                        fullWidth
                    />
                    <FormControl fullWidth>
                        <InputLabel> {t("dutyDialog.employees")}</InputLabel>

                        <Select
                            multiple
                            value={selectedEmployees}
                            label={t("dutyDialog.employees")}
                            renderValue={(selected) =>
                                employees
                                    .filter(employee =>
                                        (selected as number[]).includes(employee.id))
                                    .map(employee => employee.name)
                                    .join(", ")
                            }
                            onChange={(e) =>
                                setSelectedEmployees(
                                    e.target.value as number[]
                                )
                            }
                        >
                            {employees.map(employee => (
                                <MenuItem
                                    key={employee.id}
                                    value={employee.id}
                                >
                                    {employee.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>

            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>{t("common.cancel")}</Button>
                <Button variant="contained" onClick={handleSave}>{t("common.save")}</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DutyDialog;