import { Tile } from "./Tile";


export interface TileSet {
  startCoord: number;
  endCoord: number;
  gridRow: number;
  tiles: Tile[];
}