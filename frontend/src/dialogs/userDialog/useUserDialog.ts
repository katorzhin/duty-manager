import {useState} from "react";

import type {UserRequest} from "../../types/user/UserRequest.ts";
import type {User} from "../../types/user/User.ts";
import type {UserUpdateRequest} from "../../types/user/UserUpdateRequest.ts";
import type {UserRole} from "../../permissions/permissions.ts";

export const useUserDialog = (
    onSave: (request: UserRequest | UserUpdateRequest) => Promise<void>,
    onClose: () => void,
    user?: User | null,
) => {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [role, setRole] = useState<UserRole>("USER");

    const handleSave = async () => {

        if (!email.trim()) {
            alert("Enter email");
            return;
        }

        if (user) {
            await onSave({email, role});

            handleClose();
            return;
        }

        if (!password.trim()) {
            alert("Enter password");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        await onSave({
            email,
            password,
            role,
        });

        handleClose();
    };

    const resetForm = () => {

        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setRole("USER");
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    return {
        email,
        setEmail,

        password,
        setPassword,

        confirmPassword,
        setConfirmPassword,

        role,
        setRole,

        handleSave,
        handleClose,
    };
};