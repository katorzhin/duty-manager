import api from "../api/axios.ts";

export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    token: string;
    role: string;
};

export async function login(
    request: LoginRequest
): Promise<LoginResponse> {

    const response = await api.post<LoginResponse>(
        "/auth/login", request);

    return response.data;
}