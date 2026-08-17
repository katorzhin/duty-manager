import type {EmployeeStatus} from "./EmployeeStatus.ts";

export interface Employee {
    id: number;
    name: string;
    email: string;
    status: EmployeeStatus;
}