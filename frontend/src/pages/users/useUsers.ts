import {useEffect, useState} from "react";

import type {User} from "../../types/user/User.ts";
import type {UserRequest} from "../../types/user/UserRequest.ts";
import {createUser, deleteUser, getUsers, resetUserPassword, updateUser} from "../../services/userApi";
import type {UserUpdateRequest} from "../../types/user/UserUpdateRequest.ts";
import type {ResetPasswordRequest} from "../../types/ResetPasswordRequest.ts";

export const useUsers = () => {

    const [users, setUsers] = useState<User[]>([]);

    const loadUsers = async () => {

        try {
            const data = await getUsers();
            setUsers(data);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleCreate = async (
        request: UserRequest
    ) => {

        await createUser(request);
        await loadUsers();
    };

    const handleUpdate = async (
        id: number,
        request: UserUpdateRequest
    ) => {
        await updateUser(id, request);
        await loadUsers();
    };

    const handleDelete = async (
        id: number
    ) => {
        await deleteUser(id);
        await loadUsers();
    };

    const handleResetPassword = async (
        id: number,
        request: ResetPasswordRequest
    ) => {
        await resetUserPassword(id, request);
    };


    return {
        users,
        handleCreate,
        handleUpdate,
        handleDelete,
        handleResetPassword,
    };
};