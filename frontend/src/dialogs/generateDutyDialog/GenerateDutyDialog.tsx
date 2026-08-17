import {
    Button, MenuItem, Select, DialogContent, DialogTitle, FormControl, FormControlLabel,
    InputLabel, Dialog, Radio, RadioGroup, DialogActions, Stack, TextField,
} from "@mui/material";

import {useGenerateDutyDialog} from "./useGenerateDutyDialog.ts";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import RotationDialog from "../rotationDialog/RotationDialog.tsx";
import {useTranslation} from "react-i18next";

type GenerateDutyDialogProps = {
    open: boolean;
    onClose: () => void;
    onGenerated: () => Promise<void>;
};

function GenerateDutyDialog({
                                open, onClose, onGenerated
                            }: GenerateDutyDialogProps) {

    const {
        startDate, setStartDate, period, setPeriod, customDays, setCustomDays, employeesPerDuty, setEmployeesPerDuty,
        rotationConfigured, rotationDialogOpen, handleConfigureRotation, handleRotationConfigured, handleCloseRotationDialog,
        handleGenerate, employees, employeeIds,
    } = useGenerateDutyDialog(onClose,onGenerated);

    const {t} = useTranslation();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm">
            <DialogTitle>{t("generateDuty.title")}</DialogTitle>
            <DialogContent>
                <Stack spacing={3} sx={{mt: 1}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label={t("generateDuty.startDate")}
                            value={startDate}
                            format="DD/MM/YYYY"
                            onChange={(value) => setStartDate(value)}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                },
                            }}
                        />
                    </LocalizationProvider>

                    <FormControl>

                        <RadioGroup
                            value={period}
                            onChange={(e) =>
                                setPeriod(e.target.value)}>

                            <FormControlLabel
                                value="7"
                                control={<Radio/>}
                                label={t("generateDuty.days7")}
                            />

                            <FormControlLabel
                                value="14"
                                control={<Radio/>}
                                label={t("generateDuty.days14")}
                            />

                            <FormControlLabel
                                value="30"
                                control={<Radio/>}
                                label={t("generateDuty.days30")}
                            />

                            <FormControlLabel
                                value="custom"
                                control={<Radio/>}
                                label={t("generateDuty.custom")}
                            />

                        </RadioGroup>
                    </FormControl>

                    {period === "custom" && (

                        <TextField
                            label={t("generateDuty.numberOfDays")}
                            type="number"
                            value={customDays}
                            onChange={(e) =>
                                setCustomDays(Number(e.target.value))
                            }
                            fullWidth/>
                    )}

                    <FormControl fullWidth>
                        <InputLabel> {t("generateDuty.employeesPerDuty")}</InputLabel>

                        <Select
                            value={employeesPerDuty}
                            label={t("generateDuty.employeesPerDuty")}
                            onChange={(e) =>
                                setEmployeesPerDuty(Number(e.target.value))
                            }>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                        </Select>

                    </FormControl>

                    <Button
                        variant="outlined"
                        onClick={handleConfigureRotation}>
                        {rotationConfigured
                            ? t("generateDuty.editRotation")
                            : t("generateDuty.configureRotation")}
                    </Button>

                </Stack>

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}> {t("common.cancel")}</Button>

                <Button
                    variant="contained"
                    disabled={!rotationConfigured}
                    onClick={handleGenerate}>
                    {t("generateDuty.generate")}
                </Button>

            </DialogActions>
            <RotationDialog
                open={rotationDialogOpen}
                employees={employees}
                selectedEmployeeIds={employeeIds}
                onClose={handleCloseRotationDialog}
                onSave={handleRotationConfigured}
            />
        </Dialog>
    );
}

export default GenerateDutyDialog;