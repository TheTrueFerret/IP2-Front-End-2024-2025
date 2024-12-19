import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLobby, postExitLobby } from "../services/lobbyService";
import { Lobby } from "../models/Lobby";
import { useLobbyId } from "./useLobbyId";

export function useLobby() {
  const queryClient = useQueryClient();
  
  const { lobbyId } = useLobbyId();

  const { isLoading, isError, data } = useQuery(
    {
      queryKey: ['lobby'],
      queryFn: () => {
        if (!lobbyId) return Promise.resolve(null); // No lobby ID, return nothing
        return getLobby(lobbyId); // Fetch lobby by ID
      },
      enabled: !!lobbyId, // Only fetch if lobbyId is set
      refetchInterval: 4000, // Poll every 4 seconds
    }
  )

  const {
    mutate: mutateGetLobby,
    isPending: isGettingLobby,
    isError: isErrorGettingLobby,
  } = useMutation({
    mutationFn: async (lobbyId: string) => {
      return await getLobby(lobbyId);
    },
    onSuccess: (newLobby) => {
      queryClient.setQueryData(['lobby'], newLobby);
    },
  });

  const {
    mutate: mutateSetLobby,
    isPending: isSettingLobby,
    isError: isErrorSettingLobby,
  } = useMutation({
    mutationFn: async (lobby: Lobby) => {
      return lobby;
    },
    onSuccess: (newLobby) => {
      queryClient.setQueryData(['lobby'], newLobby);
    },
  });



  const {
    mutate: mutateExitLobby,
    isPending: isExitingLobby,
    isError: isErrorExitingLobby,
  } = useMutation({
    mutationFn: async ({ lobbyId, userId }: {lobbyId: string, userId: string}) => {
      return postExitLobby(lobbyId, userId);
    },
    onSuccess: (newLobby) => {
      queryClient.setQueryData(['lobby'], newLobby);
    },
  });

  return {
    lobbyId,
    isLoadingLobby: isLoading,
    isErrorLobby: isError,
    lobby: data,
    getLobby: mutateGetLobby,
    isGettingLobby,
    isErrorGettingLobby,
    setLobby: mutateSetLobby,
    isSettingLobby,
    isErrorSettingLobby,
    exitLobby: mutateExitLobby,
    isExitingLobby,
    isErrorExitingLobby
  }
}


