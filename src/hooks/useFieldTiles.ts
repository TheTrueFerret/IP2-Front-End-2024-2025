import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Tile } from "../models/Tile";
import { getFieldTiles } from "../services/dataService";
import { setFieldTiles } from "../services/tileService";


export function useFieldTiles() {
  const queryClient = useQueryClient();

  const { isLoading, isError, data: fieldTiles } = useQuery(
    {
      queryKey: ['fieldTiles'],
      queryFn: () => getFieldTiles(),
    }
  )


  const {
    mutate: mutateSetFieldTiles,
    isPending: isSettingFieldTiles,
    isError: isErrorSettingFieldTiles,
  } = useMutation({
    mutationFn: async (fieldTiles: Tile[]) => { return await setFieldTiles(fieldTiles) },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['fieldTiles'] }),
  })


  const {
    mutate: mutateUpdateFieldTile,
    isPending: isUpdatingFieldTile,
    isError: isErrorUpdatingFieldTile,
  } = useMutation({
    mutationFn: async ({ id, column, row }: { id: number, column: number, row: number }) => {
      if (!fieldTiles) {
        throw new Error("Tiles data is unavailable");
      }

      // Update the specific tile in the tiles array
      const updatedFieldTiles = fieldTiles.map((tile) => {
        if (tile.id === id) {
          tile.gridColumn = column;
          tile.gridRow = row;
          return tile; // Update the grid position of the tile
        }
        return tile;
      });

      return updatedFieldTiles;
    },
    onSuccess: (updatedFieldTiles) => {
      queryClient.setQueryData(['fieldTiles'], updatedFieldTiles);
    },
  })


  const {
    mutate: mutateAddFieldTile,
    isPending: isAddingFieldTile,
    isError: isErrorAddingFieldTile,
  } = useMutation({
    mutationFn: async (tile: Tile) => {
      if (!fieldTiles) {
        throw new Error("Tiles data is unavailable");
      }

      // Check if the tile is already in the field
      const isTileAlreadyInField = fieldTiles.some((t) => t.id === tile.id);

      if (!isTileAlreadyInField) {
        const updatedFieldTiles = [...fieldTiles, tile];
        return updatedFieldTiles;
      } else {
        return fieldTiles;
      }
    },
    onSuccess: (updatedFieldTiles) => {
      queryClient.setQueryData(['fieldTiles'], updatedFieldTiles);
    },
  })


  const {
    mutate: mutateRemoveFieldTile,
    isPending: isRemovingFieldTile,
    isError: isErrorRemovingFieldTile,
  } = useMutation({
    mutationFn: async (tile: Tile) => {
      if (!fieldTiles) {
        throw new Error("Tiles data is unavailable");
      }

      const updatedFieldTiles = fieldTiles.filter((fieldTile) => fieldTile.id !== tile.id);

      return updatedFieldTiles;
    },
    onSuccess: (updatedFieldTiles) => {
      queryClient.setQueryData(['fieldTiles'], updatedFieldTiles);
    },
  })




  return {
    isLoading,
    isError,
    fieldTiles,
    setFieldTiles: mutateSetFieldTiles,
    isSettingFieldTiles,
    isErrorSettingFieldTiles,
    updateFieldTile: mutateUpdateFieldTile,
    isUpdatingFieldTile,
    isErrorUpdatingFieldTile,
    addFieldTile: mutateAddFieldTile,
    isAddingFieldTile,
    isErrorAddingFieldTile,
    removeFieldTile: mutateRemoveFieldTile,
    isRemovingFieldTile,
    isErrorRemovingFieldTile,
  }
}