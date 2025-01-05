import React, {useContext} from 'react';
import CustomizableList from '../components/Customizables/CustomizableList';
import {BackButton} from "../components/BackButton.tsx";
import {LoginButton} from "../components/LoginButton.tsx";
import {useNavigate} from "react-router-dom";
import SecurityContext from "../context/SecurityContext.ts";
import useUsers from "../hooks/useUsers.ts";
import useCustomizables from "../hooks/useCustomizables.ts";

const ShopPage: React.FC = () => {
    const navigate = useNavigate();
    const {loggedUserId} = useContext(SecurityContext);
    const {customizables, isError: customizablesError, isLoading: customizablesLoading} = useCustomizables();
    const {userCustomizables, user, isLoading, isError} = useUsers(loggedUserId)

    const handleBuy = (item: { name: string; description: string; color: string; points: number }) => {
        console.log('Bought item:', item);
    };

    if (isLoading || !userCustomizables || isError || !user || customizablesError || customizablesLoading) {
        return <div>Loading...</div>
    }
    return (
        <div className="flex items-center justify-center h-full shadow-current rounded-lg">
            <BackButton backAction={() => navigate('/')}/>
            <div className='z-20 absolute top-2 right-2'>
                <LoginButton/>
            </div>
            <div className="p-6 bg-white z-50 rounded-lg">
                <h1 className="text-3xl font-bold mb-6">Item Shop</h1>
                <div className="absolute top-2 right-40 bg-white p-2 rounded-lg">
                    <p className="text-xl">Credits: {user.points}</p>
                </div>
                <CustomizableList items={customizables} ownedItems={userCustomizables} onBuy={handleBuy}/>
            </div>
        </div>
    );
};

export default ShopPage;