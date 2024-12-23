import {useContext, useState} from "react";
import useUsers from "../../hooks/useUsers.ts";
import {NotificationCard} from "../notifications/notificationCard/NotificationCard.tsx";
import {NotificationType} from "../../models/Notification.ts";
import SecurityContext from "../../context/SecurityContext.ts";

interface FriendSearchProps {
    onAddFriend: (userId: string) => void;
    onClose: () => void;
}

export function FriendSearch({onAddFriend, onClose}: FriendSearchProps) {
    const {loggedUserId} = useContext(SecurityContext);
    const [searchTerm, setSearchTerm] = useState("");
    const {searchedUsers, isLoading, isError, searchUsers} = useUsers();

    const handleSearch = async () => {
        searchUsers(searchTerm);
    };

    if (isLoading) {
        return (
            <NotificationCard
                loading={isLoading}
                notification={{
                    title: 'Loading',
                    description: 'Searching for friends...',
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
                    description: 'Failed to search for friends',
                    type: NotificationType.Error,
                }}
            />
        );
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
                <div className={"flex-row "}>
                    <button onClick={onClose} className="bg-gray-400 mt-2 p-2 rounded-xl text-gray-500 w-1/6 hover:text-black ">
                        Close
                    </button>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for a friend"
                        className="p-2 border rounded-xl w-4/6 text-black"
                    />
                    <button onClick={handleSearch} className="mt-2 p-2 bg-blue-500 text-white rounded-xl w-1/6">
                        Search
                    </button>
                </div>
                <ul className="mt-4 ">
                    {searchedUsers && searchedUsers.length > 0 ? (
                        searchedUsers.map((user) => {
                            const isFriend = user.isFriend;
                            const isSelf = user.id === loggedUserId;
                            return (
                                <li key={user.id} className="flex justify-between items-center">
                                    <span className={"text-black"}>{user.username}</span>
                                    {isSelf ? (
                                        <span className="ml-2 p-2 bg-gray-500 rounded">This is you</span>
                                    ) : isFriend ? (
                                        <span className="ml-2 p-2 bg-blue-500 rounded">Already a friend</span>
                                    ) : (
                                        <button
                                            onClick={() => onAddFriend(user.username)}
                                            className="ml-2 p-2 bg-green-500 rounded-xl"
                                        >
                                            Add Friend
                                        </button>
                                    )}
                                </li>
                            );
                        })
                    ) : (
                        <p className="text-black">No users found</p>
                    )}
                </ul>
            </div>
        </div>
    );
}