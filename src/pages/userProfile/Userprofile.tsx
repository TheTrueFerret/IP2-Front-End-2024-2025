import {useParams} from "react-router-dom";
import { UserAchievement} from "../../models/User.ts";
import useUsers from "../../hooks/useUsers.ts";

export function UserProfile() {
    const {userId} = useParams<{ userId: string }>();
    const user = useUsers(userId).user;

    if (!user) {
        return <h1>No user found</h1>;
    }

    return (
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-red-500">Rummikub</h1>
            </div>
            <div className="flex items-center mb-6">
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
            <div className="mb-6">
                {user.userAchievements == null || user.userAchievements.length === 0 ? (
                    <p className="text-gray-500">No achievements available</p>
                ) : (
                    <>
                        <h3 className="text-xl font-semibold">Achievements: {user.userAchievements.length}/{6}</h3>
                        <ul className="space-y-2">
                            {user.userAchievements.map((achievement: UserAchievement) => (
                                <li key={achievement.id} className="flex justify-between items-center">
                                    <span>{achievement.achievement.title}</span>
                                    {achievement.achievement.completed ? (
                                        <span className="text-green-500">✔</span>
                                    ) : (
                                        <span className="text-red-500">✘</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </>
                )
                }
            </div>

            <button className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Add
                friend
            </button>
        </div>
    );
}

export default UserProfile;
