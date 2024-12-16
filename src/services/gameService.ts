import axios from "axios";
import { Game } from "../models/Game";



export function getGameLocally(playerId: String) {
  return {
    gameId: "d276d5f9-4bca-44ed-b4da-9e312953826a",
    turnTime: 70,
    nextPlayer: {playerId: "d276d5f9-4bca-44ed-b4da-9e3000000011", userName: "player1", profileImage: "imageLink"},
    players: [
      {playerId: playerId, userName: "player1", profileImage: "imageLink"},
      {playerId: "d276d5f9-4bca-44ed-b4da-9e3000000012", userName: "player2", profileImage: "imageLink"}
    ]
  }
}


export async function getGameByLobbyId(lobbyId: string, loggedInUserId: string): Promise<string> {
    try {
        const response = await axios.get<string>(`/api/game/lobby/${lobbyId}?userId=${loggedInUserId}`)
        console.log(response)
        return response.data
    } catch (error) {
        console.log('Failed to create a game because of: ' + error)
        return ''
    }
}



export async function postCreateGame(lobbyId: string, roundTime: number, startTileAmount: number, loggedInUserId: string): Promise<Game | null> {
    try {
        const response = await axios.post<Game>(`/api/game/start/${lobbyId}`, {
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