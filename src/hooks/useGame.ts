import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getGameLocally } from "../services/gameService";

export function useGame() {
  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQuery(
    {
      queryKey: ['game'],
      // here a Game gets called by the GameId
      queryFn: () => getGameLocally("d276d5f9-4bca-44ed-b4da-9e3000000011"),
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


