import {BackButton} from "../components/BackButton";
import {useNavigate} from "react-router-dom";
import {LoginButton} from "../components/LoginButton.tsx";
import {useContext, useState, useEffect} from "react";
import SecurityContext from "../context/SecurityContext.ts";
import useUsers from "../hooks/useUsers.ts";
import {NotificationCard} from "../components/notifications/notificationCard/NotificationCard.tsx";
import {NotificationType} from "../models/Notification.ts";
import useSettings from "../hooks/useSettings.ts";

export function SettingsPage() {
    const navigate = useNavigate();
    const {loggedUserId} = useContext(SecurityContext);
    const {handleBackgroundColorChange, handleUserAvatarColorChange} = useSettings();
    const {userCustomizables, isLoading, isError} = useUsers(loggedUserId);
    const [selectedBackground, setSelectedBackground] = useState('Default white');
    const [selectedProfileBackground, setSelectedProfileBackground] = useState('Default white');

    useEffect(() => {
        const backgroundSettings = userCustomizables?.find(c =>  !c.name.includes('Profile'));
        const profilePictureBackgroundSettings = userCustomizables?.find(c => c.name.includes('Profile_Background'));

        if (backgroundSettings) {
            handleBackgroundColorChange(backgroundSettings.color);
        }
        if (profilePictureBackgroundSettings) {
            setSelectedProfileBackground(profilePictureBackgroundSettings.name);
            handleUserAvatarColorChange(profilePictureBackgroundSettings.color);
        }
    }, [userCustomizables]);

    const handleBackgroundChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedName = event.target.value;
        const selectedColor = userCustomizables.find(c => c.name === selectedName)?.color;
        if (selectedColor) {
            setSelectedBackground(selectedName);
            console.log("change color to: ",selectedColor);
            handleBackgroundColorChange(selectedColor);
        }
    };

    const handleProfilePictureBackgroundChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedName = event.target.value;
        const selectedColor = userCustomizables.find(c => c.name === selectedName)?.color;
        if (selectedColor) {
            console.log("change color to: ",selectedColor);
            setSelectedProfileBackground(selectedName);
            handleUserAvatarColorChange(selectedColor);
        }
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
        <div>
            <BackButton backAction={() => navigate('/')}/>
            <div className=' absolute top-2 right-2'>
                <LoginButton/>
            </div>
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white p-6 rounded-lg shadow-lg z-20">
                    <h1 className="text-3xl font-bold mb-6">Settings</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="backgroundColor">
                            Background Color
                        </label>
                        <select
                            id="backgroundColor"
                            value={selectedBackground}
                            onChange={handleBackgroundChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            {userCustomizables.filter(c => c.name.includes('Background')).map((item) => (
                                <option key={item.name} value={item.name}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2"
                               htmlFor="profilePictureBackground">
                            Profile Picture Background
                        </label>
                        <select
                            id="profilePictureBackground"
                            value={selectedProfileBackground}
                            onChange={handleProfilePictureBackgroundChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            {userCustomizables.filter(c => c.name.includes('Profile_Background')).map((item) => (
                                <option key={item.name} value={item.name}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}