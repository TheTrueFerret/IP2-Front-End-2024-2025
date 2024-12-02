import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Tile } from "../models/Tile";
import { setDeckTiles } from "../services/tileService";
import { useEffect, useState } from "react";
import { getDeckTilesLocaly } from "../services/dataService";


export function useDeckTiles() {
  const queryClient = useQueryClient();

  const [localDeckTiles, setLocalDeckTiles] = useState<Tile[] | undefined>(undefined);

  const { isLoading, isError, data } = useQuery(
    {
      queryKey: ['deckTiles'],
      queryFn: () => getDeckTilesLocaly(),
      initialData: [] as Tile[],
    }
  )


  useEffect(() => {
    if (data && data.length > 0) {
      setLocalDeckTiles(data); // Set the fetched data to local state
    }
  }, [data]);


  const {
    mutate: mutateSetDeckTiles,
    isPending: isSettingDeckTiles,
    isError: isErrorSettingDeckTiles,
  } = useMutation({
    mutationFn: async (tiles: Tile[]) => {
      return await setDeckTiles(tiles);  // Call your API to set deck tiles
    },
    onSuccess: (updatedDeckTiles) => {
      queryClient.setQueryData(['deckTiles'], updatedDeckTiles);  // Update cache with new data
      setLocalDeckTiles(updatedDeckTiles);  // Also update local state
    },
  });



  const {
    mutate: mutateUpdateDeckTile,
    isPending: isUpdatingDeckTile,
    isError: isErrorUpdatingDeckTile,
  } = useMutation({
    mutationFn: async ({ id, column, row }: { id: number, column: number, row: number }) => {
      if (!localDeckTiles) {
        throw new Error("Tiles data is unavailable");
      }

      // Update the specific tile in the tiles array
      const updatedDeckTiles = localDeckTiles.map((tile) => {
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
      setLocalDeckTiles(updatedDeckTiles);
    },
  })



  const {
    mutate: mutateAddDeckTile,
    isPending: isAddingDeckTile,
    isError: isErrorAddingDeckTile,
  } = useMutation({
    mutationFn: async (tile: Tile) => {
      if (!localDeckTiles) {
        throw new Error("Tiles data is unavailable");
      }

      // Check if the tile is already in the deck
      const isTileAlreadyInDeck = localDeckTiles.some((t) => t.id === tile.id);

      if (!isTileAlreadyInDeck) {
        const updatedDeckTiles = [...localDeckTiles, tile];
        setLocalDeckTiles(updatedDeckTiles);
        return updatedDeckTiles
      }
      return localDeckTiles
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
      if (!localDeckTiles) {
        throw new Error("Tiles data is unavailable");
      }
      const updatedDeckTiles = localDeckTiles.filter((deckTile) => deckTile.id !== tile.id);
      setLocalDeckTiles(updatedDeckTiles);
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
    mutationFn: async (id: number) => {
      if (!localDeckTiles) {
        throw new Error("Tiles data is unavailable");
      }

      const isTileInDeck = localDeckTiles.find((tile) => tile.id === id);
      return isTileInDeck;
    },
  })



  useEffect(() => {
    console.log('Updated deckTiles:', localDeckTiles);
  }, [localDeckTiles]);

  

  return {
    isLoading,
    isError,
    deckTiles: localDeckTiles,
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
    isTileInDeck: mutateIsTileInDeck,
    isCheckingTileInDeck,
    isErrorCheckingTileInDeck,
  }
}