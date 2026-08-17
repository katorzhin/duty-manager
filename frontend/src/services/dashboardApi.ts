import api from "../api/axios";
const DASHBOARD_URL = "/duties";

export const getTodayDuties = async () => {

    const response =
        await api.get(`${DASHBOARD_URL}/today`);

    return response.data;
};

export const getNext3Duties = async () => {

    const response =
        await api.get(`${DASHBOARD_URL}/next3`);

    return response.data;
};

export const getSubscribersCount = async () => {

    const response =
        await api.get("/subscribers/count");

    return response.data;
};