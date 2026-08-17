import {
    IconButton, Select, MenuItem, Stack, FormControl, InputLabel, Chip
} from "@mui/material";
import {useTranslation} from "react-i18next";
import {DatePicker} from "@mui/x-date-pickers";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import type {Dayjs} from "dayjs";
import {styles} from "./styles";
import {auditActionMap} from "../../shared/auditAction.ts";
import SelectClearAdornment from "../../components/SelectClearAdornment.tsx";

type Props = {
    dateFrom: Dayjs | null;
    dateTo: Dayjs | null;

    setDateFrom: (value: Dayjs | null) => void;
    setDateTo: (value: Dayjs | null) => void;

    actions: string[];
    selectedAction: string;
    setSelectedAction: (value: string) => void;
};

function AuditLogFilters({
                             dateFrom, dateTo, setDateFrom, setDateTo,
                             actions, selectedAction, setSelectedAction,
                         }: Props) {

    const {t} = useTranslation();

    return (
        <Stack
            direction="row"
            spacing={2}
            sx={styles.filters}>

            <DatePicker
                label={t("auditLogs.from")}
                format="DD/MM/YYYY"
                value={dateFrom}
                onChange={setDateFrom}
                slotProps={{
                    textField: {
                        size: "small",
                    },
                    field: {
                        clearable: true,
                    },
                }}
            />

            <DatePicker
                label={t("auditLogs.to")}
                format="DD/MM/YYYY"
                value={dateTo}
                onChange={setDateTo}
                slotProps={{
                    textField: {
                        size: "small",
                    },
                    field: {
                        clearable: true,
                    },
                }}
            />
            <FormControl
                size="small"
                sx={{minWidth: 220}}>
                <InputLabel>{t("auditLogs.action")}</InputLabel>

                <Select
                    value={selectedAction}
                    label={t("auditLogs.action")}
                    onChange={(event) =>
                        setSelectedAction(
                            event.target.value
                        )
                    }
                    endAdornment={
                        <SelectClearAdornment
                            visible={!!selectedAction}
                            onClear={() => setSelectedAction("")}
                        />
                    }
                >
                    <MenuItem value="">{t("auditLogs.all")}</MenuItem>

                    {actions.map(action => (
                        <MenuItem
                            key={action}
                            value={action}>
                            <Chip
                                label={auditActionMap[action]?.label ?? action}
                                color={auditActionMap[action]?.color ?? "default"}
                                size="small"
                            />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <IconButton
                onClick={() => {
                    setDateFrom(null);
                    setDateTo(null);
                    setSelectedAction("");
                }}
            >
                <RestartAltIcon/>
            </IconButton>

        </Stack>
    );
}

export default AuditLogFilters;