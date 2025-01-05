import axios from "axios";
import { Player } from "../models/Player";


export function getPlayerIdLocally(userId: String): String {
  return userId;
}


export async function getPlayersByGameId(gameId: string): Promise<Player[]> {
  try {
    const response = await axios.get<Player[]>(`/api/players/game/${gameId}`);
    return response.data;
  } catch (error) {
    console.log('Failed to get the players because of: ' + error);
    return [];
  }
}


export async function getPlayerIdByUserId(userId: string,): Promise<string | null> {
  let retryCount = 0;
  const maxRetries = 3;
  const delayRetries = 2000;

   while (retryCount < maxRetries) {
    try {
      const response = await axios.get<string>(`/api/players/${userId}`);

      if (response.data && typeof response.data === 'string') {
        return response.data;
      }

      // If we get here, we got a response but it wasn't what we expected
      retryCount++;
      if (retryCount < maxRetries) {
        const delay = Math.min(delayRetries * Math.pow(2, retryCount - 1), delayRetries);
        console.log(`Attempt ${retryCount}: Invalid response format, retrying in ${delay/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    } catch (error) {
      const axiosError = error as any;
      const isNotFoundError = axios.isAxiosError(axiosError) && 
        (axiosError.response?.status === 404 || 
         axiosError.response?.data?.error === 'IllegalArgumentException');

      if (!isNotFoundError) {
        console.error('Unrecoverable error while fetching player ID:', error);
        throw error;
      }

      retryCount++;
      if (retryCount < maxRetries) {
        const delay = Math.min(delayRetries * Math.pow(2, retryCount - 1), delayRetries);
        console.log(`Attempt ${retryCount}: Player not found, retrying in ${delay/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  console.error(`Failed to fetch player ID after ${maxRetries} attempts`);
  return null;
}


export async function getCurrentPlayerTurn(gameId: string): Promise<Player | null> {
  try {
    const response = await axios.get<Player>(`/api/players/game/${gameId}/turns/current-player-turn`);
    console.log('Current player turn: ' + response.data);
    return response.data;
  } catch (error: any) {
    if (
        error.response?.data?.error === "IllegalStateException" &&
        error.response?.data?.message?.includes(`Game has ended`)
      ) {
        console.log('Game has ended, redirecting to game over page');
        throw new Error('GAME_ENDED');
      }
    console.log('Failed to get the current player turn because of: ' + error);
    return null;
  }
}

export async function getTimeByPlayerId(playerId: string): Promise<number> {
  try {
    const response = await axios.get<number>(`/api/players/time/${playerId}`);
    return response.data;
  } catch (error) {
    console.log('Failed to get the time because of: ' + error);
    return 0;
  }
}