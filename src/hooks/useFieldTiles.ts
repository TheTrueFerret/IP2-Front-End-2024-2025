import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Tile } from "../models/Tile";
import { useEffect, useState } from "react";
import { getPlayingFieldTiles } from "../services/tileService";
import { useGameId } from "./useGameId";
import { TileSet } from "../models/TileSet";


export function useFieldTiles() {
  const queryClient = useQueryClient();

  const { getCachedGameId } = useGameId();
  const gameId = getCachedGameId();

  const [localFieldTileSets, setLocalFieldTiles] = useState<TileSet[]>([]);

  const { isLoading, isError, data } = useQuery(
    {
      queryKey: ['fieldTileSets'],
      queryFn: () => {
        if (!gameId) return Promise.resolve(null); // no gameId Return Nothing
        getPlayingFieldTiles(gameId)
      },
      enabled: !!gameId, // Only fetch if gameId is set
      initialData: null,
    }
  )


  useEffect(() => {
    if (data) {
      setLocalFieldTiles(data); // Set the fetched data to local state
    }
  }, [data]);



  const {
    mutate: mutateUpdateFieldTile,
    isPending: isUpdatingFieldTile,
    isError: isErrorUpdatingFieldTile,
  } = useMutation({
    mutationFn: async ({ id, column, row }: { id: number, column: number, row: number }) => {
      if (!localFieldTileSets) {
        throw new Error("Tiles data is unavailable");
      }

      // TODO Move TileSets?
      const updatedFieldTileSets = localFieldTileSets.map((tileSet) => {
        const updatedTiles = tileSet.tiles.map((tile) => {
          if (tile.id === id) {
            tile.gridColumn = column;
            tile.gridRow = row;
            return tile;
          }
          return tile;
        });

        return { ...tileSet, tiles: updatedTiles };
      });

      return updatedFieldTileSets;
    },
    onSuccess: (updatedFieldTileSets) => {
      queryClient.setQueryData(['fieldTileSets'], updatedFieldTileSets);
      setLocalFieldTiles(updatedFieldTileSets);
    },
  })



  const {
    mutate: mutateAddTileToField,
    isPending: isAddingTileToField,
    isError: isErrorAddingTileToField,
  } = useMutation({
    mutationFn: async (tile: Tile) => {
      if (!localFieldTileSets) {
        throw new Error("Tiles data is unavailable");
      }

      // Check if the tile is already in the field
      const isTileAlreadyInField = localFieldTileSets.some((tileSet) => tileSet.tiles.some((t) => t.id === tile.id));


      if (!isTileAlreadyInField) {

        // probably impossible to do this because there will be an element in place before the TileSet
        const beforeTileSet = localFieldTileSets.find(
          tileSet => tileSet.startCoord - 1 === tile.gridColumn
        );
        if (beforeTileSet) {
          return localFieldTileSets
        }


        const afterTileSet = localFieldTileSets.find(
          tileSet => tileSet.endCoord + 1 === tile.gridColumn
        );

        let updatedFieldTileSets;

        if (afterTileSet != null) {
          updatedFieldTileSets = localFieldTileSets.map((tileSet) => {
            if (tileSet == afterTileSet) {
              return {
                ...tileSet,
                endCoord: tile.gridColumn,
                tiles: [...tileSet.tiles, tile]
              };
            }
            return tileSet;
          });
        } else {
          console.log('No TileSet found after the Tile, creating a new one');
          const newTileSet = {
            gridRow: tile.gridRow,
            startCoord: tile.gridColumn - 1,
            endCoord: tile.gridColumn,
            tiles: [tile]
          };
          updatedFieldTileSets = [...localFieldTileSets, newTileSet];
        }
        console.log('Added a Tile to fieldTiles:', updatedFieldTileSets);
        setLocalFieldTiles(updatedFieldTileSets);
        return updatedFieldTileSets;

      }
      console.log('Tile is already in the field!!!');
      return localFieldTileSets;
    },
    onSuccess: (updatedFieldTiles) => {
      queryClient.setQueryData(['fieldTileSets'], updatedFieldTiles);
    },
  })



  const {
    mutate: mutateRemoveFieldTile,
    isPending: isRemovingFieldTile,
    isError: isErrorRemovingFieldTile,
  } = useMutation({
    mutationFn: async (tileToRemove: Tile) => {
      if (!localFieldTileSets) {
        throw new Error("Tiles data is unavailable");
      }

      const updatedFieldTiles = localFieldTileSets.map((tileSet) => ({
        ...tileSet,
        tiles: tileSet.tiles.filter((tile) => tile.id !== tileToRemove.id),
      }));

      console.log('Removed a Tile fieldTiles:', updatedFieldTiles);

      setLocalFieldTiles(updatedFieldTiles);
      return updatedFieldTiles;
    },
    onSuccess: (updatedFieldTiles) => {
      queryClient.setQueryData(['fieldTileSets'], updatedFieldTiles);
    },
  })


  const {
    mutateAsync: mutateIsTileInField,
    isPending: isCheckingTileInField,
    isError: isErrorCheckingTileInField,
  } = useMutation({
    mutationFn: async (id: number) => {
      if (!localFieldTileSets) {
        throw new Error("Tiles data is unavailable");
      }

      const isTileInField = localFieldTileSets.some((tileSet) =>
        tileSet.tiles.some((tile) => tile.id === id)
      );
      
      console.log('Checking if Tile is in field:', isTileInField);

      return isTileInField;
    },
  })



  useEffect(() => {
    console.log('Updated fieldTiles:', localFieldTileSets);
  }, [localFieldTileSets]);


  return {
    isLoadingFieldTiles: isLoading,
    isErrorFieldTiles: isError,
    fieldTileSets: localFieldTileSets,
    updateFieldTile: mutateUpdateFieldTile,
    isUpdatingFieldTile,
    isErrorUpdatingFieldTile,
    addFieldTile: mutateAddTileToField,
    isAddingTileToField,
    isErrorAddingTileToField,
    removeFieldTile: mutateRemoveFieldTile,
    isRemovingFieldTile,
    isErrorRemovingFieldTile,
    isTileInField: mutateIsTileInField,
    isCheckingTileInField,
    isErrorCheckingTileInField,
  }
}