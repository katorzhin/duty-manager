import {
    Select, MenuItem, IconButton, Stack,
    FormControl, InputLabel, Checkbox, ListItemText,
} from "@mui/material";
import {useTranslation} from "react-i18next";
import {DatePicker} from "@mui/x-date-pickers";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import type {Dayjs} from "dayjs";
import type {Employee} from "../../types/employee/Employee.ts";
import {styles} from "./styles";
import SelectClearAdornment from "../../components/SelectClearAdornment.tsx";

type Props = {
    dateFrom: Dayjs | null;
    dateTo: Dayjs | null;
    setDateFrom: (value: Dayjs | null) => void;
    setDateTo: (value: Dayjs | null) => void;

    employees: Employee[];
    selectedEmployees: number[];
    setSelectedEmployees: (value: number[]) => void;
};

function DutyFilters({
                         dateFrom, dateTo, setDateFrom, setDateTo,
                         employees, selectedEmployees, setSelectedEmployees,
                     }: Props) {

    const {t} = useTranslation();

    return (
        <Stack
            direction="row"
            spacing={2}
            sx={styles.filters}>
            <DatePicker
                label={t("common.from")}
                format="DD/MM/YYYY"
                value={dateFrom}
                onChange={setDateFrom}
                slotProps={{
                    textField: {
                        size: "small"
                    },
                    field: {
                        clearable: true,
                    },
                }}
            />

            <DatePicker
                label={t("common.to")}
                format="DD/MM/YYYY"
                value={dateTo}
                onChange={setDateTo}
                slotProps={{
                    textField: {
                        size: "small"
                    },
                    field: {
                        clearable: true,
                    },
                }}
            />
            <FormControl
                size="small"
                sx={styles.employeeFilter}>
                <InputLabel>{t("duties.employees")}
                </InputLabel>

                <Select
                    multiple
                    value={selectedEmployees}
                    label={t("duties.employees")}
                    onChange={(event) =>
                        setSelectedEmployees(
                            event.target.value as number[]
                        )
                    }

                    endAdornment={
                        <SelectClearAdornment
                            visible={selectedEmployees.length > 0}
                            onClear={() => setSelectedEmployees([])}
                        />
                    }

                    renderValue={(selected) => {
                        const names = employees
                            .filter(employee => selected.includes(employee.id))
                            .map(employee => employee.name);

                        return names.length <= 2
                            ? names.join(", ")
                            : `${names.slice(0, 2).join(", ")} +${names.length - 2}`;
                    }}
                >
                    {employees.map(employee => (
                        <MenuItem
                            key={employee.id}
                            value={employee.id}>
                            <Checkbox
                                checked={
                                    selectedEmployees.includes(employee.id)
                                }
                            />

                            <ListItemText
                                primary={employee.name}
                            />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <IconButton
                onClick={() => {
                    setDateFrom(null);
                    setDateTo(null);
                    setSelectedEmployees([]);
                }}
            >
                <RestartAltIcon/>
            </IconButton>

        </Stack>
    );
}

export default DutyFilters;