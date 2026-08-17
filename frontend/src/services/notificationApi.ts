import api from "../api/axios";

const NOTIFICATION_URL = "/notifications";

export const sendNotification = async (
    message: string
): Promise<void> => {

    await api.post(`${NOTIFICATION_URL}/send`, {message});
};
