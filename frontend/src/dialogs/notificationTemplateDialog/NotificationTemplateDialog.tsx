import {
    Button, Tab, Dialog, DialogActions, DialogContent,
    DialogTitle, Stack, Tabs, TextField,
} from "@mui/material";
import {useState} from "react";
import {useNotificationTemplateDialog} from "./useNotificationTemplateDialog";
import PlaceholderSelector from "../../components/PlaceholderSelector.tsx";
import {useTranslation} from "react-i18next";

type NotificationTemplateDialogProps = {
    open: boolean;
    onClose: () => void;
};

function NotificationTemplateDialog({
                                        open, onClose,
                                    }: NotificationTemplateDialogProps) {

    const {
        template, setTemplate, handleSave,
    } = useNotificationTemplateDialog(
        open, onClose,
    );

    const [tab, setTab] = useState(0);
    const {t} = useTranslation();

    if (!template) {
        return null;
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >

            <DialogTitle>{t("notificationTemplates.title")}</DialogTitle>

            <DialogContent>

                <Tabs
                    value={tab}
                    onChange={(_, value) => setTab(value)}>
                    <Tab label={t("notificationTemplates.today")} />
                    <Tab label={t("notificationTemplates.schedule")} />
                </Tabs>

                <Stack
                    spacing={2}
                    sx={{mt: 2}}
                >

                    {tab === 0 && (
                        <>
                            <TextField
                                fullWidth
                                multiline
                                minRows={12}
                                label={t("notificationTemplates.todayTemplate")}
                                value={template.todayTemplate}
                                onChange={(event) =>
                                    setTemplate({
                                        ...template,
                                        todayTemplate: event.target.value,
                                    })
                                }

                            />
                            <PlaceholderSelector
                                value={template.todayTemplate}
                                onChange={(value) =>
                                    setTemplate({
                                        ...template,
                                        todayTemplate: value,
                                    })
                                }
                                placeholders={[
                                    {
                                        label: "Today",
                                        value: "{{TODAY}}",
                                    },
                                ]}
                            />
                        </>
                    )}


                    {tab === 1 && (
                        <>
                            <TextField
                                fullWidth
                                multiline
                                minRows={12}
                                label={t("notificationTemplates.scheduleTemplate")}
                                value={template.scheduleTemplate}
                                onChange={(event) =>
                                    setTemplate({
                                        ...template,
                                        scheduleTemplate: event.target.value,
                                    })
                                }
                            />
                            <PlaceholderSelector
                                value={template.scheduleTemplate}
                                onChange={(value) =>
                                    setTemplate({
                                        ...template,
                                        scheduleTemplate: value,
                                    })
                                }
                                placeholders={[
                                    {
                                        label: "Next Duties",
                                        value: "{{NEXT_DUTIES}}",
                                    },
                                ]}
                            />
                        </>
                    )}


                </Stack>

            </DialogContent>
            <DialogActions>

                <Button onClick={onClose}>{t("common.cancel")}</Button>

                <Button
                    variant="contained"
                    onClick={handleSave}>
                    {t("common.save")}
                </Button>

            </DialogActions>
        </Dialog>
    );
}

export default NotificationTemplateDialog;