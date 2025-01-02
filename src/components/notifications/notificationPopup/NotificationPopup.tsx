import './NotificationPopup.css';
import {Notification} from "../../../models/Notification.ts"; // Style this as you like

interface NotificationPopupProps {
    notification: Notification;
    onClose: () => void;
}

export function NotificationPopup({ notification, onClose }: NotificationPopupProps)  {
    return (
        <div className={`notification-popup bg-neutral-900/60 backdrop-blur`}>
            <div className="notification-header">
                <h4>{`${notification.title}`}</h4>
                <button onClick={onClose} className="close-button">
                    ×
                </button>
            </div>
            <p>{notification.description}</p>
        </div>
    );
};
