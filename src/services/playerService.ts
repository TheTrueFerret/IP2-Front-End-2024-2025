import axios from "axios";



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


export async function getPlayerIdByUserId(
  userId: string, 
  maxRetries: number = 5, 
  baseDelay: number = 1000
): Promise<string | null> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await axios.get<string>(`/api/game/player/${userId}`);
      
      if (response.data) {
        return response.data;
      }
      
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, baseDelay * attempt));
      }
    } catch (error) {
      console.log(`Attempt ${attempt} failed to get player ID: `, error);
      
      if (attempt === maxRetries) {
        return null;
      }
      
      await new Promise(resolve => setTimeout(resolve, baseDelay * attempt));
    }
  }
  return null;
}

