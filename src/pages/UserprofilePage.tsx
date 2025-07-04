import {useParams, useNavigate} from "react-router-dom";
import {LoginButton} from "../components/LoginButton";
import {PlayerAchievements} from "../components/player/PlayerAchievements";
import {PlayerInfo} from "../components/player/PlayerInfo";
import useUsers from "../hooks/useUsers";
import { BackButton } from "../components/BackButton";

export function UserprofilePage() {
    const {userId} = useParams<{ userId: string }>();
    const {user} = useUsers(userId);
    const navigate = useNavigate();

    if (!user) {
        return <h1>No user found</h1>;
    }
    if (!userId) {
        return <h1>No user found</h1>;
    }


    return (
        <div className="flex items-center justify-center min-h-screen ">
            <BackButton backAction={() => navigate('/')}/>
            <div className='z-20 absolute top-2 right-2'>
                <LoginButton/>
            </div>
            <div className="bg-gray-500 z-50 p-1 rounded-lg">
                <main className="bg-gray-900 text-white p-10 rounded-lg shadow-2xl max-w-3xl w-full z-50 opacity-100">
                    {/* Profile Section */}
                    <PlayerInfo userId={userId}/>

                    {/* Achievements Section */}
                    <PlayerAchievements Achievements={user.userAchievements}/>
                </main>
            </div>
        </div>
    );
}

export default UserprofilePage;
