import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography,
} from "@mui/material";
import type { ButtonProps } from "@mui/material/Button";


type ConfirmDialogProps = {
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onClose: () => void;

    confirmText: string;
    cancelText?: string;
    confirmColor: ButtonProps["color"];
};

function ConfirmDialog({
                           open, title, message,
                           onConfirm, onClose,confirmText,
                           confirmColor, cancelText = "Cancel",
                       }: ConfirmDialogProps) {

    return (
        <Dialog
            open={open}
            onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>

            <DialogContent>
                <Typography>{message}</Typography>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>{cancelText}</Button>

                <Button
                    color={confirmColor}
                    variant="contained"
                    onClick={onConfirm}>
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialog;