import { Tile } from "../models/Tile"


export function getFieldTilesLocaly(): Tile[] {
  return [
    { id:1, tileNumber: 1, tileColor: "red", gridColumn: 1, gridRow: 1 },
    { id:2, tileNumber: 2, tileColor: "red", gridColumn: 2, gridRow: 1 },
    { id:3, tileNumber: 3, tileColor: "red", gridColumn: 3, gridRow: 1 },
    { id:4, tileNumber: 10, tileColor: "blue", gridColumn: 3, gridRow: 3 },
    { id:5, tileNumber: 11, tileColor: "blue", gridColumn: 4, gridRow: 3 },
    { id:6, tileNumber: 12, tileColor: "blue", gridColumn: 5, gridRow: 3 }
  ];
}



export function getDeckTilesLocaly(playerId: string): Tile[] {
  return [
    { id:7, tileNumber: 3, tileColor: "red", gridColumn: 1, gridRow: 1 },
    { id:8, tileNumber: 3, tileColor: "black", gridColumn: 2, gridRow: 1 },
    { id:9, tileNumber: 3, tileColor: "orange", gridColumn: 3, gridRow: 1 },
    { id:10, tileNumber: 10, tileColor: "blue", gridColumn: 3, gridRow: 2 },
    { id:11, tileNumber: 10, tileColor: "black", gridColumn: 4, gridRow: 2 },
    { id:12, tileNumber: 10, tileColor: "green", gridColumn: 5, gridRow: 2 }
  ];
}



