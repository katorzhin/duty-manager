import type {NotificationFrequency} from "./NotificationFrequency.ts";

export type NotificationSettings = {
    enabled: boolean;
    frequency: NotificationFrequency;
    firstNotificationTime: string;
    secondNotificationTime: string | null;
};