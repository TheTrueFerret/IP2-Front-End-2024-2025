import { useQuery } from "@tanstack/react-query";
import { User } from "../models/User.ts";
import { getUserById, getAllUsers } from "../services/userService.ts";

interface UseUsersReturn {
    user: User | null;
    allUsers: User[] | null;
    isLoadingUser: boolean;
    isLoadingAllUsers: boolean;
    isError: boolean;
}

const useUsers = (userId?: string): UseUsersReturn => {
    // Fetch single user by ID if userId is provided
    const { data: user, isLoading: isLoadingUser, isError: isErrorUser } = useQuery<User>({
        queryKey: userId ? ['user', userId] : ['user', 'placeholder'], // Skip query if no userId
        queryFn: () => getUserById(userId!),
        enabled: !!userId, // Only run this query if userId is provided
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        retry: 3, // Retry failed requests up to 3 times
    });

    // Fetch all users
    const { data: allUsers, isLoading: isLoadingAllUsers, isError: isErrorAllUsers } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: getAllUsers,
        staleTime: 5 * 60 * 1000,
    });

    return {
        user: user ?? null,
        allUsers: allUsers ?? null,
        isLoadingUser,
        isLoadingAllUsers,
        isError: isErrorUser || isErrorAllUsers,
    };
};

export default useUsers;
