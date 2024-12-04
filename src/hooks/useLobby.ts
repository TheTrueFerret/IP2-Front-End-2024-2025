import {useState} from "react";
import {postCreateGame} from "../services/lobbyService.ts";

interface UseLobbyReturn {
    isLoading: boolean;
    isError: boolean;
    createGame: (lobbyId: string, roundTime: number, startTileAmount: number) => Promise<string>
}

export function useLobby(): UseLobbyReturn {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);


    const createGame = async (lobbyId: string, roundTime: number, startTileAmount: number): Promise<string> => {
        setIsLoading(true);
        setIsError(false);
        try {
            const response = await postCreateGame(lobbyId, roundTime, startTileAmount).then(
                r => {
                    return r;
                }).finally(() => {
                setIsLoading(false);
            });
            console.log(response);
            return response;
        } catch (error) {
            console.error('Failed to create a game:', error);
            setIsError(true);
            return '';
        } finally {
            setIsLoading(false);
        }
    }

    return {
        isLoading: isLoading,
        isError: isError,
        createGame
    }
}