import {
    Button, Dialog, DialogActions, DialogContent,
    DialogTitle, Stack, TextField,
} from "@mui/material";

import {useResetPasswordDialog} from "./useResetPasswordDialog";

import type {ResetPasswordRequest} from "../../types/ResetPasswordRequest";
import {useTranslation} from "react-i18next";

type ResetPasswordDialogProps = {
    open: boolean;
    onClose: () => void;
    onSave: (request: ResetPasswordRequest) => Promise<void>;
};

function ResetPasswordDialog({open, onClose, onSave}: ResetPasswordDialogProps) {

    const {
        password, setPassword, confirmPassword,
        setConfirmPassword, handleSave, handleClose,
    } = useResetPasswordDialog(onSave, onClose);

    const {t} = useTranslation();

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm">
            <DialogTitle> {t("resetPassword.title")}</DialogTitle>

            <DialogContent>

                <Stack
                    spacing={2}
                    sx={{mt: 1}}
                >

                    <TextField
                        label={t("resetPassword.newPassword")}
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        fullWidth/>

                    <TextField
                        label={t("resetPassword.confirmPassword")}
                        type="password"
                        value={confirmPassword}
                        onChange={(event) =>
                            setConfirmPassword(event.target.value)
                        }
                        fullWidth/>

                </Stack>
            </DialogContent>
            <DialogActions>

                <Button onClick={handleClose}>{t("common.cancel")}</Button>

                <Button
                    variant="contained"
                    onClick={handleSave}>
                    {t("resetPassword.reset")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ResetPasswordDialog;