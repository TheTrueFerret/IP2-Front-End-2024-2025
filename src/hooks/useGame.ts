import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getGameLocally } from "../services/gameService";
import { getFieldTilesLocaly } from "../services/dataService";

export function useGame() {
  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQuery(
    {
      queryKey: ['game'],
      // here a Game gets called by the GameId
      queryFn: () => getFieldTilesLocaly(),
      initialData: null, // Initial value
      refetchInterval: 4000, // Poll every 4 seconds
    }
  )

  const {
    mutate: mutateGetGame,
    isPending: isGettingGame,
    isError: isErrorGettingGame,
  } = useMutation({
    mutationFn: async (playerId: string) => {
      return await getGameLocally(playerId);
    },
    onSuccess: (newGame) => {
      queryClient.setQueryData(['game'], newGame);
    },
  });

  
  return {
    isLoadingGame: isLoading,
    isErrorGame: isError,
    game: data,
    getGame: mutateGetGame,
    isGettingGame,
    isErrorGettingGame,
  }
}


