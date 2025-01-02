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
        return getPlayingFieldTiles(gameId) || []; // Fetch fieldTiles by gameId
      },
      enabled: !!gameId, // Only fetch if gameId is set
      initialData: [] as TileSet[], // Initial data is an empty array
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
    mutationFn: async ({ id, column, row }: { id: string, column: number, row: number }) => {
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
      // To temporarily generate unique IDs for new TileSets
      const generateUniqueId = () => `${Date.now()}-${Math.random()}`;

      if (!localFieldTileSets || localFieldTileSets.length == 0 || !localFieldTileSets[0]) {
        return [{id: generateUniqueId(), tiles: [tile], gridRow: tile.gridRow, startCoord: tile.gridColumn, endCoord: tile.gridColumn}] as TileSet[];
      }

      // Check if the tile is already in the field
      const isTileAlreadyInField = localFieldTileSets.some((tileSet) => tileSet.tiles.some((t) => t.id === tile.id));

      if (!isTileAlreadyInField) {
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
          const newTileSet = {
            // IMPORTANT: DO NOT GIVE THIS ID TO THE BACKEND!!!!
            // WHEN A NEW TILESET IS CREATED, NO ID WILL BE GIVEN TO THE BACKEND TO AVOID DUPLICATE ID'S
            id: generateUniqueId(),
            gridRow: tile.gridRow,
            startCoord: tile.gridColumn,
            endCoord: tile.gridColumn,
            tiles: [tile]
          };
          updatedFieldTileSets = [...localFieldTileSets, newTileSet];
        }
        return updatedFieldTileSets;
      }
      return localFieldTileSets;
    },
    onSuccess: (updatedFieldTiles) => {
      queryClient.setQueryData(['fieldTileSets'], updatedFieldTiles);
      setLocalFieldTiles(updatedFieldTiles);
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

      return localFieldTileSets.map((tileSet) => ({
        ...tileSet,
        tiles: tileSet.tiles.filter((tile) => tile.id !== tileToRemove.id),
      }));
    },
    onSuccess: (updatedFieldTiles) => {
      queryClient.setQueryData(['fieldTileSets'], updatedFieldTiles);
      setLocalFieldTiles(updatedFieldTiles);
    },
  })


  const {
    mutateAsync: mutateIsTileInField,
    isPending: isCheckingTileInField,
    isError: isErrorCheckingTileInField,
  } = useMutation({
    mutationFn: async (id: string) => {
      if (!Array.isArray(localFieldTileSets)) {
        return null;
      }

      const tileSetInField = localFieldTileSets.find((tileSet) =>
        tileSet.tiles.find((tile) => tile.id === id)
      );
      
      console.log('Checking if Tile is in field:', tileSetInField);

      if (!tileSetInField) {
        return null;
      }
      return tileSetInField.tiles.find((tile) => tile.id === id);
    },
  })


  const {
    mutateAsync: mutateMoveTileSet,
    isPending: isMovingTileSet,
    isError: isErrorMovingTileSet,
  } = useMutation({
    mutationFn: async ({ tileSetId, newColumn, newRow }: { tileSetId: string, newColumn: number, newRow: number }) => {
      if (!localFieldTileSets) {
        throw new Error("Tiles data is unavailable");
      }

      return localFieldTileSets.map((tileSet) => {
        if (tileSet.id === tileSetId) {
          return {
            ...tileSet,
            startCoord: newColumn + 1,
            endCoord: newColumn + tileSet.tiles.length,
            gridRow: newRow,
            tiles: tileSet.tiles.map((tile, index) => ({
              ...tile,
              gridColumn: newColumn + index + 1,
              gridRow: newRow,
            })),
          };
        }
        return tileSet;
      });
    },
    onSuccess: (updatedFieldTileSets) => {
      queryClient.setQueryData(['fieldTileSets'], updatedFieldTileSets);
      setLocalFieldTiles(updatedFieldTileSets);
    },
  })


  const {
    mutateAsync: mutateGetTileSets,
    isPending: isGettingTileSets,
    isError: isErrorGettingTileSets,
  } = useMutation({
    mutationFn: async () => {
      if (!localFieldTileSets) {
        throw new Error("Tiles data is unavailable");
      }

      if (gameId) {
        return await getPlayingFieldTiles(gameId);
      }
      return localFieldTileSets;
    },
    onSuccess: (updatedFieldTileSets) => {
      queryClient.setQueryData(['fieldTileSets'], updatedFieldTileSets);
      setLocalFieldTiles(updatedFieldTileSets);
    }
  })


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
    moveTileSet: mutateMoveTileSet,
    isMovingTileSet,
    isErrorMovingTileSet,
    getTileSets: mutateGetTileSets,
    isGettingTileSets,
    isErrorGettingTileSets,
  }
}