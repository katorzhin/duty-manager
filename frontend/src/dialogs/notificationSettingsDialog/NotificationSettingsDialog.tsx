import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl,
    FormControlLabel, Radio, RadioGroup, Stack, Switch, TextField,
} from "@mui/material";

import {useNotificationSettingsDialog} from "./useNotificationSettingsDialog";
import type {NotificationFrequency} from "../../types/notificationSettings/NotificationFrequency.ts";
import {useTranslation} from "react-i18next";

type NotificationSettingsDialogProps = {
    open: boolean;
    onClose: () => void;
};

function NotificationSettingsDialog({
                                        open, onClose,
                                    }: NotificationSettingsDialogProps) {

    const {
        settings,
        setSettings,
        handleSave,
    } = useNotificationSettingsDialog(
        open,
        onClose,
    );

    const {t} = useTranslation();

    if (!settings) {
        return null;
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>{t("notificationSettings.title")}</DialogTitle>

            <DialogContent>

                <Stack
                    spacing={3}
                    sx={{mt: 1}}
                >

                    <FormControlLabel
                        control={
                            <Switch
                                checked={settings.enabled}
                                onChange={(event) =>
                                    setSettings({
                                        ...settings,
                                        enabled: event.target.checked,
                                    })
                                }
                            />
                        }
                        label={t("notificationSettings.enabled")}
                    />

                    <FormControl>

                        <RadioGroup
                            value={settings.frequency}
                            onChange={(event) =>
                                setSettings({
                                    ...settings,
                                    frequency: event.target.value as NotificationFrequency,
                                })
                            }
                        >

                            <FormControlLabel
                                value="ONCE"
                                control={<Radio/>}
                                label={t("notificationSettings.once")}
                                disabled={!settings.enabled}
                            />

                            <FormControlLabel
                                value="TWICE"
                                control={<Radio/>}
                                label={t("notificationSettings.twice")}
                                disabled={!settings.enabled}
                            />

                        </RadioGroup>

                    </FormControl>

                    <TextField
                        label={t("notificationSettings.firstNotification")}
                        type="time"
                        value={settings.firstNotificationTime}
                        disabled={!settings.enabled}
                        onChange={(event) =>
                            setSettings({
                                ...settings,
                                firstNotificationTime: event.target.value,
                            })
                        }
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                    />

                    {settings.frequency === "TWICE" && (

                        <TextField
                            label={t("notificationSettings.secondNotification")}
                            type="time"
                            value={settings.secondNotificationTime ?? ""}
                            disabled={!settings.enabled}
                            onChange={(event) =>
                                setSettings({
                                    ...settings,
                                    secondNotificationTime: event.target.value,
                                })
                            }
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />

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

export default NotificationSettingsDialog;