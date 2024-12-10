import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLobbyLocally } from "../services/lobbyService";

export function useLobby() {
  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQuery(
    {
      queryKey: ['lobby'],
      // here a Game gets called by the LobbyId
      queryFn: () => getLobbyLocally("d276d5f9-4bca-44ed-b4da-9e3000000011"),
    }
  )

  const {
    mutate: mutateGetLobby,
    isPending: isGettingLobby,
    isError: isErrorGettingLobby,
  } = useMutation({
    mutationFn: async (lobbyId: string) => {
      return await getLobbyLocally(lobbyId);
    },
    onSuccess: (newLobby) => {
      queryClient.setQueryData(['lobby'], newLobby);
    },
  });


  return {
    isLoadingLobby: isLoading,
    isErrorLobby: isError,
    lobby: data,
    getLobby: mutateGetLobby,
    isGettingLobby,
    isErrorGettingLobby,
  }
}


