import {
    Button, Dialog, DialogActions, DialogContent,
    DialogTitle, Typography
} from "@mui/material";
import {useTranslation} from "react-i18next";

type Props = {
    open: boolean;
    dates: string[];
    onClose: () => void;
    onReplace: () => void;
};

function ConflictDialog({open, dates, onClose, onReplace}: Props) {

    const {t} = useTranslation();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth>
            <DialogTitle>{t("conflictDialog.title")}</DialogTitle>

            <DialogContent>

                <Typography sx={{mb: 2}}>
                    {t("conflictDialog.message")}
                </Typography>

                {dates.map(date => (
                    <Typography key={date}>
                        • {date}
                    </Typography>
                ))}

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>{t("common.cancel")}</Button>

                <Button
                    variant="contained"
                    color="warning"
                    onClick={onReplace}>
                    {t("conflictDialog.replace")}
                </Button>

            </DialogActions>
        </Dialog>
    );
}

export default ConflictDialog;