import { useQuery } from "@tanstack/react-query";
import { getCurrentPlayerTurn } from "../services/playerService";
import { useGameId } from "./useGameId";


export function useCurrentPlayerTurn() {

  const { gameId } = useGameId();

  const { isLoading, isError, data } = useQuery(
    {
      queryKey: ['currentPlayerTurn'],
      queryFn: () => {
        if (!gameId) return Promise.resolve(null); // No gameId, return nothing
        return getCurrentPlayerTurn(gameId); // Fetch current player turn by gameID
      },
      initialData: null,
      refetchInterval: 5000, // Poll every 4 seconds
    }
  )


  return {
    isLoading,
    isError,
    currentPlayerTurn: data
  }

}