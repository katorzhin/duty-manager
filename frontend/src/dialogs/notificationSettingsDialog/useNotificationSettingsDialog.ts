import {useEffect, useState} from "react";

import type {NotificationSettings} from "../../types/notificationSettings/NotificationSettings";

import {getNotificationSettings, updateNotificationSettings} from "../../services/notificationSettingsApi";
import {notifyError, notifySuccess} from "../../shared/toast.ts";

export const useNotificationSettingsDialog = (
    open: boolean,
    onClose: () => void,
) => {

    const [settings, setSettings] = useState<NotificationSettings | null>(null);

    useEffect(() => {

        if (!open) {
            return;
        }

        const loadSettings = async () => {
            const data = await getNotificationSettings();
            setSettings(data);
        };

        void loadSettings();

    }, [open]);

    const handleSave = async () => {

        if (!settings) {
            return;
        }
        try {
            await updateNotificationSettings(settings);
            notifySuccess("Notification settings updated successfully");
            onClose();
        } catch {
            notifyError("Failed to update notification settings");
        }
    };

    return {
        settings,
        setSettings,
        handleSave,
    };
};