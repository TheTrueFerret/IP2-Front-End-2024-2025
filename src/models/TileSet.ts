import { Tile } from "./Tile";


export interface TileSet {
  id: string;
  startCoord: number;
  endCoord: number;
  gridRow: number;
  tiles: Tile[];
}