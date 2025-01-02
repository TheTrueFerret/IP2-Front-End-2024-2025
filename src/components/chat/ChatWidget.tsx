import { useState, useContext } from "react";
import SecurityContext from "../../context/SecurityContext";
import { useChat } from "../../hooks/UseChat";

export function ChatApp() {
    const [userMessage, setUserMessage] = useState<string>("");
    const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);
    const { loggedUserId } = useContext(SecurityContext);

    const {
        isLoadingCreate,
        isErrorCreate,
        createThread,
        isLoadingSend,
        sendMessage,
    } = useChat();

    const [chatId, setChatId] = useState<string | null>(null);

    if (!loggedUserId) {
        return <div>Error: User ID is required</div>;
    }

    const handleStartNewChat = async () => {
        try {
            const newChatId = await createThread(loggedUserId);
            console.log("New chat ID:", newChatId);
            setChatId(newChatId);
            setMessages([{ sender: "bot", message: "Welcome to the chat! How can I help you today?" }]);
        } catch (error) {
            console.error("Failed to create chat thread:", error);
        }
    };

    const handleSendMessage = async () => {
        if (!userMessage.trim() || !chatId) return; // Prevent sending empty messages or without a chat ID

        const userMsg = { sender: "user", message: userMessage };
        setMessages((prev) => [...prev, userMsg]);
        setUserMessage("");

        try {
            const botResponse: string = await sendMessage(userMessage); // `mutateAsync` returns a string
            setMessages((prev) => [...prev, { sender: "bot", message: botResponse }]);
        } catch (error) {
            console.error("Failed to send message:", error);
            setMessages((prev) => [
                ...prev,
                { sender: "bot", message: "Something went wrong. Please try again later." },
            ]);
        }
    };



    return (
        <div className="flex flex-col h-screen bg-gray-100 p-4 relative z-20">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Chat App</h1>
                <button
                    onClick={handleStartNewChat}
                    disabled={isLoadingCreate}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400"
                >
                    {isLoadingCreate ? "Starting..." : "Start New Chat"}
                </button>
            </div>

            <div className="flex flex-col flex-grow bg-white shadow-lg rounded-lg overflow-hidden">
                {chatId ? (
                    <div className="flex flex-col h-full">
                        <div className="flex-grow p-4 overflow-y-auto">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`p-2 mb-2 rounded-lg ${
                                        msg.sender === "user"
                                            ? "bg-blue-500 text-white self-end"
                                            : "bg-gray-300 text-black self-start"
                                    }`}
                                >
                                    {msg.message}
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center p-4 border-t">
                            <input
                                type="text"
                                value={userMessage}
                                onChange={(e) => setUserMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-grow border rounded-lg p-2 mr-2 focus:outline-none"
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={isLoadingSend}
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400"
                            >
                                {isLoadingSend ? "Sending..." : "Send"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500 text-center mt-8">
                        {isErrorCreate
                            ? "Failed to start a new chat. Please try again."
                            : "Start a new chat to begin."}
                    </p>
                )}
            </div>
        </div>
    );
}
