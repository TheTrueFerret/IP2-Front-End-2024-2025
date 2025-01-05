import {BackButton} from "../components/BackButton";
import {useNavigate} from "react-router-dom";
import {LoginButton} from "../components/LoginButton.tsx";
import {useContext, useState, useEffect} from "react";
import SecurityContext from "../context/SecurityContext.ts";
import useUsers from "../hooks/useUsers.ts";
import {NotificationCard} from "../components/notifications/notificationCard/NotificationCard.tsx";
import {NotificationType} from "../models/Notification.ts";

export function SettingsPage() {
    const navigate = useNavigate();
    const {loggedUserId} = useContext(SecurityContext);
    const {userCustomizables, isLoading, isError} = useUsers(loggedUserId);
    const backgroundSettings = userCustomizables?.find(c => c.name.includes('Background'));
    const profilePictureBackgroundSettings = userCustomizables?.find(c => c.name.includes('Profile_Background'));

    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [profilePictureBackground, setProfilePictureBackground] = useState('#ffffff');

    useEffect(() => {
        if (backgroundSettings) {
            setBackgroundColor(backgroundSettings.color);
        }
        if (profilePictureBackgroundSettings) {
            setProfilePictureBackground(profilePictureBackgroundSettings.color);
        }
    }, [backgroundSettings, profilePictureBackgroundSettings]);

    const handleSetBackground = (color: string) => {
        setBackgroundColor(color);
    };

    const handleSetProfilePictureBackground = (color: string) => {
        setProfilePictureBackground(color);
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
        <div className={"bg-gray-500"}>
            <BackButton backAction={() => navigate('/')}/>
            <div className=' absolute top-2 right-2'>
                <LoginButton/>
            </div>
            <div className="flex items-center justify-center min-h-screen z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold mb-6">Settings</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="backgroundColor">
                            Background Color
                        </label>
                        <input
                            type="color"
                            id="backgroundColor"
                            value={backgroundColor}
                            readOnly
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
                            readOnly
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2">Available Customizables</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {userCustomizables.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => {
                                        if (item.name.includes('Background')) {
                                            handleSetBackground(item.color);
                                        } else if (item.name.includes('Profile_Background')) {
                                            handleSetProfilePictureBackground(item.color);
                                        }
                                    }}
                                    className="p-4 border rounded-lg shadow hover:bg-gray-200"
                                >
                                    <div className="text-center">
                                        <div className="text-lg font-bold">{item.name}</div>
                                        <div className="text-sm">{item.description}</div>
                                        <div className="mt-2" style={{ backgroundColor: item.color, height: '20px', width: '100%' }}></div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}