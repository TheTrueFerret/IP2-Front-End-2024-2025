export interface PopupNotification {
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