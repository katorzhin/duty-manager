import type { Duty } from "./Duty.ts";

export interface DutyPage {
    content: Duty[];
    totalElements: number;
    totalPages: number;
    number: number;
}