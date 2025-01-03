import axios from 'axios';
import {ChatMessage} from "../models/ChatMessage.ts";

export async function sendMessageToBot(threadId: string, message: string): Promise<string> {
    const response = await axios.post(`/api/chat/sendMessage`, { threadId, question: message });
    return response.data.answer;
}

export async function createChatThread(gameUserId: string): Promise<string> {
    const response = await axios.post(`/api/chat/createThread/${gameUserId}`);
    return response.data;
}

export async function getChatHistory(chatId: string): Promise<ChatMessage[]> {
    const response = await axios.get(`/api/chat/${chatId}/history`);
    console.log("The chat history returned is: " + JSON.stringify(response.data, null, 2));
    return response.data;
}

export const getAllChatIdsByUserId = async (userId: string): Promise<string[]> => {
    const response = await axios.get(`/api/chat/user/${userId}/chats`);
    return response.data;
};