import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Tile } from "../models/Tile";
import { useEffect, useState } from "react";
import { getFieldTilesLocaly } from "../services/dataService";


export function useFieldTiles() {
  const queryClient = useQueryClient();

  const [localFieldTiles, setLocalFieldTiles] = useState<Tile[] | undefined>(undefined);

  const { isLoading, isError, data } = useQuery(
    {
      queryKey: ['fieldTiles'],
      queryFn: () => getFieldTilesLocaly(),
      initialData: null,
    }
  )


  useEffect(() => {
    if (data && data.length > 0) {
      setLocalFieldTiles(data); // Set the fetched data to local state
    }
  }, [data]);



  const {
    mutate: mutateUpdateFieldTile,
    isPending: isUpdatingFieldTile,
    isError: isErrorUpdatingFieldTile,
  } = useMutation({
    mutationFn: async ({ id, column, row }: { id: number, column: number, row: number }) => {
      if (!localFieldTiles) {
        throw new Error("Tiles data is unavailable");
      }

      // Update the specific tile in the tiles array
      const updatedFieldTiles = localFieldTiles.map((tile) => {
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
      setLocalFieldTiles(updatedFieldTiles);
    },
  })



  const {
    mutate: mutateAddFieldTile,
    isPending: isAddingFieldTile,
    isError: isErrorAddingFieldTile,
  } = useMutation({
    mutationFn: async (tile: Tile) => {
      if (!localFieldTiles) {
        throw new Error("Tiles data is unavailable");
      }

      // Check if the tile is already in the field
      const isTileAlreadyInField = localFieldTiles.some((t) => t.id === tile.id);

      if (!isTileAlreadyInField) {
        const updatedFieldTiles = [...localFieldTiles, tile];
        setLocalFieldTiles(updatedFieldTiles);
        return updatedFieldTiles;
      }
      return localFieldTiles;
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
      if (!localFieldTiles) {
        throw new Error("Tiles data is unavailable");
      }

      const updatedFieldTiles = localFieldTiles.filter((fieldTile) => fieldTile.id !== tile.id);
      setLocalFieldTiles(updatedFieldTiles);
      return updatedFieldTiles;
    },
    onSuccess: (updatedFieldTiles) => {
      queryClient.setQueryData(['fieldTiles'], updatedFieldTiles);
    },
  })


    const {
    mutateAsync: mutateIsTileInField,
    isPending: isCheckingTileInField,
    isError: isErrorCheckingTileInField,
  } = useMutation({
    mutationFn: async (id: number) => {
      if (!localFieldTiles) {
        throw new Error("Tiles data is unavailable");
      }

      const isTileInField = localFieldTiles.find((tile) => tile.id === id);
      return isTileInField;
    },
  })



  useEffect(() => {
    console.log('Updated fieldTiles:', localFieldTiles);
  }, [localFieldTiles]);


  return {
    isLoadingFieldTiles: isLoading,
    isErrorFieldTiles: isError,
    fieldTiles: localFieldTiles,
    updateFieldTile: mutateUpdateFieldTile,
    isUpdatingFieldTile,
    isErrorUpdatingFieldTile,
    addFieldTile: mutateAddFieldTile,
    isAddingFieldTile,
    isErrorAddingFieldTile,
    removeFieldTile: mutateRemoveFieldTile,
    isRemovingFieldTile,
    isErrorRemovingFieldTile,
    isTileInField: mutateIsTileInField,
    isCheckingTileInField,
    isErrorCheckingTileInField,
  }
}