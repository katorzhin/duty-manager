import {useState} from "react";

import type {ChangePasswordRequest} from "../../types/ChangePasswordRequest";

export const useChangePasswordDialog = (
    onSave: (request: ChangePasswordRequest) => Promise<void>,
    onClose: () => void,
) => {

    const [oldPassword, setOldPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSave = async () => {

        if (!oldPassword.trim()) {
            alert("Enter old password");
            return;
        }

        if (!newPassword.trim()) {
            alert("Enter new password");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        await onSave({
            oldPassword,
            newPassword,
            confirmPassword,
        });

        handleClose();
    };

    const resetForm = () => {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    return {
        oldPassword,
        setOldPassword,

        newPassword,
        setNewPassword,

        confirmPassword,
        setConfirmPassword,

        handleSave,
        handleClose,
    };
};