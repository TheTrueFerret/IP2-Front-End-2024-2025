import { useQuery } from "@tanstack/react-query";
import { usePlayerId } from "./usePlayerId";
import { getTimeByPlayerId } from "../services/playerService";
import { useCurrentPlayerTurn } from "./useCurrentPlayerTurn";



export function useTime() {
  const { getCachedPlayerId } = usePlayerId();
  const { getCachedCurrentPlayerTurn } = useCurrentPlayerTurn();
  const playerId = getCachedPlayerId();
  const currentPlayerTurn = getCachedCurrentPlayerTurn();
  const isPlayerTurn = currentPlayerTurn?.id === playerId;

  const { isLoading, isError, data } = useQuery(
    {
      queryKey: ['time'],
      queryFn: () => {
        if (!playerId) return Promise.resolve(null); // No user ID, return nothing
        return getTimeByPlayerId(playerId); // Fetch player by ID
      },
      enabled: !!playerId && isPlayerTurn, // Only fetch if lobbyId is set
      retry: false, // Don't retry on error
    }
  )

  return {
    isLoadingTime: isLoading,
    isErrorTime: isError,
    initialTime: data,
  }
}