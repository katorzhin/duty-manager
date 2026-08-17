import type {DutyRequest} from "../types/duty/DutyRequest.ts";
import type {DutyPage} from "../types/duty/DutyPage.ts";
import api from "../api/axios.ts";
import type {GenerateDutyRequest} from "../types/duty/GenerateDutyRequest.ts";

const DUTIES_URL = "/duties";

export const getDuties = async (
    page: number,
    size: number,
    dateFrom?: string,
    dateTo?: string,
    employeeIds?: number[]
): Promise<DutyPage> => {

    let url =
        `${DUTIES_URL}?page=${page}&size=${size}`;

    if (dateFrom) {
        url += `&from=${dateFrom}`;
    }

    if (dateTo) {
        url += `&to=${dateTo}`;
    }

    if (employeeIds?.length) {
        url += `&employeeIds=${employeeIds.join(",")}`;
    }

    const response =
        await api.get<DutyPage>(url);

    return response.data;
};

export const deleteDuty = async (id: number): Promise<void> => {
    await api.delete(
        `${DUTIES_URL}/${id}`
    );
};

export const createDuty = async (
    request: DutyRequest) => {

    const response = await api.post(
        DUTIES_URL,
        request
    );

    return response.data;
};

export const updateDuty = (
    id: number, request: DutyRequest) =>
    api.put(`${DUTIES_URL}/${id}`, request);

export const generateDuties = async (
    request: GenerateDutyRequest
): Promise<void> => {
    await api.post(`${DUTIES_URL}/generate`, request);
};