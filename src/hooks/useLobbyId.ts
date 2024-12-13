import { useContext } from "react";
import { postCreateLobby } from "../services/lobbyService.ts";
import SecurityContext from "../context/SecurityContext.ts";
import { Lobby } from "../models/Lobby.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export function useLobbyId() {
    const queryClient = useQueryClient();
    const { loggedUserId } = useContext(SecurityContext);

    // Function to generate lobby code (kept from original implementation)
    function generateLobbyCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = 0; i < 5; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        const numbers = Math.floor(10000 + Math.random() * 90000);
        return `${result}-${Math.round(numbers).toString()}`;
    }

    // Query to cache the lobby
    const { data: lobbyId } = useQuery({
        queryKey: ['lobbyId'],
        enabled: false, // Don't run automatically
        initialData: null, // Initial value
    });


    const {
        mutate: createLobby,
        isPending: isLoading,
        isError,
    } = useMutation({
        mutationFn: async () => {
            if (!loggedUserId) {
                console.error('Failed to create a lobby: User is not logged in');
                throw new Error('User not logged in');
            }

            const joinCode = generateLobbyCode();
            console.log(`Creating lobby with joinCode: ${joinCode} and userId: ${loggedUserId}`);

            const response = await postCreateLobby(joinCode, loggedUserId);
            console.log(response);

            return response;
        },
        onSuccess: (newLobby) => {
            queryClient.setQueryData(['lobby'], newLobby);
        },
        onError: (error) => {
            console.error('Failed to create a lobby:', error);
        }
    });

    // Helper function to get the cached lobby
    const getCachedLobby = () => {
        return queryClient.getQueryData<Lobby>(['lobby']);
    };

    return {
        createLobby,
        isLoading,
        isError,
        lobbyId,
        getCachedLobby
    }
}