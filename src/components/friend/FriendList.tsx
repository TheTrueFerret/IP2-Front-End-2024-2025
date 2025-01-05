import {useState} from "react";
import {FriendSearch} from "./FriendSearch.tsx";
import {Friend} from "../../models/Friend.ts";
import useUsers from "../../hooks/useUsers.ts";
import {NotificationType} from "../../models/Notification.ts";
import {NotificationAlert} from "../notifications/notificationAlert/NotificationAlert.tsx";
import {Link} from "react-router-dom";

export function FriendList({users}: { users: Friend[] | null }) {
    const [addFriendOpened, setAddFriendOpened] = useState(false);
    const [requestSent, setRequestSent] = useState(false);
    const [sentUsername, setSentUsername] = useState<string | null>(null);
    const {friendRequest,removeFriend} = useUsers();

    function onAddFriend(username: string) {
        if (friendRequest(username)) {
            setRequestSent(true);
            setSentUsername(username);
            setTimeout(() => setRequestSent(false), 3000); // Hide the popup after 3 seconds
        }
    }

    function onRemoveFriend(userId: string) {
        removeFriend(userId);
    }

    return (
        <div className="mt-2 w-full flex flex-col h-full">
            <button onClick={() => setAddFriendOpened(true)}
                    className={"w-2/6 self-center m-2 p-2 bg-green-400 text-white rounded items-center"}>Search Friend
            </button>
            {addFriendOpened && (
                <FriendSearch onAddFriend={onAddFriend} onClose={() => setAddFriendOpened(false)}/>
            )}
            {requestSent && (
                <NotificationAlert
                    buttons={false}
                    notification={{
                        title: 'Friend Request Sent',
                        description: `Friend request sent to ${sentUsername}`,
                        type: NotificationType.Success,
                    }}
                    onClose={() => setRequestSent(false)}
                />
            )}
            {users == null || users.length === 0 ? (
                <>
                    <p className="text-white text-center">No friends available</p>
                </>
            ) : (
                <>
                    <ul className="space-y-2">
                        {users.map((user) => (
                            <li key={user.id}
                                className="flex justify-between items-center bg-white text-black rounded-lg p-4 shadow-md">
                                <div className="flex items-center space-x-4">
                                    <img src={`../../../public/${user.avatar}`} alt={`${user.username}'s avatar`}
                                         className="w-10 h-10 rounded-full"/>
                                    <Link to={`/UserProfile/${user.id}`} className="text-lg font-bold">{user.username}</Link>
                                </div>
                                <button
                                    onClick={() => onRemoveFriend(user.id.toString())}
                                    className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Remove Friend
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}