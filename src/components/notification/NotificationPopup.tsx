import React from 'react';
import './NotificationPopup.css';
import {PopupNotification, NotificationType} from "../../models/PopupNotification.ts"; // Style this as you like

interface NotificationPopupProps {
    notification: PopupNotification;
    onClose: () => void;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({ notification, onClose }) => {
    const getClassName = (type: NotificationType) => {
        switch (type) {
            case NotificationType.Success:
                return 'notification-success';
            case NotificationType.Error:
                return 'notification-error';
            case NotificationType.Info:
                return 'notification-info';
            case NotificationType.Warning:
                return 'notification-warning';
            default:
                return '';
        }
    };

    return (
        <div className={`notification-popup ${getClassName(notification.type)}`}>
            <div className="notification-header">
                <h4>{notification.title}</h4>
                <button onClick={onClose} className="close-button">
                    ×
                </button>
            </div>
            <p>{notification.description}</p>
        </div>
    );
};

export default NotificationPopup;
