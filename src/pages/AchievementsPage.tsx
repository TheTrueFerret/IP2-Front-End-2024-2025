import {NotificationCard} from "../components/notifications/notificationCard/NotificationCard";
import {useAchievements, usePlayerAchievements} from "../hooks/useAchievements";
import {Achievement} from "../models/Achievement.ts";
import SecurityContext from "../context/SecurityContext.ts";
import {useContext} from "react";
import {BackButton} from "../components/BackButton.tsx";
import {LoginButton} from "../components/loginButton/LoginButton.tsx";
import {useNavigate} from "react-router-dom";

export function AchievementsPage() {
    const {loggedUserId} = useContext(SecurityContext);
    const {
        isPlayerAchievementsLoading,
        isPlayerAchievementsError,
        playerAchievements
    } = usePlayerAchievements(loggedUserId);
    const {isLoading, isError, achievements} = useAchievements();
    const navigate = useNavigate();

    if (isPlayerAchievementsLoading || !playerAchievements || isLoading || !achievements) {
        return <NotificationCard loading={isPlayerAchievementsLoading}/>
    }

    if (isPlayerAchievementsError || isError) {
        return (
            <div className="text-center mt-8 text-red-500">
                <p className="text-lg">Failed to load achievements. Please try again later.</p>
            </div>
        );
    }

    // Maak een Set van de behaalde achievement titels voor snelle vergelijking
    const achievedTitles = new Set(playerAchievements.map((ach) => ach.title));

    // Filter de globale achievements die nog niet behaald zijn
    const notAchieved = achievements.filter((ach) => !achievedTitles.has(ach.title));

    return (
        <div className="p-8">
            <BackButton backAction={() => navigate('/')}/>
            <div className='z-20 absolute top-2 right-2'>
                <LoginButton/>
            </div>

            <main className="z-10 flex-grow justify-center items-center p-20 gap-x-20">
                <div className="flex flex-col space-y-20 min-w-fit relative text-white bg-neutral-900/60 backdrop-blur p-20 rounded-3xl shadow-md w-2/5">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
                        {playerAchievements.map((achievement: Achievement, index: number) => (
                            <div key={index} className="bg-green-100 shadow-md rounded-lg p-6">
                                <h2 className="text-xl font-semibold">{achievement.title}</h2>
                                <p className="text-gray-600 mt-2">{achievement.description}</p>
                                <p className="text-gray-400 text-sm mt-4">
                                    Achieved on: {new Date(achievement.dateAchieved).toLocaleDateString()}
                                </p>
                                <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded mt-2">
                            Achieved
                        </span>
                            </div>
                        ))}
                        {notAchieved.map((achievement: Achievement, index: number) => (
                            <div key={index} className="bg-white shadow-md rounded-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-700">{achievement.title}</h2>
                                <p className="text-gray-600 mt-2">{achievement.description}</p>
                                <p className="text-gray-400 text-sm mt-4">Not achieved yet</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
