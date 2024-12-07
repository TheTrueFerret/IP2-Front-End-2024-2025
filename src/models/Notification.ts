export interface Notification {
    title: string;
    description: string;
    type: NotificationType;
}

export enum NotificationType {
    Success,
    Error,
    Info,
    Warning
}