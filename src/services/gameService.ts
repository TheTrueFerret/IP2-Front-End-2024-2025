import axios from "axios";
import { Game } from "../models/Game";
import { Tile } from "../models/Tile";
import { TileSet } from "../models/TileSet";
import { Player } from "../models/Player";


// Get GameId Call
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


// Create Game Call
export async function postCreateGame(lobbyId: string, roundTime: number, startTileAmount: number, loggedInUserId: string): Promise<Game | null> {
    try {
        const response = await axios.post<Game>(`/api/games/start/${lobbyId}`, {
            // lewis said so
            turnTime: roundTime + 8,
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


// Leave Game Call
export async function leaveGame(playerId: string) {
    try {
        const response = await axios.delete(`/api/games/leave/${playerId}`)
        console.log(response);
    } catch (error) {
        console.log('Failed to leave game because of: ' + error)
    }

}


const isGeneratedId = (id: string) => /^\d{13}-\d+(\.\d+)?$/.test(id); // Matches format: <timestamp>-<random>

export async function commitTurn(playerId: string, gameId: string, playingField: TileSet[], deck: Tile[]): Promise<Player | null> {
    console.log('committing turn...')
    try {
        // Remove IDs from newly created TileSets
        const sanitizedPlayingField = playingField.map(tileSet => {
            if (isGeneratedId(tileSet.id)) {
                return {
                    ...tileSet,
                    id: null, // Explicitly set id to null
                };
            } else {
                return {
                    ...tileSet,
                    id: tileSet.id,
                }
            }
        });
        console.log(sanitizedPlayingField);

        const response = await axios.post<Player>(`/api/turns/player-make-move`, {
            playerId: playerId,
            gameId: gameId,
            playingField: sanitizedPlayingField,
            deck: deck
        })
        console.log(response)
        return response.data
    } catch (error) {
        console.log('Failed to commit turn because of: ' + error)
        return null
    }
}



export async function getGameIdByPlayerId(playerId: string): Promise<string> {
    try {
        const response = await axios.get<string>(`/api/games/player/${playerId}`);
        console.log(response);
        return response.data;
    }
    catch (error) {
        console.log('Failed to get game id because of: ' + error);
        return '';
    }
}


export async function getScoreByPlayerId(playerId: string): Promise<number> {
    try {
        const response = await axios.get<number>(`/api/players/${playerId}/score`);
        console.log(response);
        return response.data;
    }
    catch (error) {
        console.log('Failed to get score because of: ' + error);
        return 0;
    }
}


export async function getLeaderboard(gameId: string) {
    try {
        const response = await axios.get<string[]>(`/api/games/${gameId}/leaderboard`);
        console.log(response);
        return response.data;
    }
    catch (error) {
        console.log('Failed to get leaderboard because of: ' + error);
        return [];
    }
}