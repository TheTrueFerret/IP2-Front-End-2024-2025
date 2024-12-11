export interface User {
    id: number;
    username: string;
    avatar: string;
    userAchievements: UserAchievement[];
    friends: User[];
    chatHistory: ChatHistory[];
}

export interface UserAchievement {
    id: number;
    user: User;
    achievement: Achievement;
    dateAchieved: Date;
}

export interface Achievement {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

export interface ChatHistory {
    id: number;
    user: User;
    chatMessages: ChatMessage[];
}

export interface ChatMessage {
    id: number;
    time: Date;
    message: string;
    sender: SenderType;
}

export enum SenderType {
    HUMAN,AI
}