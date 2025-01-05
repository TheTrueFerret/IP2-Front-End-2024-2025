import { useQuery } from "@tanstack/react-query";
import {getAchievements, getPlayerAchievements} from "../services/userService.ts";

export function usePlayerAchievements(userId: string | undefined) {
    const { isLoading, isError, data: achievements } = useQuery({
        queryKey: ['achievements', userId],
        queryFn: () => getPlayerAchievements(userId),
        enabled: !!userId,
    });
    return { isPlayerAchievementsLoading: isLoading, isPlayerAchievementsError: isError, playerAchievements: achievements };
}

export function useAchievements() {
    const { isLoading, isError, data: achievements } = useQuery({
        queryKey: ['achievements'],
        queryFn: () => getAchievements()
    });
    return { isLoading, isError, achievements };
}