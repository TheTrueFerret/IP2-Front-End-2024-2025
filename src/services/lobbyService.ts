import axios from "axios";


export async function postCreateGame(lobbyId: string, roundTime: number, startTileAmount: number): Promise<string> {
    try {
        const response = await axios.post<string>(`/api/game/start/${lobbyId}`, {
            roundTime: roundTime,
            startTileAmount: startTileAmount,
            //jokersEnabled:jokersEnabled,
        })
        console.log(response)
        return response.data
    } catch (error) {
        console.log('Failed to create a game because of: ' + error)
        return ''
    }
}

export async function postCreateLobby(joinCode: string, userId: string): Promise<string> {
    try {
        console.log('Creating lobby with joinCode: ' + joinCode + ' and userId: ' + userId)
        const response = await axios.post<string>(`/api/lobby/create?userId=${userId}`, {
            joinCode: joinCode,
            minimumPlayers: 2,
            maximumPlayers: 4
        })
        console.log('Response= ' + response)
        return response.data
    } catch (error) {
        console.log('Failed to create a lobby because of: ' + error)
        return ''
    }
}