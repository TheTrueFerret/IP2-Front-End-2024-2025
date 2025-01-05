import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentPlayerTurn } from "../services/playerService";
import { useGameId } from "./useGameId";
import { Player } from "../models/Player";


export function useCurrentPlayerTurn() {
  const queryClient = useQueryClient();
  const { getCachedGameId } = useGameId();

  const { isLoading, isError, data } = useQuery(
    {
      queryKey: ['currentPlayerTurn'],
      queryFn: () => {
        const gameId = getCachedGameId();
        if (!gameId) return Promise.resolve(null); // No gameId, return nothing
        return getCurrentPlayerTurn(gameId); // Fetch current player turn by gameID
      },
      initialData: null,
      refetchInterval: 4000, // Poll every 4 seconds
    }
  )

  const getCachedCurrentPlayerTurn = () => {
    return queryClient.getQueryData<Player>(['currentPlayerTurn']);
  };

  return {
    isLoading,
    isError,
    currentPlayerTurn: data,
    getCachedCurrentPlayerTurn
  }
}