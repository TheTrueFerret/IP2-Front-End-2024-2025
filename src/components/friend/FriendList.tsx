import {User} from "../../models/User.ts";
import {useState} from "react";
import {FriendSearch} from "./FriendSearch.tsx";


export function FriendList({users}: { users: User[] | null }) {
    const [addFriendOpened, setAddFriendOpened] = useState(false)

    function addFriend() {
        setAddFriendOpened(true)
    }

    function onAddFriend(userId: string) {
        //TODO: Implement this function to call backend with id
    }

    return (
        <div className="mt-8">
            {addFriendOpened && (<FriendSearch onAddFriend={} onClose={() => setAddFriendOpened(false)}></FriendSearch>)}
            {users == null || users.length === 0 ? (
                <>
                    <p className="text-gray-500 text-center">No friends available</p>
                    <button onClick={addFriend}>Add Friend</button>
                </>
            ) : (
                <>
                    <h3 className="text-2xl font-semibold mb-4 text-center">
                        Friends: {users.length}
                    </h3>
                    <ul className="space-y-2">
                        {users.map((user: User) => (
                            <li key={user.id} className="flex justify-between items-center">
                                <span>{user.username}</span>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}