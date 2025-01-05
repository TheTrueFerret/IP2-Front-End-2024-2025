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
      retry: false,
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
      if (!localFieldTileSets || !Array.isArray(localFieldTileSets)) {
        throw new Error("Tiles data is unavailable");
      }

      const tileSetWithTile: TileSet | undefined = localFieldTileSets.find((tileSet) => tileSet.tiles.find((tile) => tile.id === id));
      const foundTile: Tile | undefined = tileSetWithTile?.tiles.find((tile) => tile.id === id);

      if (!tileSetWithTile || !foundTile) {
        console.error("Tile not found in field");
        return localFieldTileSets;
      }

      // Special case: If the tile is added to the back of the TileSet
      if (tileSetWithTile.endCoord + 1 == column && tileSetWithTile.gridRow == row) {
        const updatedFieldTileSets = localFieldTileSets.map((tileSet) => {
          if (tileSet.id == tileSetWithTile.id) {
            const updatedTiles = tileSet.tiles.map((tile) => {
              if (tile.id === id) {
                return {
                  ...tile,
                  gridColumn: column - 1,
                };
              } else if (
                foundTile.gridColumn < column &&
                foundTile.gridColumn < tile.gridColumn &&
                tile.gridColumn <= column
              ) {
                return {
                  ...tile,
                  gridColumn: tile.gridColumn - 1,
                };
              }
              return tile;
            });
            return {
              ...tileSet,
              tiles: updatedTiles.sort((a, b) => a.gridColumn - b.gridColumn), // Sort tiles by gridColumn to make sure when they are returned to the backend they are in the correct order!!!
            };
          }
          return tileSet;
        });
        return updatedFieldTileSets;
      }


      // If the tile is not moved to the back of the oldTileSet
      if (column < tileSetWithTile.startCoord || tileSetWithTile.endCoord < column || tileSetWithTile.gridRow != row) {

        // Remove Tile from current TileSet
        const oldTileSet: TileSet = tileSetWithTile;
        oldTileSet.tiles = tileSetWithTile.tiles.filter((tile) => tile.id !== id);

        // make a temporary copy of the tileSets
        let updatedTileSets: TileSet[] = localFieldTileSets;

        // If the TileSet where the tile comes from is empty... remove it
        if (oldTileSet.tiles.length == 0) {
          updatedTileSets = localFieldTileSets.filter((tileSet) => tileSet.id !== oldTileSet.id);
          console.log('TileSet is empty, removing it from the field');
        } else {
          // RemoveGaps from oldTileSet
          // Move the start coord up 1 if the first tile is removed
          const firstTile: boolean = oldTileSet.startCoord == foundTile.gridColumn;
          if (firstTile) {
            oldTileSet.startCoord += 1;
          }

          if (!firstTile) {
            oldTileSet.tiles = oldTileSet.tiles.map((tile) => {
              if (foundTile.gridColumn < tile.gridColumn) {
                return {
                  ...tile,
                  gridColumn: tile.gridColumn - 1,
                };
              }
              return tile;
            });
            oldTileSet.endCoord -= 1;
          }
        }
        [...updatedTileSets, oldTileSet];

        const updatedTile: Tile = {
          ...foundTile as Tile,
          gridColumn: column,
          gridRow: row,
        };

        return addTileToTileSetOrCreateNewTileSet(updatedTile, updatedTileSets);
      }
      return localFieldTileSets;
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

      if (!localFieldTileSets || localFieldTileSets.length == 0 || !localFieldTileSets[0]) {
        return [{ id: generateUniqueId(), tiles: [tile], gridRow: tile.gridRow, startCoord: tile.gridColumn, endCoord: tile.gridColumn }] as TileSet[];
      }
      // Check if the tile is already in the field
      const isTileAlreadyInField = localFieldTileSets.some((tileSet) => tileSet.tiles.some((t) => t.id === tile.id));

      if (!isTileAlreadyInField) {
        return addTileToTileSetOrCreateNewTileSet(tile, localFieldTileSets);
      }
      return localFieldTileSets;
    },
    onSuccess: (updatedFieldTiles) => {
      queryClient.setQueryData(['fieldTileSets'], updatedFieldTiles);
      setLocalFieldTiles(updatedFieldTiles);
    },
  })


  function generateUniqueId() {
    // To temporarily generate unique IDs for new TileSets
    return `${Date.now()}-${Math.random()}`;
  }


  // This Function adds a tile to a TileSet or creates a new TileSet
  function addTileToTileSetOrCreateNewTileSet(tile: Tile, updatedFieldTiles: TileSet[]) {
    const afterTileSet = localFieldTileSets.find(
      tileSet => tileSet.endCoord + 1 === tile.gridColumn && tileSet.gridRow === tile.gridRow
    );
    if (afterTileSet != null) {
      return updatedFieldTiles.map((tileSet) => {
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
      return [...updatedFieldTiles, newTileSet];
    }
  }


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
      const filteredFieldTileSets = updatedFieldTiles.filter(
        (tileSet) => tileSet.tiles.length > 0
      );

      queryClient.setQueryData(['fieldTileSets'], filteredFieldTileSets);
      setLocalFieldTiles(filteredFieldTileSets);
    },
  })


    const {
    mutate: mutateRemoveAllFieldTiles,
    isPending: isRemovingAllFieldTiles,
    isError: isErrorRemovingAllFieldTiles,
  } = useMutation({
    mutationFn: async () => {
      if (!localFieldTileSets) {
        throw new Error("Tiles data is unavailable");
      }
      return [];
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
    removingAllFieldTiles: mutateRemoveAllFieldTiles,
    isRemovingAllFieldTiles,
    isErrorRemovingAllFieldTiles,
  }
}