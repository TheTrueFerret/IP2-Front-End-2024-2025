import { Tile } from "./Tile";


export interface TileSet {
  startCoord: number;
  endCoord: number;
  tiles: Tile[];
}