import {useParams} from "react-router-dom";
import {getUserById} from "../../services/userService.ts";
import {useEffect, useState} from "react";
import {User} from "../../models/User.ts";


export function Userprofile() {
    const { userId } = useParams<{ userId: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    console.log("Userprofile.tsx: userId: " + userId)


    useEffect(() => {
        console.log("Userprofile.tsx: useEffect")
        const fetchUser = async () => {
            if (userId) {
                try {
                    const fetchedUser = await getUserById(userId);
                    setUser(fetchedUser);
                } catch (err) {
                    setError('Error fetching user: ');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchUser();
    }, [userId]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    if (!user) {
        return <h1>No user found</h1>;
    }

    console.log(user)

//TODO: Wins and games played from backend.
    return (
        <div
            className="flex flex-col items-center p-5 border-2 border-white rounded-lg bg-gray-800 text-white max-w-xs">
            {/* Avatar Section */}
            <div
                className="w-24 h-24 rounded-full bg-gray-300 mb-5"
            ><img src="../../../public/default.png" alt="" className={"w-24 h-24 rounded-full bg-gray-300 mb-5"}/></div>

            {/* Profile Info */}
            <h2 className="text-lg font-bold">Profile:</h2>
            <p>Name: {user.username}</p>
            <p>Wins: {} 🏆</p>
            <p>Games Played: {}</p>

            {/* Achievements */}
            {user.userAchievements == null  && <h3 className="text-md font-semibold mt-4">No achievements found</h3>}
            <h3 className="text-md font-semibold mt-4">TODO: Achievements: {}/{}</h3>

            {/* Add Friend Button */}
            <button
                className="mt-5 px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-400"
                onClick={() => alert("Add friend functionality coming soon!")}
            >
                Add Friend
            </button>
        </div>
    )
}