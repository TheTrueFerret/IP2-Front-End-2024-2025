import { Tile } from "../models/Tile"


export function getFieldTilesLocaly(): Tile[] {
  return [
    { id:1, numberValue: 1, color: "red", gridColumn: 1, gridRow: 1 },
    { id:2, numberValue: 2, color: "red", gridColumn: 2, gridRow: 1 },
    { id:3, numberValue: 3, color: "red", gridColumn: 3, gridRow: 1 },
    { id:4, numberValue: 10, color: "blue", gridColumn: 3, gridRow: 3 },
    { id:5, numberValue: 11, color: "blue", gridColumn: 4, gridRow: 3 },
    { id:6, numberValue: 12, color: "blue", gridColumn: 5, gridRow: 3 }
  ];
}



export function getDeckTilesLocaly(playerId: string): Tile[] {
  console.log(playerId)
  return [
    { id:7, numberValue: 3, color: "red", gridColumn: 1, gridRow: 1 },
    { id:8, numberValue: 3, color: "black", gridColumn: 2, gridRow: 1 },
    { id:9, numberValue: 3, color: "orange", gridColumn: 3, gridRow: 1 },
    { id:10, numberValue: 10, color: "blue", gridColumn: 3, gridRow: 2 },
    { id:11, numberValue: 10, color: "black", gridColumn: 4, gridRow: 2 },
    { id:12, numberValue: 10, color: "green", gridColumn: 5, gridRow: 2 }
  ];
}



