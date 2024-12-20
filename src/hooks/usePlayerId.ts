import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPlayerIdByUserId, } from "../services/playerService";
import { useContext } from "react";
import SecurityContext from "../context/SecurityContext";



// This will save the PlayerId from the Active User
export function usePlayerId() {
  const queryClient = useQueryClient();

  const { loggedUserId } = useContext(SecurityContext)

  const { isLoading, isError, data } = useQuery(
    {
      queryKey: ['playerId'],
      queryFn: () => {
        if (!loggedUserId) return Promise.resolve(null); // No user ID, return nothing
        return getPlayerIdByUserId(loggedUserId); // Fetch player by ID
      },
      enabled: !!loggedUserId, // Only fetch if lobbyId is set
      retry: false,
    }
  )

  const {
    mutate: mutateGetPlayerId,
    isPending: isGettingPlayerId,
    isError: isErrorGettingPlayerId,
  } = useMutation({
    mutationFn: async (userId: string) => {
      return await getPlayerIdByUserId(userId);
    },
    onSuccess: (newPlayerId) => {
      queryClient.setQueryData(['playerId'], newPlayerId);
    },
  });

  return {
    isLoadingPlayerId: isLoading,
    isErrorPlayerId: isError,
    playerId: data,
    getPlayerId: mutateGetPlayerId,
    isGettingPlayerId,
    isErrorGettingPlayerId
  }
}