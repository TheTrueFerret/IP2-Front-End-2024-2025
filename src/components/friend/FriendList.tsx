import {useState} from "react";
import {FriendSearch} from "./FriendSearch.tsx";
import {Friend} from "../../models/Friend.ts";

export function FriendList({users}: { users: Friend[] | null }) {
    const [addFriendOpened, setAddFriendOpened] = useState(false);

    function addFriend() {
        setAddFriendOpened(true);
    }

    function onAddFriend(userId: string) {
        console.log(userId);
        // TODO: Implement this function to call backend with id
    }

    function onRemoveFriend(userId: string) {
        // TODO: Implement this function to call backend with id
    }

    return (
        <div className="mt-8">
            {addFriendOpened && (
                <FriendSearch onAddFriend={onAddFriend} onClose={() => setAddFriendOpened(false)}/>
            )}
            {/* */}
            {users == null || users.length === 0 ? (
                <>
                    <p className="text-gray-500 text-center">No friends available</p>
                    <button onClick={addFriend} className={"ml-2 p-2 bg-green-400 text-white rounded"}>Search Friend
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