import {useEffect, useState} from "react";

import type {NotificationTemplate} from "../../types/notificationTemplate/NotificationTemplate";

import {
    getNotificationTemplate, updateNotificationTemplate,
} from "../../services/notificationTemplateApi";

import {
    notifyError, notifySuccess,
} from "../../shared/toast";

export const useNotificationTemplateDialog = (
    open: boolean,
    onClose: () => void,
) => {

    const [template, setTemplate] =
        useState<NotificationTemplate | null>(null);

    useEffect(() => {

        if (!open) {
            return;
        }

        const loadTemplate = async () => {

            const data = await getNotificationTemplate();

            setTemplate(data);
        };

        void loadTemplate();

    }, [open]);

    const handleSave = async () => {

        if (!template) {
            return;
        }

        try {

            await updateNotificationTemplate(template);

            notifySuccess(
                "Notification templates updated successfully"
            );

            onClose();

        } catch {

            notifyError(
                "Failed to update notification templates"
            );
        }
    };

    return {
        template,
        setTemplate,
        handleSave,
    };
};