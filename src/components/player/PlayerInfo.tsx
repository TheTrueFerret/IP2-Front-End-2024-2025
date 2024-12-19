import {User} from "../../models/User.ts";


export function PlayerInfo({user,userId}:{user: User, userId: string}) {
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
                {/*TODO: When already friend remove friend button. Add Friend Button REPLACE TRUE WHEN WITH THE FIX */}
                {userId === user.id.toString() && true ? (
                    <p> You cannot add yourself as a friend! </p>
                ) : (
                    <>
                        <button
                            className="mt-4 py-2 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                        >
                            Add Friend
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}