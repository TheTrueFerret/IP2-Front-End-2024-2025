import {useState} from "react";
import { postingUser } from "../services/authService";

interface UseAuthorizationReturn {
    postUser: (id: string, username: string) => void
    isLoading: boolean;
    isError: boolean;
}

export function useAuthorization(): UseAuthorizationReturn {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const postUser = async (id: string, username: string) => {
        setIsLoading(true);
        setIsError(false);
        try {
            console.log('Posting user');
            await postingUser(id, username);
        } catch (error) {
            console.error('Failed to post user:', error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        postUser,
        isLoading,
        isError
    }
}

export default useAuthorization