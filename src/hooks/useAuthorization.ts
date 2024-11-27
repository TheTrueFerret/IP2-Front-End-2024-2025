import {useState} from "react";
import axios from "axios";

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
        console.log('postUser');
        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/gameuser/user', {
                id: id,
                username: username
            });
            console.log(response);
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