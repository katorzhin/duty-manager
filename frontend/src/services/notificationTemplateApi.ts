import api from "../api/axios";
import type {NotificationTemplate} from "../types/notificationTemplate/NotificationTemplate";

const NOTIFICATION_TEMPLATE_URL = "/notification-template";

export const getNotificationTemplate = async (): Promise<NotificationTemplate> => {

    const response = await api.get<NotificationTemplate>(
        NOTIFICATION_TEMPLATE_URL
    );

    return response.data;
};

export const updateNotificationTemplate = async (
    request: NotificationTemplate
): Promise<NotificationTemplate> => {

    const response = await api.put<NotificationTemplate>(
        NOTIFICATION_TEMPLATE_URL,
        request
    );

    return response.data;
};