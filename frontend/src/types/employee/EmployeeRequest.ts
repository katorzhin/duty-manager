import type {EmployeeStatus} from "./EmployeeStatus.ts";

export interface EmployeeRequest {
    name: string;
    email: string;
    status: EmployeeStatus;
}