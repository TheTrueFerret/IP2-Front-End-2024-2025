import axios from "axios";
import { Tile } from "../models/Tile";
import { TileSet } from "../models/TileSet";


export async function getDeckTiles(playerId: string): Promise<Tile[]> {
  const maxRetries = 5;
  const delay = 2000;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await axios.get<Tile[]>(`/api/players/tiles/${playerId}`);

      let row = 1;
      let column = 1;
      response.data.forEach(tile => {
        // TODO REMOVE HARDCODED GRID ROW AND COLUMN???
        const maxRow = 2;
        const maxColumn = 11;

        tile.gridRow = row;
        tile.gridColumn = column;
        column++;

        if (column >= maxColumn) {
          row++;
          column = 1;
        }
        if (row >= maxRow) {
          //throw some kind of error
        }
      });
      return response.data;

  } catch (error) {
    console.log(`Attempt ${attempt + 1}/${maxRetries}: Failed to get Deck tiles for player ${playerId}`);

    if (attempt === maxRetries - 1) {
      console.error('Max retries reached. Returning empty array.');
      return [];
    }

    // Wait before trying again
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}

return [];
}



export async function getPlayingFieldTiles(gameId: string): Promise<TileSet[]> {
  try {
    const response = await axios.get<TileSet[]>(`/api/playingfields/${gameId}`)
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
