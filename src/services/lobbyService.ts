import axios from "axios";
import { Lobby } from "../models/Lobby";



export function getLobbyLocally(lobbyId: string) {
    return {
        lobbyId: lobbyId,
        status: "active",
        host: { userName: "player1", profileImage: "imageLink" },
        players: [
            { userName: "player1", profileImage: "imageLink" },
            { userName: "player2", profileImage: "imageLink" }
        ],
        minimumPlayers: 2,
        maximumPlayers: 4,
    }
}

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
