import {useParams} from "react-router-dom";
import {LoginButton} from "../components/loginButton/LoginButton";
import useUsers from "../hooks/useUsers";
import {FriendList} from "../components/friend/FriendList.tsx";
import {NotificationType} from "../models/Notification.ts";
import {NotificationCard} from "../components/notifications/notificationCard/NotificationCard.tsx";

export function UserprofilePage() {
    const {userId} = useParams<{ userId: string }>();
    const {user, friends, isLoading, isError} = useUsers(userId);

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
        <div className="flex items-center justify-center min-h-screen ">
            <div className='z-20 absolute top-2 right-2'>
                <LoginButton/>
            </div>
            <div className="bg-gray-500 z-50 p-1 rounded-lg">
                <main className="bg-gray-900 text-white p-10 rounded-lg shadow-2xl max-w-3xl w-full z-50 opacity-100">
                    <h1>{user?.username} Friend List</h1>
                    <div>
                        <FriendList users={friends || []}></FriendList>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default UserprofilePage;
