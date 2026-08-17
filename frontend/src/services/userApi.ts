import api from "../api/axios";
import type {User} from "../types/user/User.ts";
import type {UserRequest} from "../types/user/UserRequest.ts";
import type {UserUpdateRequest} from "../types/user/UserUpdateRequest.ts";
import type {ResetPasswordRequest} from "../types/ResetPasswordRequest.ts";

const USERS_URL = "/users";
const PASSWORD_RESET_URL = (id: number) => `/password/reset/${id}`;

export const getUsers = async (): Promise<User[]> => {

    const response = await api.get<User[]>(USERS_URL);

    return response.data;
};

export const createUser = async (
    request: UserRequest
): Promise<User> => {

    const response = await api.post<User>(USERS_URL, request);

    return response.data;
};

export const updateUser = async (
    id: number,
    request: UserUpdateRequest
): Promise<User> => {

    const response = await api.put<User>(`${USERS_URL}/${id}`, request);

    return response.data;
};

export const deleteUser = async (
    id: number
): Promise<void> => {
    await api.delete(`${USERS_URL}/${id}`);
};

export const resetUserPassword = async (
    id: number,
    request: ResetPasswordRequest
): Promise<void> => {
    await api.patch(PASSWORD_RESET_URL(id), request);
};