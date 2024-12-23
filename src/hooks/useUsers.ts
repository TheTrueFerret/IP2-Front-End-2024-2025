import {useQuery, useQueryClient} from "@tanstack/react-query";
import {User} from "../models/User.ts";
import {
    acceptRequest,
    declineRequest,
    getFriendRequests,
    getUserById,
    getUserFriends,
    searchUserByName,
    sendFriendRequest
} from "../services/userService.ts";
import {useContext, useEffect, useState} from "react";
import SecurityContext from "../context/SecurityContext.ts";
import {Friend} from "../models/Friend.ts";
import {FriendRequest} from "../models/FriendRequest.ts";

interface UseUsersReturn {
    user: User | null;
    friends: Friend[] | [];
    searchedUsers: Friend[] | null;
    friendRequests: FriendRequest[] | [];
    searchUsers: (searchTerm: string) => void;
    isError: boolean;
    isLoading: boolean;
    friendRequest: (userName: string) => boolean;
    acceptFriendRequest: (friendRequestId: string) => void;
    rejectFriendRequest: (friendRequestId: string) => void;
}

const useUsers = (userId?: string): UseUsersReturn => {
    const {loggedUserId} = useContext(SecurityContext);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const queryClient = useQueryClient();

    // Fetch single user by ID if userId is provided
    const {data: user, isLoading: isLoadingUser, isError: isErrorUser} = useQuery<User>({
        queryKey: ['user', userId], // Skip query if no userId
        queryFn: () => getUserById(userId!),
        enabled: !!userId, // Only run this query if userId is provided
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        retry: 3, // Retry failed requests up to 3 times
    });

    const {data: friends, isLoading: isLoadingFriends, isError: isErrorFriends} = useQuery<Friend[]>({
        queryKey: ['users', userId], // Skip query if no userId
        queryFn: () => getUserFriends(userId!),
        enabled: !!userId, // Only run this query if userId is provided
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        retry: 3, // Retry failed requests up to 3 times
    });

    const {
        data: friendRequests,
        isLoading: isLoadingFriendRequests,
        isError: isErrorFriendRequests
    } = useQuery<FriendRequest[]>({
        queryKey: ['requests', userId], // Skip query if no userId
        queryFn: () => getFriendRequests(loggedUserId!),
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
    });

    const searchUsers = (term: string) => {
        setSearchTerm(term);
    };

    const friendRequest = (userName: string) => {
        if (loggedUserId && userName) {
            sendFriendRequest(loggedUserId, userName).catch((error) => {
                console.error('Failed to send friend request:', error);
                return false;
            }).finally(() => {
                return true;
            });
        }
        return false;
    }

    const acceptFriendRequest = (friendRequestId: string) => {
        acceptRequest(friendRequestId, loggedUserId!);
    }

    const rejectFriendRequest = (friendRequestId: string) => {
        declineRequest(friendRequestId, loggedUserId!);
    }

    return {
        acceptFriendRequest,
        rejectFriendRequest,
        user: user ?? null,
        searchedUsers: searchedUsers ?? null,
        friends: friends ?? [],
        searchUsers,
        isLoading: isLoadingUser || isLoadingFriends || isLoadingSearch || isLoadingFriendRequests,
        isError: isErrorUser || isErrorFriends || isErrorSearch || isErrorFriendRequests,
        friendRequest,
        friendRequests: friendRequests ?? []
    };
};

export default useUsers;
