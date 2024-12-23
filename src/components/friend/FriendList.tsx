import {useState} from "react";
import {FriendSearch} from "./FriendSearch.tsx";
import {Friend} from "../../models/Friend.ts";
import useUsers from "../../hooks/useUsers.ts";
import {NotificationType} from "../../models/Notification.ts";
import {NotificationAlert} from "../notifications/notificationAlert/NotificationAlert.tsx";

export function FriendList({users}: { users: Friend[] | null }) {
    const [addFriendOpened, setAddFriendOpened] = useState(false);
    const [requestSent, setRequesSent] = useState(false);
    const [sentUsername, setSentUsername] = useState<string | null>(null);
    const {friendRequest} = useUsers();

    function onAddFriend(username: string) {
        if (friendRequest(username)) {
            setRequesSent(true);
            setSentUsername(username);
        }
    }

    function onRemoveFriend(userId: string) {
        console.log(userId);
        // TODO: Implement this function to call backend with id
    }

    return (
        <div className="mt-8 w-full flex flex-col justify-between h-full">
            {addFriendOpened && (
                <FriendSearch onAddFriend={onAddFriend} onClose={() => setAddFriendOpened(false)}/>
            )}
            {requestSent && (
                <NotificationAlert
                    buttons={true}
                    closeButtonText={"Close"}
                    notification={{
                        title: 'Friend request sent',
                        description: 'You sent a friend request to ' + sentUsername,
                        type: NotificationType.Warning,
                    }}
                    onClose={() => setRequesSent(!requestSent)}/>
            )}
            {users == null || users.length === 0 ? (
                <>
                    <p className="text-white text-center">No friends available</p>
                    <button onClick={() => setAddFriendOpened(true)}
                            className={"w-2/6 self-center m-2 p-2 bg-green-400 text-white rounded items-center"}>Search Friend
                    </button>
                </>
            ) : (
                <>
                    <h3 className="text-2xl font-semibold mb-4 text-center">
                        Friends: {users.length}
                    </h3>
                    <ul className="space-y-2">
                        {users.map((user) => (
                            <li key={user.id} className="flex justify-between items-center">
                                <span>{user.username}</span>
                                <button
                                    onClick={() => onRemoveFriend(user.id.toString())}
                                    className="ml-2 p-2 bg-red-800 text-white rounded"
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