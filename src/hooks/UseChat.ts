import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {sendMessageToBot, createChatThread, getChatHistory, getAllChatIdsByUserId} from '../services/chatService';

export function useChat() {
    const queryClient = useQueryClient();

    const { isPending: isLoadingCreate, isError: isErrorCreate, data: chatId, mutateAsync: createThread } = useMutation({
        mutationFn: (userId: string) => createChatThread(userId),
    });

    const { isLoading: isLoadingHistory, isError: isErrorHistory, data: chatHistory } = useQuery({
        queryKey: ['chatHistory', chatId],
        queryFn: () => getChatHistory(chatId!),
        enabled: Boolean(chatId),
    });

    const { isPending: isLoadingSend, isError: isErrorSend, mutateAsync: sendMessage } = useMutation({
        mutationFn: ({ chatId, message }: { chatId: string, message: string }) => sendMessageToBot(chatId, message),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chatHistory', chatId] });
        }
    });

    const GetChatIds = (userId: string) =>
        useQuery({
            queryKey: ['chatIds', userId],
            queryFn: () => getAllChatIdsByUserId(userId),
            enabled: Boolean(userId), // Only runs if userId is provided
        });

    const GetChatHistory = (chatId: string) =>
        useQuery({
            queryKey: ['chatHistory', chatId],
            queryFn: () => getChatHistory(chatId),
            enabled: Boolean(chatId),
        });

    return {
        isLoadingHistory,
        isErrorHistory,
        chatHistory,
        isLoadingCreate,
        isErrorCreate,
        createThread,
        isLoadingSend,
        isErrorSend,
        sendMessage,
        GetChatIds,
        GetChatHistory
    };
}