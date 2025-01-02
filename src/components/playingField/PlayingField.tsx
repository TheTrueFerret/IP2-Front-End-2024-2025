import { useCurrentPlayerTurn } from "../../hooks/useCurrentPlayerTurn";
import { useDeckTiles } from "../../hooks/useDeckTiles";
import { useFieldTiles } from "../../hooks/useFieldTiles";
import { usePlayerId } from "../../hooks/usePlayerId";
import { NotificationType } from "../../models/Notification";
import { DragTileSet } from "../dragTileSet/DragTileSet";
import { EmptyTile } from "../emptyTile/EmptyTile";
import { NotificationCard } from "../notifications/notificationCard/NotificationCard";
import { Tile } from "../tile/Tile"
import "./PlayingField.css"



export function PlayingField() {
  const { isErrorFieldTiles, isLoadingFieldTiles, fieldTileSets, updateFieldTile, addFieldTile, isTileInField, moveTileSet } = useFieldTiles();
  const { isErrorDeckTiles, isLoadingDeckTiles, removeDeckTile, isTileInDeck } = useDeckTiles();
  const { getCachedCurrentPlayerTurn } = useCurrentPlayerTurn();
  const { playerId } = usePlayerId();

  const hasError = isErrorDeckTiles || isErrorFieldTiles;
  const isLoading = isLoadingDeckTiles || isLoadingFieldTiles;

  if (hasError || isLoading) {
    return (
      <section className="PlayingField flex items-center justify-center">
        <NotificationCard loading={isLoading} notification={
          hasError
            ? {
              title: 'Failed to Load DeckTiles or FieldTiles',
              description: 'DeckTiles or FieldTiles are Empty',
              type: NotificationType.Error,
            }
            : undefined
        } />
      </section>
    );
  }


  const currentPlayerTurn = getCachedCurrentPlayerTurn();
  console.log("Current Player Turn: ", currentPlayerTurn);
  const shouldDisable = currentPlayerTurn?.id !== playerId;


  const handleDropTile = async (id: string, column: number, row: number) => {
    console.log(`Tile ${id} dropped at column ${column}, row ${row}`);

    try {
      const tileInField = await isTileInField(id);
      console.log(tileInField);

      if (!tileInField) {
        const tileInDeck = await isTileInDeck(id);
        console.log(tileInDeck);

        if (tileInDeck) {
          removeDeckTile(tileInDeck)
          const newTile = { ...tileInDeck, gridColumn: column, gridRow: row };
          console.log("the NEW TILE!!!!");
          console.log(newTile);
          addFieldTile(newTile);
        }
      } else {
        updateFieldTile({ id, column, row });
      }
    } catch (error) {
      console.error("Error checking tile in field or deck:", error);
    }
  };


  const handleDropTileSet = async (tileSetId: string, column: number, row: number) => {
    console.log(`TileSet ${tileSetId} dropped at column ${column}, row ${row}`);
    moveTileSet({ tileSetId: tileSetId, newColumn: column, newRow: row });
  };

  let countEmptyTile: number = 1;

  if (!Array.isArray(fieldTileSets) || fieldTileSets.length === 0) {
    return (
      <section className='PlayingField'>
        {[...Array(7)].map((_, row) =>
          [...Array(17)].map((_, column) => (
            <EmptyTile
              key={countEmptyTile++}
              column={column + 1}
              row={row + 1}
              onDropTile={(tileId) => !shouldDisable && handleDropTile(tileId, column + 1, row + 1)}
              onDropTileSet={(tileSetId) => !shouldDisable && handleDropTileSet(tileSetId, column + 1, row + 1)}
            />
          ))
        )}
      </section>
    )
  }


  return (
    <section className='PlayingField'>
      {[...Array(7)].map((_, row) =>
        [...Array(17)].map((_, column) => (
          <EmptyTile
            key={countEmptyTile++}
            column={column + 1}
            row={row + 1}
            onDropTile={(tileId) => !shouldDisable && handleDropTile(tileId, column + 1, row + 1)}
            onDropTileSet={(tileSetId) => !shouldDisable && handleDropTileSet(tileSetId, column + 1, row + 1)}
            disabled={shouldDisable}
          />
        ))
      )}

      {fieldTileSets.map((tileSet) => {
        return tileSet.tiles.map((tile) => (
          <Tile
            key={tile.id}
            id={tile.id}
            tileNumber={tile.numberValue}
            tileColor={tile.color}
            column={tile.gridColumn}
            row={tile.gridRow}
            disabled={shouldDisable}
          />
        ));
      })}

      {fieldTileSets.map((tileSet) => (
        <DragTileSet
          key={tileSet.id}
          id={tileSet.id}
          column={tileSet.startCoord - 1}
          row={tileSet.gridRow}
          disabled={shouldDisable}
        />
      ))}
    </section>
  )
}
