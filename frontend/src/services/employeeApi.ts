import type {Employee} from "../types/employee/Employee.ts";
import type {EmployeeRequest} from "../types/employee/EmployeeRequest.ts";
import api from "../api/axios.ts";

const EMPLOYEES_URL = "/employees";

export const getEmployee = async (): Promise<Employee[]> => {

    const response = await api.get<Employee[]>(
        EMPLOYEES_URL
    );

    return response.data;
};

export const createEmployee = async (
    request: EmployeeRequest
): Promise<Employee> => {

    const response = await api.post<Employee>(
        EMPLOYEES_URL,
        request
    );

    return response.data;
};

export const updateEmployee = (
    id: number,
    request: EmployeeRequest
) =>
    api.put(
        `${EMPLOYEES_URL}/${id}`,
        request
    );

export const deleteEmployee = (
    id: number
) =>
    api.delete(
        `${EMPLOYEES_URL}/${id}`
    );