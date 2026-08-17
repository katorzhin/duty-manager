import {useEffect, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import type {Employee} from "../../types/employee/Employee.ts";
import {getEmployee} from "../../services/employeeApi.ts";
import {generateDuties} from "../../services/dutyApi.ts";
import {notifyError, notifySuccess} from "../../shared/toast.ts";

export const useGenerateDutyDialog = (
    onClose: () => void,
    onGenerated: () => Promise<void>,
) => {

    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
    const [period, setPeriod] = useState("1");
    const [customDays, setCustomDays] = useState(1);
    const [employeesPerDuty, setEmployeesPerDuty] = useState(1);
    const [rotationConfigured, setRotationConfigured] = useState(false);
    const [rotationDialogOpen, setRotationDialogOpen] = useState(false);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [employeeIds, setEmployeeIds] = useState<number[]>([]);

    useEffect(() => {

        if (!rotationDialogOpen) {
            return;
        }

        const loadEmployees = async () => {

            const data = await getEmployee();

            setEmployees(data.filter(employee => employee.status === "ACTIVE"));
        };

        void loadEmployees();

    }, [rotationDialogOpen]);

    const handleConfigureRotation = () => {
        setRotationDialogOpen(true);
    };

    const handleRotationConfigured = (
        orderedEmployeeIds: number[]
    ) => {

        setEmployeeIds(orderedEmployeeIds);
        setRotationConfigured(true);
        setRotationDialogOpen(false);
    };

    const handleCloseRotationDialog = () => {
        setRotationDialogOpen(false);
    };

    const handleGenerate = async () => {
        if (!startDate) {
            return;
        }

        try {

            await generateDuties({
                startDate: startDate.format("YYYY-MM-DD"),
                days,
                employeesPerDuty,
                employeeIds,
            });
            await onGenerated();
            notifySuccess("Duties generated successfully");
            handleClose();

        } catch {
            notifyError("Failed to generate duties");

        }
    };

    const resetForm = () => {

        setStartDate(dayjs());
        setPeriod("7");
        setCustomDays(7);
        setEmployeesPerDuty(2);

        setEmployeeIds([]);

        setRotationConfigured(false);
        setRotationDialogOpen(false);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const days =
        period === "custom"
            ? customDays
            : Number(period);

    return {
        startDate,
        setStartDate,

        period,
        setPeriod,

        customDays,
        setCustomDays,

        employeesPerDuty,
        setEmployeesPerDuty,

        days,
        employees,
        employeeIds,

        rotationConfigured,

        rotationDialogOpen,

        handleConfigureRotation,
        handleRotationConfigured,
        handleCloseRotationDialog,

        handleClose,
        handleGenerate
    };
};