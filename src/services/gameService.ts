import axios from "axios";
import { Game } from "../models/Game";


export async function getGameIdByLobbyId(lobbyId: string, loggedInUserId: string): Promise<string> {
    try {
        const response = await axios.get<string>(`/api/games/lobby/${lobbyId}?userId=${loggedInUserId}`)
        console.log(response)
        return response.data
    } catch (error) {
        console.log('Failed to create a game because of: ' + error)
        return ''
    }
}


export async function postCreateGame(lobbyId: string, roundTime: number, startTileAmount: number, loggedInUserId: string): Promise<Game | null> {
    try {
        const response = await axios.post<Game>(`/api/games/start/${lobbyId}`, {
            turnTime: roundTime,
            startTileAmount: startTileAmount,
            hostUserId: loggedInUserId
            //jokersEnabled:jokersEnabled,
        })
        console.log(response)
        return response.data
    } catch (error) {
        console.log('Failed to create a game because of: ' + error)
        return null
    }
}


// TODO implement a leaveGame Function
export async function leaveGame() {
    
}