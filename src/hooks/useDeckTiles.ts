import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Tile } from "../models/Tile";
import { getDeckTiles } from "../services/dataService";
import { setDeckTiles } from "../services/tileService";


export function useDeckTiles() {
  const queryClient = useQueryClient();

  const { isLoading, isError, data: deckTiles } = useQuery(
    {
      queryKey: ['deckTiles'],
      queryFn: () => getDeckTiles(),
    }
  )



  const {
    mutate: mutateSetDeckTiles,
    isPending: isSettingDeckTiles,
    isError: isErrorSettingDeckTiles,
  } = useMutation({
    mutationFn: async (tiles: Tile[]) => { return await setDeckTiles(tiles) },
    onSuccess: (updatedDeckTiles) => queryClient.setQueryData(['deckTiles'], updatedDeckTiles),
  })



  const {
    mutate: mutateUpdateDeckTile,
    isPending: isUpdatingDeckTile,
    isError: isErrorUpdatingDeckTile,
  } = useMutation({
    mutationFn: async ({ id, column, row }: { id: number, column: number, row: number }) => {
      if (!deckTiles) {
        throw new Error("Tiles data is unavailable");
      }

      // Update the specific tile in the tiles array
      const updatedDeckTiles = deckTiles.map((tile) => {
        if (tile.id === id) {
          tile.gridColumn = column;
          tile.gridRow = row;
          return tile; // Update the grid position of the tile
        }
        return tile;
      });

      return updatedDeckTiles;
    },
    onSuccess: (updatedDeckTiles) => {
      queryClient.setQueryData(['deckTiles'], updatedDeckTiles);
    },
  })



  const {
    mutate: mutateAddDeckTile,
    isPending: isAddingDeckTile,
    isError: isErrorAddingDeckTile,
  } = useMutation({
    mutationFn: async (tile: Tile) => {
      if (!deckTiles) {
        throw new Error("Tiles data is unavailable");
      }

      const updatedDeckTiles = [...deckTiles, tile];

      return updatedDeckTiles

    },
    onSuccess: (updatedDeckTiles) => {
      queryClient.setQueryData(['deckTiles'], updatedDeckTiles);
    },
  })



  const {
    mutate: mutateRemoveDeckTile,
    isPending: isRemovingDeckTile,
    isError: isErrorRemovingDeckTile,
  } = useMutation({
    mutationFn: async (tile: Tile) => {
      if (!deckTiles) {
        throw new Error("Tiles data is unavailable");
      }

      const updatedDeckTiles = deckTiles.filter((deckTile) => deckTile.id !== tile.id);

      return updatedDeckTiles;
    },
    onSuccess: (updatedDeckTiles) => {
      queryClient.setQueryData(['deckTiles'], updatedDeckTiles);
    },
  })


  return {
    isLoading,
    isError,
    deckTiles,
    setDeckTiles: mutateSetDeckTiles,
    isSettingDeckTiles,
    isErrorSettingDeckTiles,
    updateDeckTile: mutateUpdateDeckTile,
    isUpdatingDeckTile,
    isErrorUpdatingDeckTile,
    addDeckTile: mutateAddDeckTile,
    isAddingDeckTile,
    isErrorAddingDeckTile,
    removeDeckTile: mutateRemoveDeckTile,
    isRemovingDeckTile,
    isErrorRemovingDeckTile,
  }
}