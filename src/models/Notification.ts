export interface Notification {
    title: string;
    description: string;
    type: NotificationType;
}

export enum NotificationType {
    Success = 'Success',
    Error = 'Error',
    Info = 'Info',
    Warning = 'Warning'
}