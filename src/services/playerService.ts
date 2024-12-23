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
  const maxRetries = 3;
  const delayRetries = 2000;

   while (retryCount < maxRetries) {
    try {
      const response = await axios.get<any>(`/api/players/${userId}`);
      
      // Check if response contains an error object
      if (response.data && response.data.error) {
        console.log(`Attempt ${retryCount}: Received error response:`, response.data);
        retryCount++;
        if (retryCount < maxRetries) {
          const delay = Math.min(delayRetries * Math.pow(2, retryCount - 1), delayRetries);
          console.log(`Retrying in ${delay/1000} seconds...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
      }

      // Validate that we have a proper player ID string
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
    return response.data;
  } catch (error) {
    console.log('Failed to get the current player turn because of: ' + error);
    return null;
  }
}
