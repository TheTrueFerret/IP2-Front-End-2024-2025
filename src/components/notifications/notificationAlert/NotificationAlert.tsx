import { Notification } from "../../../models/Notification";
import "./NotificationAlert.css"


interface NotificationAlertProps {
  notification: Notification;
  buttons: boolean;
  onClose?: () => void;
  onExecute?: () => void;
  closeButtonText?: string;
  executeButtonText?: string;
}

export function NotificationAlert({ notification, buttons, onClose, onExecute, closeButtonText, executeButtonText }: NotificationAlertProps) {
  return (
    <div className='notification-alert-container'>
      <div className='notification-alert'>
        <h3 className='notification-alert-title'>{notification.title}</h3>
        <div className='notification-alert-content'>
          <p className='notification-alert-description'>{notification.description}</p>
          <div className='notification-alert-buttons'>
            {buttons && (
              <>
                <button className="notification-alert-button" onClick={onClose}>
                  {closeButtonText}
                </button>
                <button className="notification-alert-button" onClick={onExecute}>
                  {executeButtonText}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}