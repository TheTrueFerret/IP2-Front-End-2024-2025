import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Tile } from "../models/Tile";
import { getTiles } from "../services/dataService";
import { setTiles } from "../services/tileService";


export function useTiles() {
  const queryClient = useQueryClient();

  const { isLoading, isError, data: tiles } = useQuery(
    {
      queryKey: ['tiles'],
      queryFn: () => getTiles()
    }
  )

  const {
    mutate: mutateSetTiles,
    isPending: isSettingTiles,
    isError: isErrorSettingTiles,
  } = useMutation({
    mutationFn: async (tiles: Tile[]) => { return await setTiles(tiles) },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tiles'] }),
  })

  const {
    mutate: mutateUpdateTile,
    isPending: isUpdatingTile,
    isError: isErrorUpdatingTile,
  } = useMutation({
    mutationFn: async ({ id, column, row }: { id: number, column: number, row: number }) => {
      if (!tiles) {
        throw new Error("Tiles data is unavailable");
      }

      // Update the specific tile in the tiles array
      const updatedTiles = tiles.map((tile) => {
        if (tile.id === id) {
          tile.gridColumn = column;
          tile.gridRow = row;
          console.log(tile)
          return tile; // Update the grid position of the tile
        }
        return tile;
      });
      console.log(updatedTiles)

      return updatedTiles;
    },

    onSuccess: (updatedTiles) => {
      queryClient.invalidateQueries({queryKey: ['titles']})
      queryClient.setQueryData(['tiles'], updatedTiles);
    },
  })

  return {
    isLoading,
    isError,
    tiles,
    setTiles: mutateSetTiles,
    isSettingTiles,
    isErrorSettingTiles,
    updateTile: mutateUpdateTile,
    isUpdatingTile,
    isErrorUpdatingTile
  }
}