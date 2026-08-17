import {
    Button, Box, Container, Table, TableBody,
    TableCell, TableHead, TableRow, Typography,
} from "@mui/material";

import {useTranslation} from "react-i18next";
import {useUsers} from "./useUsers";
import {styles} from "./styles";
import UserDialog from "../../dialogs/userDialog/UserDialog";
import {notifySuccess, notifyError} from "../../shared/toast";
import type {UserRequest} from "../../types/user/UserRequest.ts";
import {useState} from "react";
import type {UserUpdateRequest} from "../../types/user/UserUpdateRequest.ts";
import type {User} from "../../types/user/User.ts";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyIcon from "@mui/icons-material/Key";
import ConfirmDialog from "../../dialogs/confirmDialog/ConfirmDialog.tsx";
import type {ResetPasswordRequest} from "../../types/ResetPasswordRequest.ts";
import ResetPasswordDialog from "../../dialogs/resetPasswordDialog/ResetPasswordDialog.tsx";

function Users() {

    const {users, handleCreate, handleUpdate, handleDelete, handleResetPassword} = useUsers();
    const {t} = useTranslation();

    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const [userToResetPassword, setUserToResetPassword] = useState<User | null>(null);
    const [resetPasswordOpen, setResetPasswordOpen] = useState(false);

    const handleCloseDialog = () => {
        setOpen(false);
        setSelectedUser(null);
    };

    const handleOpenCreateDialog = () => {
        setSelectedUser(null);
        setOpen(true);
    };

    const handleOpenEditDialog = (user: User) => {
        setSelectedUser(user);
        setOpen(true);
    };

    const handleSubmitUser = async (
        request: UserRequest | UserUpdateRequest
    ) => {

        try {

            if (selectedUser) {
                await handleUpdate(selectedUser.id, request as UserUpdateRequest);
                notifySuccess(t("users.updated"));
                handleCloseDialog();
            } else {
                await handleCreate(request as UserRequest);
                notifySuccess(t("users.created"));
                handleCloseDialog();
            }

        } catch (error: any) {
            notifyError(error.response?.data?.message ??
                t("users.saveFailed"));
        }
    };

    const handleConfirmDelete = async () => {

        if (!userToDelete) {
            return;
        }

        try {
            await handleDelete(userToDelete.id);
            notifySuccess(t("users.deleted"));

        } catch (error: any) {
            notifyError(error.response?.data?.message ??
                t("users.deleteFailed"));

        } finally {
            setUserToDelete(null);
        }
    };

    const handleSubmitResetPassword = async (
        request: ResetPasswordRequest) => {

        if (!userToResetPassword) {
            return;
        }

        try {

            await handleResetPassword(userToResetPassword.id, request);

            notifySuccess(t("users.passwordReset"));

            setResetPasswordOpen(false);
            setUserToResetPassword(null);

        } catch (error: any) {

            notifyError(error.response?.data?.message ??
                t("users.passwordResetFailed"));
        }
    };

    return (
        <Container
            maxWidth="md"
            sx={styles.container}>
            <Box sx={styles.card}>

                <Typography
                    variant="h3"
                    sx={styles.title}>
                    {t("users.title")}
                </Typography>

                <Typography
                    variant="body1"
                    sx={styles.subtitle}>
                    {t("users.subtitle")}
                </Typography>

                <Box sx={styles.header}>
                    <Button
                        variant="contained"
                        onClick={handleOpenCreateDialog}>
                        {t("users.add")}
                    </Button>

                </Box>
                <Table>
                    <TableHead>
                        <TableRow>

                            <TableCell>{t("users.email")}</TableCell>
                            <TableCell>{t("users.role")}</TableCell>
                            <TableCell align="right">{t("common.actions")}</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>

                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell align="right">

                                    {!user.systemAdmin && (
                                        <>
                                            <IconButton
                                                onClick={() => handleOpenEditDialog(user)}>
                                                <EditIcon/>
                                            </IconButton>

                                            <IconButton
                                                onClick={() => setUserToDelete(user)}>
                                                <DeleteIcon/>
                                            </IconButton>

                                            <IconButton
                                                onClick={() => {
                                                    setUserToResetPassword(user);
                                                    setResetPasswordOpen(true);
                                                }}>
                                                <KeyIcon/>
                                            </IconButton>
                                        </>
                                    )}

                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
                <UserDialog
                    open={open}
                    onClose={handleCloseDialog}
                    onSave={handleSubmitUser}
                    user={selectedUser}
                />
                <ConfirmDialog
                    open={!!userToDelete}
                    title={t("users.deleteTitle")}
                    message={t("users.deleteMessage", {
                        email: userToDelete?.email,
                    })}
                    confirmText={t("common.delete")}
                    confirmColor="error"
                    onClose={() => setUserToDelete(null)}
                    onConfirm={handleConfirmDelete}
                />
                <ResetPasswordDialog
                    open={resetPasswordOpen}
                    onClose={() => {
                        setResetPasswordOpen(false);
                        setUserToResetPassword(null);
                    }}
                    onSave={handleSubmitResetPassword}
                />
            </Box>
        </Container>
    );
}

export default Users;