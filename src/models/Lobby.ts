import { Player } from "./Player";


// IMPORTANT Player in here IS NOT REALLY A PLAYER but... A USER!!!
export interface Lobby {
  id: string;
  status: string;
  hostUser: Player;
  // BELANGRIJK DEZE SHIT MOET AANGEPAST WORDEN NOOIT USER ID TERUG GEVEN!!!
  users: Player[];
  minimumPlayers: number;
  maximumPlayers: number;
}


