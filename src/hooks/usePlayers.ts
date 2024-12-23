import { useQuery } from "@tanstack/react-query";
import { useGameId } from "./useGameId";
import { getPlayersByGameId } from "../services/playerService";



export function usePlayers() {
  const { getCachedGameId } = useGameId();
  const gameId = getCachedGameId();

  const { isLoading, isError, data } = useQuery(
    {
      queryKey: ['players'],
      queryFn: () => {
        if (!gameId) return Promise.resolve(null); // No gameId, return nothing
        return getPlayersByGameId(gameId); // Fetch player by gameId
      },
      enabled: !!gameId, // Only fetch if gameId is set
      retry: false,
    }
  )


  return {
    isLoading,
    isError,
    players: data,
  };
}