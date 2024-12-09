import { Player } from "./Player";


// IMPORTANT Player in here IS NOT REALLY A PLAYER but... A USER!!!
export interface Lobby {
  lobbyId: string;
  status: string;
  host: Player;
  players: Player[];
  minimumPlayers: number;
  maximumPlayers: number;
}


