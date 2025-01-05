import {BackButton} from "../components/BackButton";
import {useNavigate} from "react-router-dom";
import {LoginButton} from "../components/LoginButton.tsx";
import {useContext, useState} from "react";
import SecurityContext from "../context/SecurityContext.ts";
import useUsers from "../hooks/useUsers.ts";
import {NotificationCard} from "../components/notifications/notificationCard/NotificationCard.tsx";
import {NotificationType} from "../models/Notification.ts";

export function SettingsPage() {
    const navigate = useNavigate();
    const {loggedUserId} = useContext(SecurityContext);
    const {userCustomizables, isLoading, isError} = useUsers(loggedUserId);
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [profilePictureBackground, setProfilePictureBackground] = useState('#ffffff');

    const handleBackgroundColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBackgroundColor(event.target.value);
    };

    const handleProfilePictureBackgroundChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProfilePictureBackground(event.target.value);
    };

    const saveSettings = () => {
        // Save the settings to the server or context
        console.log('Settings saved:', {backgroundColor, profilePictureBackground});
    };

    if (isLoading || !userCustomizables || isError) {
        return <NotificationCard
            notification={{
                title: 'Problem loading the page',
                description: 'Please try again later',
                type: NotificationType.Warning,
            }}
            loading={true}
        />
    }

    return (
        <div className={"bg-white z-20"}>
            <BackButton backAction={() => navigate('/')}/>
            <div className='z-20 absolute top-2 right-2'>
                <LoginButton/>
            </div>
            <div className="flex items-center justify-center min-h-screen ">
                <h1 className="text-3xl font-bold mb-6">Settings</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="backgroundColor">
                        Background Color
                    </label>
                    <input
                        type="color"
                        id="backgroundColor"
                        value={backgroundColor}
                        onChange={handleBackgroundColorChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2"
                           htmlFor="profilePictureBackground">
                        Profile Picture Background
                    </label>
                    <input
                        type="color"
                        id="profilePictureBackground"
                        value={profilePictureBackground}
                        onChange={handleProfilePictureBackgroundChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button
                    onClick={saveSettings}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Save Settings
                </button>
            </div>
        </div>
    )
        ;
}