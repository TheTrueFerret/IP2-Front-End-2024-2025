import useUsers from "../../hooks/useUsers.ts";

export function UserProfileCard({userId}: { userId: string }) {
    const user = useUsers(userId).user;


    if (!user) {
        return <h1>No user found</h1>;
    }
    if (!userId) {
        return <h1>No userId found</h1>;
    }


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
        </div>
    );
}

export default UserProfileCard;