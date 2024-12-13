import { useState } from "react";
import { NotificationPopup } from "../components/notifications/notificationPopup/NotificationPopup"
import { NotificationType } from "../models/Notification"

export function Settings() {


    const [showNotification, setShowNotification] = useState(true);

    const handleCloseNotification = () => {
        setShowNotification(false);
    };

    return (
        <div>
            {showNotification && (
                <NotificationPopup
                    notification={{
                        title: 'Its Your Turn!!!',
                        description: 'Make Sure to make your move Right NOW!!!!',
                        type: NotificationType.Warning,
                    }}
                    onClose={handleCloseNotification} />
            )}
        </div>
    )
}

export default Settings