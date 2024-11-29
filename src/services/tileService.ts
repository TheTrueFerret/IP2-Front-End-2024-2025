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
    const response = await axios.get(import.meta.env.VITE_BACKEND_URL + `/api/game/tiles/player/${playerId}`)
    console.log(response)
    return response.data
  } catch (error) {
    console.log('Failed to get Deck tile of Player with id: ' + playerId + ' because of: ' + error)
    return[]
  }
}