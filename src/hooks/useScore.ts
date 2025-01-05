import { useQuery } from "@tanstack/react-query";
import { getScoreByPlayerId } from "../services/gameService";
import { usePlayerId } from "./usePlayerId";


export function useScore() {
  const { getCachedPlayerId } = usePlayerId();
  const playerId = getCachedPlayerId();

  const { isLoading, isError, data } = useQuery(
    {
      queryKey: ['score'],
      queryFn: () => {
        if (!playerId) return Promise.resolve(null); // No gameId, return nothing
        return getScoreByPlayerId(playerId); // Fetch player by gameId
      },
      enabled: !!playerId, // Only fetch if gameId is set
    }
  )

  return {
    isLoading,
    isError,
    score: data,
  };
}