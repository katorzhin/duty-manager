import {
    closestCenter, DndContext,
} from "@dnd-kit/core";
import {
    SortableContext, verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
    Button, List, Dialog, DialogActions, DialogContent, DialogTitle,
} from "@mui/material";
import {useTranslation} from "react-i18next";

import type {Employee} from "../../types/employee/Employee.ts";
import SortableEmployeeItem from "./SortableEmployeeItem.tsx";
import {useRotationDialog} from "./useRotationDialog.ts";

type RotationDialogProps = {
    open: boolean;
    employees: Employee[];
    selectedEmployeeIds: number[];
    onClose: () => void;
    onSave: (employeeIds: number[]) => void;
};

function RotationDialog({
                            open, employees, selectedEmployeeIds,
                            onClose, onSave,
                        }: RotationDialogProps) {

    const {
        items, handleDragEnd, handleSave,
    } = useRotationDialog({
        employees, selectedEmployeeIds, onSave,
    });

    const {t} = useTranslation();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>{t("rotationDialog.title")}</DialogTitle>

            <DialogContent>

                <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}>

                    <SortableContext
                        items={items.map(employee => employee.id)}
                        strategy={verticalListSortingStrategy}>

                        <List>

                            {items.map(employee => (

                                <SortableEmployeeItem
                                    key={employee.id}
                                    employee={employee}
                                />

                            ))}

                        </List>
                    </SortableContext>
                </DndContext>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{t("common.cancel")}</Button>
                <Button
                    variant="contained"
                    onClick={handleSave}>
                    {t("common.save")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default RotationDialog;