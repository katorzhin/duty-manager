export interface GenerateDutyRequest {
    startDate: string;
    days: number;
    employeesPerDuty: number;
    employeeIds: number[];
}