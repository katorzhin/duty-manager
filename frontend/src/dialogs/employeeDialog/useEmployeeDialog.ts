import {useState} from "react";

import type {EmployeeRequest} from "../../types/employee/EmployeeRequest.ts";

export const useEmployeeDialog = (
    onSave: (request: EmployeeRequest) => Promise<void>,
    onClose: () => void,
) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">("ACTIVE");

    const handleSave = async () => {

        let valid = true;

        setNameError("");
        setEmailError("");

        if (!name.trim()) {
            setNameError("Name is required");
            valid = false;
        }

        if (!email.trim()) {
            setEmailError("Email is required");
            valid = false;
        }

        if (email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError("Invalid email");
            valid = false;
        }

        if (!valid) {
            return;
        }

        await onSave({
            name,
            email,
            status
        });

        handleClose();
    };

    const resetForm = () => {
        setName("");
        setEmail("");

        setNameError("");
        setEmailError("");
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    return {
        name,
        setName,

        email,
        setEmail,

        nameError,
        emailError,

        handleSave,
        handleClose,

        status,
        setStatus,
    };
};