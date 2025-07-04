import axios from "axios";
import { Lobby } from "../models/Lobby";


export async function getLobby(lobbyId: string): Promise<Lobby | null> {
    try {
        const response = await axios.get<Lobby>(`/api/lobby/${lobbyId}`);
        return response.data
    } catch (error) {
        console.log('Failed to get the lobby because of: ' + error);
        return null;
    }
}


export async function postExitLobby(lobbyId: string, userId: string): Promise<Lobby | null> {
    try {
        console.log('Exiting lobby: ' + lobbyId + ' with userId: ' + userId)
        const response = await axios.post<Lobby>(`/api/lobby/leave/${lobbyId}?userId=${userId}`)
        console.log('Response= ' + response)
        return response.data
    } catch (error) {
        console.log('Failed to create a lobby because of: ' + error)
        return null
    }
}


export async function postCreateLobby(joinCode: string, userId: string): Promise<Lobby | null> {
    try {
        console.log('Creating lobby with joinCode: ' + joinCode + ' and userId: ' + userId)
        const response = await axios.post<Lobby>(`/api/lobby/create?userId=${userId}`, {
            joinCode: joinCode,
            minimumPlayers: 2,
            maximumPlayers: 4
        })
        console.log('Response= ' + response)
        return response.data
    } catch (error) {
        console.log('Failed to create a lobby because of: ' + error)
        return null
    }
}

export async function patchJoinLobby(joinCode: string, userId: string): Promise<Lobby | null> {
    try {
        console.log('joining lobby with joinCode: ' + joinCode + ' and userId: ' + userId)
        const response = await axios.patch<Lobby>(`/api/lobby/join?userId=${userId}`, {
            joinCode: joinCode
        })
        console.log('Response= ' + response)
        return response.data
    } catch (error) {
        console.log('Failed to join lobby because of: ' + error)
        return null
    }
}

export async function findLobbyForPlayer(gameUserId: string): Promise<Lobby | string> {
    try {
        const response = await axios.patch<Lobby>(`/api/lobby/findLobbyForPlayer/${gameUserId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && typeof error.response?.data === "string") {
            return error.response.data; // Return the server's string message
        }
        return 'An unexpected error occurred while finding a lobby.';
    }
}
