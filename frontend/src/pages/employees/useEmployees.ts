import {useEffect, useState} from "react";

import {createEmployee, updateEmployee, deleteEmployee, getEmployee} from "../../services/employeeApi.ts";

import type {Employee} from "../../types/employee/Employee.ts";
import type {EmployeeRequest} from "../../types/employee/EmployeeRequest.ts";

export const useEmployees = () => {

    const [employees, setEmployees] = useState<Employee[]>([]);

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

    const handleCreate = async (
        request: EmployeeRequest
    ) => {

        try {
            await createEmployee(request);
            await loadEmployees();

        } catch (error) {

            console.error(error);
        }
    };

    const handleDelete = async (
        id: number
    ) => {

        try {

            await deleteEmployee(id);

            await loadEmployees();

        } catch (error) {

            throw error;
        }
    };

    const handleUpdate = async (
        id: number,
        request: EmployeeRequest
    ) => {

        await updateEmployee(
            id,
            request
        );

        await loadEmployees();
    };

    return {
        employees,
        handleCreate,
        handleUpdate,
        handleDelete
    };
};