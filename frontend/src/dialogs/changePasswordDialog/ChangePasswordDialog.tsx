import {
    Button, Dialog, DialogActions, DialogContent,
    DialogTitle, Stack, TextField,
} from "@mui/material";

import {useChangePasswordDialog} from "./useChangePasswordDialog";
import {useTranslation} from "react-i18next";

import type {ChangePasswordRequest} from "../../types/ChangePasswordRequest";

type ChangePasswordDialogProps = {
    open: boolean;
    onClose: () => void;
    onSave: (request: ChangePasswordRequest) => Promise<void>;
};

function ChangePasswordDialog({
                                  open,
                                  onClose,
                                  onSave,
                              }: ChangePasswordDialogProps) {

    const {
        oldPassword,
        setOldPassword,

        newPassword,
        setNewPassword,

        confirmPassword,
        setConfirmPassword,

        handleSave,
        handleClose,
    } = useChangePasswordDialog(onSave, onClose);

    const {t} = useTranslation();

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm">

            <DialogTitle>{t("changePassword.title")}</DialogTitle>

            <DialogContent>
                <Stack
                    spacing={2}
                    sx={{mt: 1}}>

                    <TextField
                        label={t("changePassword.oldPassword")}
                        type="password"
                        value={oldPassword}
                        onChange={(event) =>
                            setOldPassword(event.target.value)
                        }
                        fullWidth
                    />

                    <TextField
                        label={t("changePassword.newPassword")}
                        type="password"
                        value={newPassword}
                        onChange={(event) =>
                            setNewPassword(event.target.value)
                        }
                        fullWidth
                    />

                    <TextField
                        label={t("changePassword.confirmPassword")}
                        type="password"
                        value={confirmPassword}
                        onChange={(event) =>
                            setConfirmPassword(event.target.value)
                        }
                        fullWidth
                    />

                </Stack>

            </DialogContent>

            <DialogActions>

                <Button onClick={handleClose}>
                    {t("common.cancel")}
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSave}>
                    {t("changePassword.change")}
                </Button>

            </DialogActions>

        </Dialog>
    );
}

export default ChangePasswordDialog;