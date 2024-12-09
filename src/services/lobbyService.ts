import axios from "axios";



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


// Returns LobbyId?
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
