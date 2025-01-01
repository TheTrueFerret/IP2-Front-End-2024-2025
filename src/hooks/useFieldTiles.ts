import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Tile } from "../models/Tile";
import { getPlayingFieldTiles } from "../services/tileService";
import { useGameId } from "./useGameId";
import { TileSet } from "../models/TileSet";


export function useFieldTiles() {
  const queryClient = useQueryClient();

  const { getCachedGameId } = useGameId();
  const gameId = getCachedGameId();


  const { isLoading, isError, data: fieldTileSets } = useQuery(
    {
      queryKey: ['fieldTileSets'],
      queryFn: () => {
        if (!gameId) return Promise.resolve(null); // no gameId Return Nothing
        return getPlayingFieldTiles(gameId)
      },
      enabled: !!gameId, // Only fetch if gameId is set
      initialData: [] as TileSet[],
    }
  )


  const {
    mutate: mutateUpdateFieldTile,
    isPending: isUpdatingFieldTile,
    isError: isErrorUpdatingFieldTile,
  } = useMutation({
    mutationFn: async ({ id, column, row }: { id: string, column: number, row: number }) => {
      if (!fieldTileSets) {
        throw new Error("Tiles data is unavailable");
      }

      // TODO Move TileSets?
      const updatedFieldTileSets = fieldTileSets.map((tileSet) => {
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
    },
  })



  const {
    mutate: mutateAddTileToField,
    isPending: isAddingTileToField,
    isError: isErrorAddingTileToField,
  } = useMutation({
    mutationFn: async (tile: Tile) => {
      if (!fieldTileSets) {
        throw new Error("Tiles data is unavailable");
      }

      // Check if the tile is already in the field
      const isTileAlreadyInField = fieldTileSets.some((tileSet) => tileSet.tiles.some((t) => t.id === tile.id));

      if (!isTileAlreadyInField) {
        const afterTileSet = fieldTileSets.find(
          tileSet => tileSet.endCoord + 1 === tile.gridColumn
        );

        let updatedFieldTileSets;

        // To temporarily generate unique IDs for new TileSets
        const generateUniqueId = () => `${Date.now()}-${Math.random()}`;

        if (afterTileSet != null) {
          updatedFieldTileSets = fieldTileSets.map((tileSet) => {
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
            // IMPORTANT: DO NOT GIVE THIS ID TO THE BACKEND!!!!
            // WHEN A NEW TILESET IS CREATED, NO ID WILL BE GIVEN TO THE BACKEND TO AVOID DUPLICATE ID'S
            id: generateUniqueId(),
            gridRow: tile.gridRow,
            startCoord: tile.gridColumn,
            endCoord: tile.gridColumn,
            tiles: [tile]
          };
          updatedFieldTileSets = [...fieldTileSets, newTileSet];
        }
        console.log('Added a Tile to fieldTiles:', updatedFieldTileSets);
        return updatedFieldTileSets;

      }
      console.log('Tile is already in the field!!!');
      return fieldTileSets;
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
      if (!fieldTileSets) {
        throw new Error("Tiles data is unavailable");
      }

      const updatedFieldTiles = fieldTileSets.map((tileSet) => ({
        ...tileSet,
        tiles: tileSet.tiles.filter((tile) => tile.id !== tileToRemove.id),
      }));

      console.log('Removed a Tile fieldTiles:', updatedFieldTiles);

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
    mutationFn: async (id: string) => {
      if (!fieldTileSets) {
        throw new Error("Tiles data is unavailable");
      }

      const tileSetInField = fieldTileSets.find((tileSet) =>
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
      if (!fieldTileSets) {
        throw new Error("Tiles data is unavailable");
      }

      const updatedFieldTileSets = fieldTileSets.map((tileSet) => {
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

      console.log('Moved TileSet:', updatedFieldTileSets);

      return updatedFieldTileSets;
    },
    onSuccess: (updatedFieldTileSets) => {
      queryClient.setQueryData(['fieldTileSets'], updatedFieldTileSets);
    },
  })


  const {
    mutateAsync: mutateGetTileSets,
    isPending: isGettingTileSets,
    isError: isErrorGettingTileSets,
  } = useMutation({
    mutationFn: async () => {
      if (!fieldTileSets) {
        throw new Error("Tiles data is unavailable");
      }

      if (gameId) {
        const newPlayingFieldTileSets = await getPlayingFieldTiles(gameId);
        return newPlayingFieldTileSets;
      }
      return fieldTileSets;
    },
    onSuccess: (updatedFieldTileSets) => {
      queryClient.setQueryData(['fieldTileSets'], updatedFieldTileSets);
    }
  })


  return {
    isLoadingFieldTiles: isLoading,
    isErrorFieldTiles: isError,
    fieldTileSets,
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