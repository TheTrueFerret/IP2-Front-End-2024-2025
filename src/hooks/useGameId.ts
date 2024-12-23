import { getGameIdByLobbyId, postCreateGame } from "../services/gameService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLobbyId } from "./useLobbyId";
import { useContext } from "react";
import SecurityContext from "../context/SecurityContext";


export function useGameId() {
    const queryClient = useQueryClient();

    const { lobbyId } = useLobbyId();
    const { loggedUserId } = useContext(SecurityContext)

    const { data: gameId, isSuccess } = useQuery({
        queryKey: ['gameId'],
        queryFn: () => {
            if (!lobbyId || !loggedUserId) return Promise.resolve(null); // No lobby Id or userId, return nothing
            return getGameIdByLobbyId(lobbyId, loggedUserId); // Fetch gameID
        },
        enabled: !!lobbyId, // Only fetch if lobbyId is set
        initialData: null, // Initial value
        refetchInterval: (data) => {
            // If we have a gameId, stop polling by returning false/null
            // Otherwise continue polling every 4 seconds
            return data ? false : 4000;
        },
    });

    const {
        mutate: createGame,
        isPending: isLoading,
        isError,
    } = useMutation({
        mutationFn: async (params: {
            lobbyId: string;
            roundTime: number;
            startTileAmount: number;
            loggedInUserId: string;
        }) => {
            try {
                const response = await postCreateGame(
                    params.lobbyId,
                    params.roundTime,
                    params.startTileAmount,
                    params.loggedInUserId
                );

                if (response) {
                    console.log(response.gameId);
                    return response.gameId;
                }
            } catch (error) {
                console.error('Failed to create a game:', error);
                throw error;
            }
        },
        onSuccess: (newGameId) => {
            // Cache the game ID using setQueryData
            queryClient.setQueryData(['gameId'], newGameId);
        }
    });

    // Helper function to get the cached game ID
    const getCachedGameId = () => {
        return queryClient.getQueryData<string>(['gameId']);
    };


    const clearGameId = () => {
        queryClient.setQueryData(['gameId'], null);
    };

    return {
        createGame,
        isLoading,
        isError,
        gameId,
        isSuccess,
        getCachedGameId,
        clearGameId
    }
}