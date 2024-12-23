import {useQuery, useQueryClient} from "@tanstack/react-query";
import {User} from "../models/User.ts";
import {getUserById, getUserFriends, searchUserByName} from "../services/userService.ts";
import {useContext, useEffect, useState} from "react";
import SecurityContext from "../context/SecurityContext.ts";
import {Friend} from "../models/Friend.ts";

interface UseUsersReturn {
    user: User | null;
    friends: Friend[] | null;
    searchedUsers: Friend[] | null;
    searchUsers: (searchTerm: string) => void;
    isError: boolean;
    isLoading: boolean;
}

const useUsers = (userId?: string): UseUsersReturn => {
    const {loggedUserId} = useContext(SecurityContext);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const queryClient = useQueryClient();

    // Fetch single user by ID if userId is provided
    const {data: user, isLoading: isLoadingUser, isError: isErrorUser} = useQuery<User>({
        queryKey: userId ? ['user', userId] : ['user', 'placeholder'], // Skip query if no userId
        queryFn: () => getUserById(userId!),
        enabled: !!userId, // Only run this query if userId is provided
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        retry: 3, // Retry failed requests up to 3 times
    });

    const {data: friends, isLoading: isLoadingFriends, isError: isErrorFriends} = useQuery<Friend[]>({
        queryKey: userId ? ['users', userId] : ['user', 'placeholder'], // Skip query if no userId
        queryFn: () => getUserFriends(userId!),
        enabled: !!userId, // Only run this query if userId is provided
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        retry: 3, // Retry failed requests up to 3 times
    });

    //Get searched users if search term is provided and or changed
    useEffect(() => {
        if (searchTerm) {
            queryClient.invalidateQueries({queryKey: ['search', searchTerm]});
        }
    }, [searchTerm, queryClient]);

    const {data: searchedUsers, isLoading: isLoadingSearch, isError: isErrorSearch} = useQuery<Friend[]>({
        queryKey: searchTerm ? ['search', searchTerm] : ['search', 'placeholder'],
        queryFn: () => searchUserByName(searchTerm!, loggedUserId!),
        enabled: !!searchTerm,
        staleTime: 5 * 60 * 1000,
        retry: 3,
        select: (data) => data,
    });

    const searchUsers = (term: string) => {
        setSearchTerm(term);
    };

    return {
        user: user ?? null,
        searchedUsers: searchedUsers ?? null,
        friends: friends ?? null,
        searchUsers,
        isLoading: isLoadingUser || isLoadingFriends || isLoadingSearch,
        isError: isErrorUser || isErrorFriends || isErrorSearch,
    };
};

export default useUsers;
