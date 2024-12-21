import axios from "axios";
import { Player } from "../models/Player";



export function getPlayerIdLocally(userId: String): String {
  return userId;
}

/*
export async function getPlayerIdByUserId(userId: string): Promise<string | null> {
    try {
        const response = await axios.get<string>(`/api/game/player/${userId}`);
        return response.data
    } catch (error) {
        console.log('Failed to get the lobby because of: ' + error);
        return null;
    }
}
*/


export async function getPlayerIdByUserId(userId: string,): Promise<string | null> {
  let retryCount = 0;
  const maxInitialRetries = 3;
  const baseDelay = 2000;
  
  while (retryCount < maxInitialRetries) {
    try {
      const response = await axios.get<string>(`/api/game/player/${userId}`);
      if (response.data) {
        return response.data;
      }

      // If no data but not an error, wait and retry
      retryCount++;
      if (retryCount < maxInitialRetries) {
        await new Promise(resolve => setTimeout(resolve, baseDelay * retryCount));
      }
    } catch (error) {
      // Only retry on 404 or if the error indicates player not ready
      const isNotFoundError = axios.isAxiosError(error) && error.response?.status === 404;
      if (!isNotFoundError) {
        console.error('Failed to fetch player ID:', error);
        throw error; // Don't retry on non-404 errors
      }

      retryCount++;
      if (retryCount < maxInitialRetries) {
        await new Promise(resolve => setTimeout(resolve, baseDelay * retryCount));
      }
    }
  }
  return null;
}


export async function getCurrentPlayerTurn(gameId: string): Promise<Player | null> {
  try {
    const response = await axios.get<Player>(`/game/${gameId}/turns/current-player-turn`);
    return response.data;
  } catch (error) {
    console.log('Failed to get the current player turn because of: ' + error);
    return null;
  }
}
