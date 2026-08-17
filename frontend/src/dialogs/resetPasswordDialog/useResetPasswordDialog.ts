import {useState} from "react";

import type {ResetPasswordRequest} from "../../types/ResetPasswordRequest";

export const useResetPasswordDialog = (
    onSave: (request: ResetPasswordRequest) => Promise<void>,
    onClose: () => void,
) => {

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSave = async () => {

        if (!password.trim()) {
            alert("Enter password");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        await onSave({
            password,
            confirmPassword,
        });

        handleClose();
    };

    const resetForm = () => {

        setPassword("");
        setConfirmPassword("");
    };

    const handleClose = () => {

        resetForm();
        onClose();
    };

    return {
        password,
        setPassword,

        confirmPassword,
        setConfirmPassword,

        handleSave,
        handleClose,
    };
};