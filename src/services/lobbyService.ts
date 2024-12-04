import axios from "axios";


export async function postCreateGame(lobbyId:string,roundTime:number,startTileAmount:number): Promise<string> {
  try {
    const response = await axios.post<string>(`/api/game/start/${lobbyId}`,{
        roundTime:roundTime,
        startTileAmount:startTileAmount,
       //jokersEnabled:jokersEnabled,
    })
    console.log(response)
    return response.data
  } catch (error) {
    console.log('Failed to create a game because of: ' + error)
    return ''
  }
}