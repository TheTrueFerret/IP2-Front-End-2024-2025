import {useState} from "react";

interface UseSettingsProps {
    backgroundColor: string;
    userAvatarColor: string;
    handleBackgroundColorChange: (color: string) => void;
    handleUserAvatarColorChange: (color: string) => void;
}

const useSettings = (): UseSettingsProps => {
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [userAvatarColor, setUserAvatarColor] = useState('#ffffff');

    const handleBackgroundColorChange = (color: string) => {
        setBackgroundColor(color);
    };

    const handleUserAvatarColorChange = (color: string) => {
        setUserAvatarColor(color);
    };

    return {
        backgroundColor,
        userAvatarColor,
        handleUserAvatarColorChange,
        handleBackgroundColorChange,
    };
};

export default useSettings;