import {useContext} from 'react';
import GraphComponent from "../components/Prediction/GraphComponent.tsx";
import {LoginButton} from "../components/loginButton/LoginButton.tsx";
import SecurityContext from '../context/SecurityContext.ts';
import {NotificationType} from "../models/Notification.ts";
import {NotificationAlert} from "../components/notifications/notificationAlert/NotificationAlert.tsx";
import {BackButton} from "../components/BackButton.tsx";
import {useNavigate} from "react-router-dom";

export function PredictionPage() {
    const {roles} = useContext(SecurityContext);
    const navigate = useNavigate()

    if (!roles.includes('ADMIN')) {
        return <NotificationAlert
            notification={{
                title: 'Acces Denied',
                description: 'You do not have the required permissions to access this page',
                type: NotificationType.Error,
            }}
            buttons={true}
            closeButtonText='Go Back'
            onClose={() => {
                window.history.back();
            }}/>
    }

    return (
        <div className="w-full h-full flex flex-col">
            <BackButton backAction={() => navigate('/')}/>
            <div className='z-20 self-end p-2'>
                <LoginButton/>
            </div>
            <GraphComponent/>
        </div>
    );
}