import axios from "axios";
import {notifyError} from "../shared/toast.ts";

const api = axios.create({
    baseURL: "/api"
});

api.interceptors.request.use(config => {

    const token = localStorage.getItem("token");

    if (token) {

        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    response => response,

    error => {

        if (error.response?.status === 401) {

            localStorage.removeItem("token");
            localStorage.removeItem("email");

            notifyError("Session expired. Please login again.");

            setTimeout(() => {window.location.href = "/login"}, 1500);
        }

        return Promise.reject(error);
    }
);

export default api;