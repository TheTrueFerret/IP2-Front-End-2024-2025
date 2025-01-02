import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sendMessageToBot, createChatThread, getChatHistory } from '../services/chatService';

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
        mutationFn: (message: string) => sendMessageToBot(chatId!, message),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chatHistory', chatId] });
        }
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
    };
}