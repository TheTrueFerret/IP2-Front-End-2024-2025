import {useParams} from "react-router-dom";
import {UserAchievement} from "../../models/User.ts";
import {LoginButton} from "../../components/loginButton/LoginButton.tsx";
import useUsers from "../../hooks/useUsers.ts";

export function UserProfile() {
    const {userId} = useParams<{ userId: string }>();
    const user = useUsers(userId).user;


    if (!user) {
        return <h1>No user found</h1>;
    }
    if (!userId) {
        return <h1>No user found</h1>;
    }


    return (
        <div className="flex items-center justify-center min-h-screen ">
            <LoginButton/>
            <div className="bg-gray-500 z-50 p-1 rounded-lg">
                <main className="bg-gray-900 text-white p-10 rounded-lg shadow-2xl max-w-3xl w-full z-50 opacity-100">
                    {/* Profile Section */}
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

                    {/* Achievements Section */}
                    <div className="mt-8">
                        {user.userAchievements == null || user.userAchievements.length === 0 ? (
                            <p className="text-gray-500 text-center">No achievements available</p>
                        ) : (
                            <>
                                <h3 className="text-2xl font-semibold mb-4 text-center">
                                    Achievements: {user.userAchievements.length}/6
                                </h3>
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
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default UserProfile;
