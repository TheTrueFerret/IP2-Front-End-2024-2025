import { Tile } from "../models/Tile"


export function getTiles(): Tile[] {
  return [
    { id:1, tileNumber: 1, tileColor: "red", gridColumn: 1, gridRow: 1 },
    { id:2, tileNumber: 2, tileColor: "red", gridColumn: 2, gridRow: 1 },
    { id:3, tileNumber: 3, tileColor: "red", gridColumn: 3, gridRow: 1 },
    { id:4, tileNumber: 10, tileColor: "blue", gridColumn: 3, gridRow: 3 },
    { id:5, tileNumber: 11, tileColor: "blue", gridColumn: 4, gridRow: 3 },
    { id:6, tileNumber: 12, tileColor: "blue", gridColumn: 5, gridRow: 3 }
  ];
}


