import useUsers from "../../hooks/useUsers.ts";
import {useContext} from "react";
import SecurityContext from "../../context/SecurityContext.ts";

export function UserProfileCard({userId, close, add}: { userId: string, close: () => void, add: () => void }) {
    const {user, isFriend} = useUsers(userId);
    const {loggedUserId} = useContext(SecurityContext);


    if (!user) {
        return <h1>No user found</h1>;
    }
    if (!userId || !loggedUserId) {
        return <h1>No userId found</h1>;
    }

    const handleClose = () => {
        close();
    };

    const handleAddFriend = () => {
        add();
        close();
    };

    return (
        <div className="flex flex-row items-start gap-8 bg-gray-500 rounded-lg">
            <div className="w-32 h-32 rounded-full overflow-hidden">
                <img
                    src={`../../../../public/${user.avatar}`}
                    alt="Profile Avatar"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-1">
                <h2 className="text-3xl font-bold">{user.username}</h2>
                <p className="text-lg mt-2">Wins: {user.gamesWon} 🏆</p>
                <p className="text-lg">Games Played: {user.gamesPlayed}</p>
            </div>
            <div className="flex flex-col items-center justify-between h-full">
                <button
                    onClick={handleClose}
                    className="mt-2 p-2 bg-red-500 text-white rounded-xl"
                >
                    Close
                </button>
                {isFriend ? (
                    <button
                        onClick={handleAddFriend}
                        className="mt-2 p-2 bg-red-500 text-white rounded-xl"
                    >
                        Remove Friend
                    </button>
                ) : (
                    <button
                        onClick={handleAddFriend}
                        className="mt-2 p-2 bg-green-500 text-white rounded-xl"
                    >
                    Add Friend
                    </button>
                )}
            </div>
        </div>
    )
        ;
}

export default UserProfileCard;