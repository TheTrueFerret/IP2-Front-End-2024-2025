import { Player } from "./Player";



export interface Game {
  gameId: string;
  turnTime: number;
  nextPlayer: Player
  players: Player[]
}
