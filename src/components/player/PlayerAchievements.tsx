import {UserAchievement} from "../../models/User.ts";


export function PlayerAchievements({Achievements}: { Achievements: UserAchievement[] }) {
    //TODO: add Right amount of achievements when completed
    return (
        <div className="mt-8">
            {Achievements == null || Achievements.length === 0 ? (
                <p className="text-gray-500 text-center">No achievements available</p>
            ) : (
                <>
                    <h3 className="text-2xl font-semibold mb-4 text-center">
                        Achievements: {Achievements.length}/6
                    </h3>
                    <ul className="space-y-2">
                        {Achievements.map((achievement: UserAchievement) => (
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
    );
}