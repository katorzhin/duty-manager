import {
    Button, MenuItem, Select, Dialog, DialogActions, DialogContent,
    DialogTitle, FormControl, InputLabel, Stack, TextField,
} from "@mui/material";

import {useUserDialog} from "./useUserDialog";
import type {UserRequest} from "../../types/user/UserRequest.ts";
import type {UserUpdateRequest} from "../../types/user/UserUpdateRequest.ts";
import type {User} from "../../types/user/User.ts";
import {useEffect} from "react";
import type {UserRole} from "../../permissions/permissions.ts";
import {useTranslation} from "react-i18next";

type UserDialogProps = {
    open: boolean;
    onClose: () => void;
    onSave: (request: UserRequest | UserUpdateRequest) => Promise<void>;
    user: User | null;
};

function UserDialog({open, onClose, onSave, user}: UserDialogProps) {

    const {
        email, setEmail, password, setPassword, confirmPassword,
        setConfirmPassword, role, setRole, handleSave, handleClose,
    } = useUserDialog(onSave, onClose, user);

    const {t} = useTranslation();

    useEffect(() => {

        if (user) {
            setEmail(user.email);
            setRole(user.role);
            return;
        }

        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setRole("USER");

    }, [user]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm">
            <DialogTitle>
                {user
                    ? t("userDialog.editTitle")
                    : t("userDialog.addTitle")}
            </DialogTitle>

            <DialogContent>
                <Stack
                    spacing={2}
                    sx={{mt: 1}}>

                    <TextField
                        label={t("userDialog.email")}
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)}
                        fullWidth/>
                    {!user && (
                        <>
                            <TextField
                                label={t("userDialog.password")}
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)}
                                fullWidth/>

                            <TextField
                                label={t("userDialog.confirmPassword")}
                                type="password"
                                value={confirmPassword}
                                onChange={(event) =>
                                    setConfirmPassword(event.target.value)}
                                fullWidth/>
                        </>
                    )}
                    <FormControl fullWidth>
                        <InputLabel>{t("userDialog.role")}</InputLabel>

                        <Select
                            value={role}
                            label={t("userDialog.role")}
                            onChange={(event) =>
                                setRole(event.target.value as UserRole)}>
                            <MenuItem value="ADMIN">ADMIN</MenuItem>
                            <MenuItem value="USER">USER</MenuItem>

                        </Select>
                    </FormControl>
                </Stack>
            </DialogContent>

            <DialogActions>

                <Button onClick={handleClose}>{t("common.cancel")}</Button>

                <Button
                    variant="contained"
                    onClick={handleSave}>
                    {user
                        ? t("common.save")
                        : t("userDialog.create")}
                </Button>

            </DialogActions>
        </Dialog>
    );
}

export default UserDialog;