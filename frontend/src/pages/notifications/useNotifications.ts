import {useState} from "react";
import {sendNotification} from "../../services/notificationApi.ts";

export const useNotifications = () => {

    const [message, setMessage] = useState("");

    const handleSend = async () => {

        await sendNotification(message);

        setMessage("");
    };

    return {
        message,
        setMessage,
        handleSend,
    };
};