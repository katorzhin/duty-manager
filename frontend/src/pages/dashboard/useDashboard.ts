import {useEffect, useState} from "react";

import {getEmployee} from "../../services/employeeApi.ts";
import {getDuties} from "../../services/dutyApi";
import {
    getTodayDuties,
    getNext3Duties, getSubscribersCount
} from "../../services/dashboardApi";
import type {Duty} from "../../types/duty/Duty.ts";

export const useDashboard = () => {

    const [employeesCount, setEmployeesCount] = useState(0);
    const [dutiesCount, setDutiesCount] = useState(0);

    const [todayDuties, setTodayDuties] = useState<Duty[]>([]);
    const [next3Duties, setNext3Duties] = useState<Duty[]>([]);

    const [subscribersCount, setSubscribersCount] = useState(0);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        const [
            employees,
            duties,
            today,
            next3,
            subscribers
        ] = await Promise.all([
            getEmployee(),
            getDuties(0, 1),
            getTodayDuties(),
            getNext3Duties(),
            getSubscribersCount()
        ]);

        setEmployeesCount(employees.length);
        setDutiesCount(duties.totalElements);

        setTodayDuties(today);
        setNext3Duties(next3);

        setSubscribersCount(subscribers);
    };

    return {
        employeesCount: employeesCount,
        dutiesCount,
        todayDuties,
        next5Duties: next3Duties,
        subscribersCount
    };
};