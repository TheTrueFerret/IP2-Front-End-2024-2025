import axios from "axios";
import { Tile } from "../models/Tile";


export function setFieldTiles(tiles: Tile[]): Tile[] {
  return tiles
}


export function setDeckTiles(tiles: Tile[]): Tile[] {
  return tiles
}



export async function getDeckTiles(playerId: string): Promise<Tile[]> {
  try {
    const response = await axios.get<Tile[]>(`/api/game/tiles/player/${playerId}`)
    console.log(response)
    return response.data
  } catch (error) {
    console.log('Failed to get Deck tile of Player with id: ' + playerId + ' because of: ' + error)
    return []
  }
}



export async function getPlayingFieldTiles(gameId: string): Promise<Tile[]> {
  try {
    const response = await axios.get<Tile[]>(`/api/tile-positions/game/${gameId}`)

    console.log(response.data)
    return response.data
  } catch (error) {
    console.log('Failed to get tiles from the PlayingField with id: ' + gameId + ' because of: ' + error)
    return []
  }
}



export async function getDrawTile(gameId: string, playerId: string): Promise<Tile | null> {
  try {
    const response = await axios.patch<Tile>(`/api/turns/player-pull-tile`, {
      gameId: gameId,
      playerId: playerId
    })

    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log('Failed to get tiles from the PlayingField with id: ' + gameId + ' because of: ' + error)
    return null
  }
}
