import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tile } from "../models/Tile";



export function useHiddenDeckTiles() {
  const queryClient = useQueryClient();



  return {
    setHiddenDeckTiles,
    getHiddenDeckTiles,
  }
}