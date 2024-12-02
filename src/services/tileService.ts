import axios from "axios";
import { Tile } from "../models/Tile";
import { ApiTile } from "../models/ApiTile";



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
    const response = await axios.get<ApiTile[]>(`/api/tile-positions/game/${gameId}`)

    const mappedTiles: Tile[] = response.data.map(tile => ({
      id: tile.id,
      tileNumber: tile.numberValue, // Rename `numberValue` to `tileNumber`
      tileColor: tile.tileColor,
      gridColumn: (tile.columnPosition + 1), // Rename `columnPosition` to `gridColumn`
      gridRow: (tile.rowPosition + 1), // Rename `rowPosition` to `gridRow`
    }));

    console.log(response)
    return mappedTiles
  } catch (error) {
    console.log('Failed to get tiles from the PlayingField with id: ' + gameId + ' because of: ' + error)
    return []
  }
}