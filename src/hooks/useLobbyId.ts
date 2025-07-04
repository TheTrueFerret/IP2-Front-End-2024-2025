import { useContext } from "react";
import {findLobbyForPlayer, patchJoinLobby, postCreateLobby} from "../services/lobbyService.ts";
import SecurityContext from "../context/SecurityContext.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {Lobby} from "../models/Lobby.ts";


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
        isPending: isCreatingLobby,
        isError: isErrorCreatingLobby,
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

            if (response)
            return response.id;

        },
        onSuccess: (newLobbyId) => {
            queryClient.setQueryData(['lobbyId'], newLobbyId);
        },
        onError: (error) => {
            console.error('Failed to create a lobby:', error);
        }
    });


    const {
        mutate: joinLobbyByCode,
        isPending: isJoiningLobbyByCode,
        isError: isErrorJoiningLobbyByCode,
    } = useMutation({
        mutationFn: async (joinCode: string) => {
            if (!loggedUserId) {
                console.error('Failed to create a lobby: User is not logged in');
                throw new Error('User not logged in');
            }

            const response = await patchJoinLobby(joinCode, loggedUserId);
            console.log(response);

            if (response)
            return response.id;
        },
        onSuccess: (newLobbyId) => {
            queryClient.setQueryData(['lobbyId'], newLobbyId);
        },
        onError: (error) => {
            console.error('Failed to create a lobby:', error);
        }
    });

    const {
        mutate: joinOpenLobby,
        isPending: isJoiningOpenLobby,
        isError: isErrorJoiningOpenLobby,
        data: findingLobbyResponse,
        error: errorJoiningOpenLobby,
    } = useMutation<Lobby | string>({
        mutationFn: async () => {
            if (!loggedUserId) {
                throw new Error("User is not logged in");
            }

            const response = await findLobbyForPlayer(loggedUserId);
            console.log(response);

            if (typeof response === "string") {
                throw new Error(response); // Treat the string as an error
            }

            queryClient.setQueryData(["lobbyId"], response.id); // Cache the lobby ID
            return response; // Valid Lobby object
        },
    });



    return {
        lobbyId,
        createLobby,
        isCreatingLobby,
        isErrorCreatingLobby,
        joinLobbyByCode,
        isJoiningLobbyByCode,
        isErrorJoiningLobbyByCode,
        joinOpenLobby,
        isJoiningOpenLobby,
        isErrorJoiningOpenLobby,
        errorJoiningOpenLobby,
        findingLobbyResponse
    }
}