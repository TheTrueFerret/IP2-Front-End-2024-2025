import { useQuery } from "@tanstack/react-query";
import { getLeaderboard } from "../services/gameService";
import { useGameId } from "./useGameId";



export function useLeaderboard() {
    const { getCachedGameId } = useGameId();
    const gameId = getCachedGameId();


    const { isLoading, isError, data } = useQuery({
        queryKey: ['leaderboard'],
        queryFn: () => {
            if (!gameId) return Promise.resolve(null); // No lobby Id or userId, return nothing
            return getLeaderboard(gameId); // Fetch gameID
        },
        enabled: !!gameId, // Only fetch if lobbyId is set
        initialData: null, // Initial value
        refetchInterval: 3000, // Refetch every 4 seconds
    });

    return {
        isLoadingLeaderboard: isLoading,
        isErrorLeaderboard: isError,
        leaderboard: data,
    }
}