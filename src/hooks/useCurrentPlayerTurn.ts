import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentPlayerTurn } from "../services/playerService";
import { useGameId } from "./useGameId";
import { Player } from "../models/Player";
import { useNavigate } from "react-router-dom";


export function useCurrentPlayerTurn() {
  const queryClient = useQueryClient();
  const { getCachedGameId } = useGameId();
  const navigate = useNavigate();

  const { isLoading, isError, data } = useQuery(
    {
      queryKey: ['currentPlayerTurn'],
      queryFn: async () => {
        const gameId = getCachedGameId();
        if (!gameId) return Promise.resolve(null);

        try {
          return await getCurrentPlayerTurn(gameId);
        } catch (error) {
          if (error instanceof Error && error.message === 'GAME_ENDED') {
            // Navigate to game over page
            navigate(`/game-over`);
            return null;
          }
          throw error;
        }
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