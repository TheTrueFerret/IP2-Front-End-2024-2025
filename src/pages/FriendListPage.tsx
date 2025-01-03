import {LoginButton} from "../components/loginButton/LoginButton";
import useUsers from "../hooks/useUsers";
import {FriendList} from "../components/friend/FriendList.tsx";
import {NotificationType} from "../models/Notification.ts";
import {NotificationCard} from "../components/notifications/notificationCard/NotificationCard.tsx";
import {FriendRequestList} from "../components/friend/FriendRequestList.tsx";
import {useNavigate, useParams} from "react-router-dom";
import { BackButton } from "../components/BackButton.tsx";

export function UserprofilePage() {
    const {userId} = useParams<{ userId: string }>();
    const {friendRequests, friends, isLoading, isError} = useUsers(userId);
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <NotificationCard
                loading={isLoading}
                notification={{
                    title: 'Loading',
                    description: 'Friend List is Loading',
                    type: NotificationType.Info,
                }}
            />
        );
    }

    if (isError) {
        return (
            <NotificationCard
                loading={false}
                notification={{
                    title: 'Error',
                    description: 'Failed to load friend list',
                    type: NotificationType.Error,
                }}
            />
        );
    }

    return (
        <div className="flex items-center justify-center h-full shadow-current ">
            <BackButton backAction={() => navigate('/')}/>
            <div className='z-20 absolute top-2 right-2'>
                <LoginButton/>
            </div>
            <div
                className="flex flex-row bg-gray-600 text-white p-3 gap-3 rounded-lg shadow-2xl max-w-3xl w-full h-2/3 z-50 opacity-100">
                <div
                    className="flex flex-col w-1/2 items-center justify-items-center justify-center bg-gray-500 rounded-lg">
                    <h1>My friends: {friends?.length}</h1>
                    <FriendList users={friends || []}></FriendList>
                </div>
                <div className="w-1/2 items-center justify-items-center justify-center bg-gray-500 rounded-lg">
                    <h1>Friend Requests</h1>
                    <FriendRequestList requests={friendRequests || []}></FriendRequestList>
                </div>
            </div>
        </div>
    );
}

export default UserprofilePage;
