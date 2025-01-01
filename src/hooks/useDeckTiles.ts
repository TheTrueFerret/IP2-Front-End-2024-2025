import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Tile } from "../models/Tile";
import { getDeckTiles, getDrawTile } from "../services/tileService";
import { usePlayerId } from "./usePlayerId";
import { useGameId } from "./useGameId";


export function useDeckTiles() {
  const queryClient = useQueryClient();

  const { playerId } = usePlayerId();
  const { getCachedGameId } = useGameId();

  const width: number = 11;
  const height: number = 2;



  const { isLoading, isError, data: deckTiles } = useQuery(
    {
      queryKey: ['deckTiles'],
      queryFn: () => {
        if (!playerId) return Promise.resolve(null); // no PlayerId Return Nothing
        return getDeckTiles(playerId);
      },
      enabled: !!playerId, // Only fetch if playerId is Set
      initialData: [] as Tile[], // Initial value
    }
  )


  const {
    mutate: mutateUpdateDeckTile,
    isPending: isUpdatingDeckTile,
    isError: isErrorUpdatingDeckTile,
  } = useMutation({
    mutationFn: async ({ id, column, row }: { id: string, column: number, row: number }) => {
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

      // Check if the tile is already in the deck
      const isTileAlreadyInDeck = deckTiles.some((t) => t.id === tile.id);

      if (!isTileAlreadyInDeck) {
        const updatedDeckTiles = [...deckTiles, tile];
        return updatedDeckTiles
      }
      return deckTiles
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



  const {
    mutateAsync: mutateIsTileInDeck,
    isPending: isCheckingTileInDeck,
    isError: isErrorCheckingTileInDeck,
  } = useMutation({
    mutationFn: async (id: string) => {
      if (!deckTiles) {
        throw new Error("Tiles data is unavailable");
      }

      const isTileInDeck = deckTiles.find((tile) => tile.id === id);
      return isTileInDeck;
    },
  })



  const {
    mutate: mutateDrawTile,
    isPending: isDrawingTile,
    isError: isErrorDrawingTile,
  } = useMutation({
    mutationFn: async () => {
      if (!deckTiles) {
        throw new Error("Tiles data is unavailable");
      }

      const gameId = getCachedGameId();

      if (gameId && playerId) {
        const response = await getDrawTile(gameId, playerId);

        if (response) {
          for (let column = 1; column <= width; column++) {
            for (let row = 1; row <= height; row++) {

              if (!deckTiles.some(tile =>
                tile.gridRow === row && tile.gridColumn === column
              )) {
                response.gridColumn = column;
                response.gridRow = row;
                console.log(response);
                const updatedDeckTiles = [...deckTiles, response];
                return updatedDeckTiles
              }
            }
          }
        }
      }
    },
    onSuccess: (updatedDeckTiles) => {
      queryClient.setQueryData(['deckTiles'], updatedDeckTiles);
    },
  })

  const {
    mutate: mutateGetDeckTiles,
    isPending: isGettingDeckTiles,
    isError: isErrorGettingDeckTiles,
  } = useMutation({
    mutationFn: async () => {
      if (!deckTiles) {
        throw new Error("Tiles data is unavailable");
      }

      if (playerId) {
        const newDeckTiles = await getDeckTiles(playerId)
        return newDeckTiles;
      }
      return deckTiles;
    },
    onSuccess: (updatedDeckTiles) => {
      queryClient.setQueryData(['deckTiles'], updatedDeckTiles);
    }
  })


  return {
    isLoadingDeckTiles: isLoading,
    isErrorDeckTiles: isError,
    deckTiles,
    updateDeckTile: mutateUpdateDeckTile,
    isUpdatingDeckTile,
    isErrorUpdatingDeckTile,
    addDeckTile: mutateAddDeckTile,
    isAddingDeckTile,
    isErrorAddingDeckTile,
    removeDeckTile: mutateRemoveDeckTile,
    isRemovingDeckTile,
    isErrorRemovingDeckTile,
    isTileInDeck: mutateIsTileInDeck,
    isCheckingTileInDeck,
    isErrorCheckingTileInDeck,
    drawTile: mutateDrawTile,
    isDrawingTile,
    isErrorDrawingTile,
    getDeckTiles: mutateGetDeckTiles,
    isGettingDeckTiles,
    isErrorGettingDeckTiles,
  }
}