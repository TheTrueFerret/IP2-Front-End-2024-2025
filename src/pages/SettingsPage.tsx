import { useState } from "react";
import { NotificationPopup } from "../components/notifications/notificationPopup/NotificationPopup"
import { NotificationType } from "../models/Notification"
import { BackButton } from "../components/BackButton";
import { useNavigate } from "react-router-dom";


export function SettingsPage() {
    const [showNotification, setShowNotification] = useState(true);
    const navigate = useNavigate();

    const handleCloseNotification = () => {
        setShowNotification(false);
    };

    return (
        <div>
            <BackButton backAction={() => navigate('/')}/>
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
