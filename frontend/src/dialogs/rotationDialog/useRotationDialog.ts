import {useEffect, useState} from "react";
import {arrayMove} from "@dnd-kit/sortable";
import {type DragEndEvent} from "@dnd-kit/core";

import type {Employee} from "../../types/employee/Employee.ts";

type UseRotationDialogProps = {
    employees: Employee[];
    selectedEmployeeIds: number[];
    onSave: (employeeIds: number[]) => void;
};

export const useRotationDialog = ({
                                      employees,
                                      selectedEmployeeIds,
                                      onSave,
                                      // onClose,
                                  }: UseRotationDialogProps) => {

    const [items, setItems] = useState<Employee[]>([]);

    useEffect(() => {

        if (selectedEmployeeIds.length > 0) {

            const orderedEmployees = selectedEmployeeIds
                .map(id => employees.find(employee => employee.id === id))
                .filter((employee): employee is Employee => employee !== undefined);

            setItems(orderedEmployees);

            return;
        }

        setItems(employees);

    }, [employees, selectedEmployeeIds]);

    const handleDragEnd = (event: DragEndEvent) => {

        const {active, over} = event;

        if (!over || active.id === over.id) {
            return;
        }

        const oldIndex = items.findIndex(
            employee => employee.id === active.id
        );

        const newIndex = items.findIndex(
            employee => employee.id === over.id
        );

        setItems(arrayMove(items, oldIndex, newIndex));
    };

    const handleSave = () => {
        onSave(items.map(employee => employee.id));
    };

    return {
        items,
        handleDragEnd,
        handleSave,
        // handleClose: onClose,
    };
};