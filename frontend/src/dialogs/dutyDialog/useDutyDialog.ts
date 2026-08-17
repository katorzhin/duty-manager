import {useEffect, useState} from "react";

import {getEmployee} from "../../services/employeeApi.ts";

import type {Employee} from "../../types/employee/Employee.ts";
import type {DutyRequest} from "../../types/duty/DutyRequest.ts";

export const useDutyDialog = (
    onSave: (request: DutyRequest) => Promise<void>,
    onClose: () => void,
) => {

    const [employees, setEmployees] = useState<Employee[]>([]);

    const [dutyDate, setDutyDate] = useState("");
    const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {

        try {
            const data = await getEmployee();
            setEmployees(data);

        } catch (error) {
            console.error(error);
        }
    };

    const handleSave = async () => {

        if (!dutyDate) {
            alert("Select duty date");
            return;
        }

        if (selectedEmployees.length === 0) {
            alert("Select at least one employee");
            return;
        }

        await onSave({dutyDate, employeeIds: selectedEmployees});
        handleClose();
    };

    const resetDutyForm = () => {
        setDutyDate("");
        setSelectedEmployees([]);

    };

    const handleClose = () => {
        resetDutyForm();
        onClose();
    };

    return {
        employees,
        dutyDate,
        setDutyDate,
        selectedEmployees,
        setSelectedEmployees,
        handleSave,
        handleClose
    };
};