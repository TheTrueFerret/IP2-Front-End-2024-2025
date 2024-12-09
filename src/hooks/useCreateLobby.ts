import {useContext, useState} from "react";
import {postCreateLobby} from "../services/lobbyService.ts";
import SecurityContext from "../context/SecurityContext.ts";

interface UseCreateLobbyReturn {
    isLoading: boolean;
    isError: boolean;
    createLobby: () => Promise<string>
}

export function useCreateLobby(): UseCreateLobbyReturn {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const {loggedUserId} = useContext(SecurityContext);

    const createLobby = async (): Promise<string> => {
        setIsLoading(true);
        setIsError(false);
        try {
            if (loggedUserId) {
                const joinCode = generateLobbyCode();
                console.log('Creating lobby with joinCode: ' + joinCode + ' and userId: ' + loggedUserId)
                const response = await postCreateLobby(joinCode, loggedUserId).then(
                    r => {
                        return r;
                    }).finally(() => {
                    setIsLoading(false);
                });
                console.log(response);
                return response;
            } else {
                console.error('Failed to create a lobby: User is not logged in');
                setIsError(true);
                return 'Failed to create a lobby: User is not logged in';
            }
        } catch (error) {
            console.error('Failed to create a lobby:', error);
            setIsError(true);
            return '';
        } finally {
            setIsLoading(false);
        }
    }

    function generateLobbyCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = 0; i < 5; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        const numbers = Math.floor(10000 + Math.random() * 90000);
        return `${result}-${Math.round(numbers).toString()}`;
    }

    return {
        isLoading: isLoading,
        isError: isError,
        createLobby
    }
}