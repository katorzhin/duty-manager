import {useEffect, useState} from "react";

import {createDuty, deleteDuty, getDuties, updateDuty} from "../../services/dutyApi";

import type {Duty} from "../../types/duty/Duty.ts";
import type {DutyRequest} from "../../types/duty/DutyRequest.ts";
import type {Dayjs} from "dayjs";
import type {Employee} from "../../types/employee/Employee.ts";
import {getEmployee} from "../../services/employeeApi.ts";

export const useDuties = () => {

    const [duties, setDuties] = useState<Duty[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [dateFrom, setDateFrom] = useState<Dayjs | null>(null);
    const [dateTo, setDateTo] = useState<Dayjs | null>(null);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);

    useEffect(() => {
        loadDuties();
    }, [
        page,
        rowsPerPage,
        dateFrom,
        dateTo,
        selectedEmployees
    ]);

    useEffect(() => {
        loadEmployees();
    }, []);
    const loadDuties = async () => {

        try {

            const data = await getDuties(
                page,
                rowsPerPage,
                dateFrom?.format("YYYY-MM-DD"),
                dateTo?.format("YYYY-MM-DD"),
                selectedEmployees
            );

            setDuties(data.content);
            setTotalElements(data.totalElements);

        } catch (error) {
            console.error(error);
        }
    };

    const loadEmployees = async () => {
        try {
            const data = await getEmployee();
            setEmployees(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteDuty(id);
            await loadDuties();

        } catch (error) {
            throw error;
        }
    };

    const handleCreate = async (request: DutyRequest) => {
        try {
            await createDuty(request);
            await loadDuties();
        } catch (error) {
            throw error;
        }
    };

    const handleUpdate = async (id: number, request: DutyRequest) => {
        try {
            await updateDuty(id, request);
            await loadDuties();

        } catch (error) {
            throw error;
        }
    };

    return {
        duties,
        loadDuties,
        handleCreate,
        handleUpdate,
        handleDelete,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        totalElements,
        dateFrom,
        setDateFrom,
        dateTo,
        setDateTo,
        employees,
        selectedEmployees,
        setSelectedEmployees,
    };
};