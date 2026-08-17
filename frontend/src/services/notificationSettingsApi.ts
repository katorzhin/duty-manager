import api from "../api/axios";
import type {NotificationSettings} from "../types/notificationSettings/NotificationSettings";

const NOTIFICATION_SETTINGS_URL = "/notification-settings";

export const getNotificationSettings = async (): Promise<NotificationSettings> => {

    const response = await api.get<NotificationSettings>(
        NOTIFICATION_SETTINGS_URL
    );

    return response.data;
};

export const updateNotificationSettings = async (
    request: NotificationSettings
) => {

    const response = await api.put<NotificationSettings>(
        NOTIFICATION_SETTINGS_URL,
        request
    );

    return response.data;
};