import { postCreateGame } from "../services/gameService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export function useGameId() {
    const queryClient = useQueryClient();

    const { data: gameId } = useQuery({
        queryKey: ['gameId'],
        enabled: false, // Don't run automatically
        initialData: null, // Initial value
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
                console.log(response);
                return response; // Assuming this returns the game ID
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

    return {
        createGame,
        isLoading,
        isError,
        gameId,
        getCachedGameId
    }
}