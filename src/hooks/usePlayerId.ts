import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPlayerIdLocally } from "../services/playerService";



// This will save the PlayerId from the Active User
export function usePlayerId() {
  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQuery(
    {
      queryKey: ['playerId'],
      queryFn: () => getPlayerIdLocally("d276d5f9-4bca-44ed-b4da-9e3000000011"),
    }
  )

  const {
    mutate: mutateGetPlayerId,
    isPending: isGettingPlayerId,
    isError: isErrorGettingPlayerId,
  } = useMutation({
    mutationFn: async (userId: string) => {
      return await getPlayerIdLocally(userId);
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