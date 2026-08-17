import {useState} from "react";
import {useTranslation} from "react-i18next";
import {
    Button, Box, Container, TextField, Typography,
} from "@mui/material";

import {notifyError, notifySuccess} from "../../shared/toast";
import ConfirmDialog from "../../dialogs/confirmDialog/ConfirmDialog";
import {useNotifications} from "./useNotifications";
import {styles} from "./styles";
import NotificationSettingsDialog from "../../dialogs/notificationSettingsDialog/NotificationSettingsDialog.tsx";
import NotificationTemplateDialog from "../../dialogs/notificationTemplateDialog/NotificationTemplateDialog.tsx";

function Notifications() {

    const {message, setMessage, handleSend} = useNotifications();
    const {t} = useTranslation();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [templateOpen, setTemplateOpen] = useState(false);

    const handleConfirmSend = async () => {

        try {

            await handleSend();

            notifySuccess(t("notifications.sent"));

        } catch {
            notifyError(t("notifications.sendFailed"));

        } finally {
            setConfirmOpen(false);

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
                    {t("notifications.title")}
                </Typography>

                <Typography
                    variant="body1"
                    sx={styles.subtitle}>
                    {t("notifications.subtitle")}
                </Typography>

                <Button
                    variant="outlined"
                    onClick={() => setSettingsOpen(true)}>
                    {t("notifications.automatic")}
                </Button>

                <Button
                    variant="outlined"
                    onClick={() => setTemplateOpen(true)}>
                    {t("notifications.templates")}
                </Button>


                <TextField
                    fullWidth
                    multiline
                    minRows={8}
                    maxRows={12}
                    label={t("notifications.message")}
                    value={message}
                    onChange={(event) =>
                        setMessage(event.target.value)
                    }
                />

                <Box sx={styles.counter}>
                    <Typography
                        variant="caption"
                        color="text.secondary">
                        {message.length} {t("notifications.characters")}
                    </Typography>
                </Box>

                <Button
                    fullWidth
                    sx={styles.sendButton}
                    variant="contained"
                    size="large"
                    disabled={!message.trim()}
                    onClick={() => setConfirmOpen(true)}>
                    {t("notifications.send")}
                </Button>

                <ConfirmDialog
                    open={confirmOpen}
                    confirmText={t("notifications.sendConfirm")}
                    confirmColor="primary"
                    title={t("notifications.sendTitle")}
                    message={t("notifications.sendMessage")}
                    onClose={() => setConfirmOpen(false)}
                    onConfirm={handleConfirmSend}
                />
                <NotificationSettingsDialog
                    open={settingsOpen}
                    onClose={() => setSettingsOpen(false)}
                />

                <NotificationTemplateDialog
                    open={templateOpen}
                    onClose={() => setTemplateOpen(false)}
                />
            </Box>
        </Container>
    );
}

export default Notifications;