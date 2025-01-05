import { useState, useContext, useEffect } from "react";
import SecurityContext from "../../context/SecurityContext";
import { useChat } from "../../hooks/useChat";
import { ChatMessage } from "../../models/ChatMessage";

export function ChatApp() {
    const [userMessage, setUserMessage] = useState<string>("");
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isWidgetOpen, setIsWidgetOpen] = useState<boolean>(false);
    const [chatHistory, setChatHistory] = useState<string[]>([]); // Store chat IDs
    const [chatId, setChatId] = useState<string | null>(null);
    const { loggedUserId } = useContext(SecurityContext);

    const {
        isLoadingCreate,
        createThread,
        isLoadingSend,
        sendMessage,
        GetChatIds,
        GetChatHistory
    } = useChat();

    const { isLoading: isLoadingChatIds, isError: isErrorChatIds, data: chatIds, refetch: refetchChatIds} = GetChatIds(loggedUserId!);
    const { isLoading: isLoadingChatHistory, isError: isErrorChatHistory, data: chatMessages, refetch: refetchChatHistory } = GetChatHistory(chatId!);

    useEffect(() => {
        if (chatIds) {
            setChatHistory(chatIds);
        }
    }, [chatIds]);

    useEffect(() => {
        if (chatMessages) {
            if (typeof chatMessages === "string") {
                setMessages([{ content: chatMessages, type: "info" }]);
            } else {
                setMessages(chatMessages);
            }
        }
    }, [chatMessages]);

    if (!loggedUserId) {
        return <div>Error: User ID is required</div>;
    }

    const handleStartNewChat = async () => {
        try {
            const newChatId = await createThread(loggedUserId);
            console.log("New chat ID:", newChatId);
            setChatId(newChatId);
            setMessages([{ content: "Welcome to the chat! How can I help you today?", type: "ai" }]);
            refetchChatIds()
        } catch (error) {
            console.error("Failed to create chat thread:", error);
        }
    };

    const handleSendMessage = async () => {
        if (!userMessage.trim() || !chatId) return;

        const userMsg = { content: userMessage, type: "human" };
        setMessages((prev) => [...prev, userMsg]);
        setUserMessage("");

        try {
            const botResponse: string = await sendMessage({ chatId, message: userMessage });
            setMessages((prev) => [...prev, { content: botResponse, type: "ai" }]);
        } catch (error) {
            console.error("Failed to send message:", error);
            setMessages((prev) => [
                ...prev,
                { content: "Something went wrong. Please try again later.", type: "ai" },
            ]);
        }
    };

    const handleChatSelect = (selectedChatId: string) => {
        console.log("Selected Chat ID:", selectedChatId);
        setChatId(selectedChatId);
        if (selectedChatId) {
            refetchChatHistory(); // Refetch chat history when a chat is selected
        }
    };

    const handleBackToChatList = () => {
        setChatId(null); // Return to chat list
        setMessages([]); // Clear any open messages
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };


    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* Widget Toggle Button */}
            <button
                onClick={() => setIsWidgetOpen((prev) => !prev)}
                className="bg-blue-500 text-white rounded-full w-12 h-12 shadow-md hover:bg-blue-600 focus:outline-none mb-2 flex items-center justify-center"
            >
                {isWidgetOpen ? "×" : "💬"}
            </button>

            {/* Chat Widget */}
            {isWidgetOpen && (
                <div className="w-96 h-[24rem] sm:w-[30rem] lg:w-[25rem] sm:h-[32rem] bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
                    <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
                        {chatId ? (
                            <button
                                onClick={handleBackToChatList}
                                className="text-sm bg-white text-blue-500 px-2 py-1 rounded-lg hover:bg-gray-100"
                            >
                                Back
                            </button>
                        ) : (
                            <h1 className="text-lg font-bold">Chat</h1>
                        )}
                        <button
                            onClick={handleStartNewChat}
                            disabled={isLoadingCreate}
                            className="text-sm bg-white text-blue-500 px-2 py-1 rounded-lg hover:bg-gray-100 disabled:bg-gray-200"
                        >
                            {isLoadingCreate ? "Loading..." : "New Chat"}
                        </button>
                    </div>
                    <div className="flex flex-col flex-grow p-2 overflow-y-auto">
                        {chatId ? (
                            isLoadingChatHistory ? (
                                <p>Loading chat messages...</p>
                            ) : isErrorChatHistory ? (
                                <p>Error loading chat messages.</p>
                            ) : (
                                messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`block max-w-[70%] p-2 mb-2 rounded-lg break-words whitespace-pre-wrap ${
                                            msg.type === "human"
                                                ? "bg-blue-500 text-white self-end ml-auto"
                                                : "bg-gray-300 text-black self-start mr-auto"
                                        }`}
                                    >
                                        {msg.content}
                                    </div>
                                ))
                            )
                        ) : isLoadingChatIds ? (
                            <p>Loading chat history...</p>
                        ) : isErrorChatIds ? (
                            <p>Error loading chat history.</p>
                        ) : (
                            <div>
                                <h2 className="text-lg font-semibold mb-2">Chat History</h2>
                                {chatHistory.map((chatId) => (
                                    <button
                                        key={chatId}
                                        onClick={() => handleChatSelect(chatId)}
                                        className="block w-full text-left px-4 py-2 bg-gray-100 rounded-lg mb-2 hover:bg-gray-200"
                                    >
                                        {chatId}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    {chatId && (
                        <div className="flex items-center p-2 border-t">
                <textarea
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-grow border rounded-lg p-2 mr-2 focus:outline-none resize-none"
                    rows={1}
                />
                            <button
                                onClick={handleSendMessage}
                                disabled={isLoadingSend}
                                className="bg-blue-500 text-white py-1 px-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400"
                            >
                                {isLoadingSend ? "Sending..." : "Send"}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}