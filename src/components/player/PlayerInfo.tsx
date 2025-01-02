import useUsers from "../../hooks/useUsers.ts";
import SecurityContext from "../../context/SecurityContext.ts";
import {useContext} from "react";

export function PlayerInfo({userId}:{ userId: string}) {
    const {user,isFriend,friendRequest,removeFriend} = useUsers(userId);
    const {loggedUserId} = useContext(SecurityContext);
    if (!user) {
        return <h1>No user found</h1>;
    }

    const handleAddFriend = () => {
        friendRequest(user.username);
    }

    const handleRemoveFriend = () => {
        removeFriend(user.id.toString());
    }

    return (
        <div className="flex flex-row items-start gap-8">
            <div className="w-32 h-32 rounded-full overflow-hidden">
                <img
                    src={`../../../../public/${user.avatar}`}
                    alt="Profile Avatar"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-1">
                <h2 className="text-3xl font-bold">{user.username}</h2>
                {/*Add wins and games played to the DTO in backend.*/}
                <p className="text-lg mt-2">Wins: {user.gamesWon} 🏆</p>
                <p className="text-lg">Games Played: {user.gamesPlayed}</p>
                {userId === loggedUserId ? (
                    <p> You cannot add yourself as a friend! </p>
                ) : isFriend ? (
                    <button
                        className="mt-4 py-2 px-6 bg-red-500 text-white rounded-lg hover:bg-green-600 transition"
                        onClick={handleRemoveFriend}
                    >
                        Remove Friend
                    </button>
                ) : (
                    <>
                        <button
                            className="mt-4 py-2 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                            onClick={handleAddFriend}
                        >
                        Add Friend
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}