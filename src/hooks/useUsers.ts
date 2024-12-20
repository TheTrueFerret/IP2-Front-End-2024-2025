import {useQuery} from "@tanstack/react-query";
import {User} from "../models/User.ts";
import {getUserById, getUserFriends, searchUserByName} from "../services/userService.ts";
import {useState} from "react";

interface UseUsersReturn {
    user: User | null;
    friends: User[] | null;
    searchedUsers: User[] | null;
    searchUsers: (searchTerm: string) => void;
    isError: boolean;
    isLoading: boolean;
}

const useUsers = (userId?: string): UseUsersReturn => {
    const [searchedUsers, setSearchedUsers] = useState<User[] | null>(null);
    // Fetch single user by ID if userId is provided
    const {data: user, isLoading: isLoadingUser, isError: isErrorUser} = useQuery<User>({
        queryKey: userId ? ['user', userId] : ['user', 'placeholder'], // Skip query if no userId
        queryFn: () => getUserById(userId!),
        enabled: !!userId, // Only run this query if userId is provided
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        retry: 3, // Retry failed requests up to 3 times
    });

    const {data: friends, isLoading: isLoadingFriends, isError: isErrorFriends} = useQuery<User[]>({
        queryKey: userId ? ['user', userId] : ['user', 'placeholder'], // Skip query if no userId
        queryFn: () => getUserFriends(userId!),
        enabled: !!userId, // Only run this query if userId is provided
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        retry: 3, // Retry failed requests up to 3 times
    });

    function searchUsers(searchTerm: string) {

    }

    //TODO
    return {
        user: user ?? null,
        searchedUsers: searchedUsers ?? null,
        friends: friends ?? null,
        searchUsers,
        isLoading: isLoadingUser || isLoadingFriends,
        isError: isErrorUser || isErrorFriends,
    };
};

export default useUsers;
