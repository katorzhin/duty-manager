import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import {useTranslation} from "react-i18next";

import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import type {Duty} from "../../types/duty/Duty.ts";
import {tableStyles} from "../../shared/tableStyles";
import {usePermissions} from "../../permissions/usePermissions.ts";

type Props = {
    duties: Duty[];
    onEdit: (duty: Duty) => void;
    onDelete: (duty: Duty) => void;
};

function DutyTable({duties, onEdit, onDelete}: Props) {
    const permission = usePermissions();
    const {t} = useTranslation();

    return (
        <Table>
            <TableHead sx={tableStyles.tableHead}>
                <TableRow>
                    <TableCell sx={tableStyles.headerCell}>{t("common.date")}</TableCell>
                    <TableCell sx={tableStyles.headerCell}>{t("duties.employees")}</TableCell>
                    {(permission.editEmployee ||
                        permission.deleteEmployee) && (
                        <TableCell sx={tableStyles.headerCell}>{t("common.actions")}</TableCell>)}
                </TableRow>
            </TableHead>

            <TableBody>
                {duties.length === 0 ? (
                    <TableRow>
                        <TableCell
                            colSpan={3}
                            align="center"
                            sx={tableStyles.emptyRow}>
                            {t("duties.noData")}
                        </TableCell>
                    </TableRow>
                ) : (
                    duties.map((duty) => (
                        <TableRow key={duty.id}>
                            <TableCell>{duty.dutyDate}</TableCell>
                            <TableCell>{duty.employees.join(", ")}</TableCell>
                            <TableCell>
                                {permission.editDuty && (
                                    <IconButton onClick={() => onEdit(duty)}>
                                        <EditIcon/>
                                    </IconButton>
                                )}
                                {permission.deleteDuty && (
                                    <IconButton onClick={() => onDelete(duty)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                )}
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}

export default DutyTable;