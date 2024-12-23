import { useState } from "react";
import useUsers from "../../hooks/useUsers.ts";
import { NotificationCard } from "../notifications/notificationCard/NotificationCard.tsx";
import { NotificationType } from "../../models/Notification.ts";

interface FriendSearchProps {
    onAddFriend: (userId: string) => void;
    onClose: () => void;
}

export function FriendSearch({ onAddFriend, onClose }: FriendSearchProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const { searchedUsers, isLoading, isError, searchUsers } = useUsers();

    const handleSearch = async () => {
        searchUsers(searchTerm);
        console.log(searchedUsers);
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
    console.log(searchedUsers);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                    GO BACK
                </button>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for a friend"
                    className="p-2 border rounded w-full text-black"
                />
                <button onClick={handleSearch} className="mt-2 p-2 bg-blue-500 text-white rounded w-full">
                    Search
                </button>
                <ul className="mt-4">
                    {searchedUsers && searchedUsers.length > 0 ? (
                        searchedUsers.map((user) => (
                            <li key={user.id} className="flex justify-between items-center">
                                <span className={"text-black"}>{user.username}</span>
                                <button
                                    onClick={() => onAddFriend(user.id.toString())}
                                    className="ml-2 p-2 bg-green-500 rounded"
                                >
                                    Add Friend
                                </button>
                            </li>
                        ))
                    ) : (
                        <p className="text-black">No users found</p>
                    )}
                </ul>
            </div>
        </div>
    );
}