import { useDeckTiles } from "../../hooks/useDeckTiles";
import { useFieldTiles } from "../../hooks/useFieldTiles";
import { NotificationType } from "../../models/Notification";
import { DragTileSet } from "../dragTileSet/DragTileSet";
import { EmptyTile } from "../emptyTile/EmptyTile";
import { NotificationCard } from "../notifications/notificationCard/NotificationCard";
import { Tile } from "../tile/Tile"
import "./PlayingField.css"


interface PlayingFieldProps {
  disabled: boolean;
}

export function PlayingField({ disabled }: PlayingFieldProps) {
  const { isErrorFieldTiles, isLoadingFieldTiles, fieldTileSets, updateFieldTile, addFieldTile, isTileInField, moveTileSet } = useFieldTiles();
  const { isErrorDeckTiles, isLoadingDeckTiles, removeDeckTile, isTileInDeck } = useDeckTiles();

  const hasError = isErrorDeckTiles || isErrorFieldTiles;
  const isLoading = isLoadingDeckTiles || isLoadingFieldTiles;


  if (isLoading) {
    <section className="PlayingField flex items-center justify-center">
      <NotificationCard loading={isLoading} notification={undefined} />
    </section>
  }


  if (hasError || isLoading) {
    return (
      <section className="PlayingField flex items-center justify-center">
        <NotificationCard loading={false} notification={
          {
              title: 'Failed to Load DeckTiles or FieldTiles',
              description: 'DeckTiles or FieldTiles are Empty',
              type: NotificationType.Error,
          }
        } />
      </section>
    );
  }


  const handleDropTile = async (id: string, column: number, row: number) => {
    console.log(`Tile ${id} dropped at column ${column}, row ${row}`);

    try {
      const tileInField = await isTileInField(id);
      console.log("tile in field? " + tileInField);

      if (!tileInField) {
        const tileInDeck = await isTileInDeck(id);
        console.log("tile in the deck? " + tileInDeck);

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
        {[...Array(11)].map((_, row) =>
          [...Array(22)].map((_, column) => (
            <EmptyTile
              key={countEmptyTile++}
              column={column + 1}
              row={row + 1}
              onDropTile={(tileId) => handleDropTile(tileId, column + 1, row + 1)}
              onDropTileSet={(tileSetId) => handleDropTileSet(tileSetId, column + 1, row + 1)}
              disabled={disabled}
            />
          ))
        )}
      </section>
    )
  }


  return (
    <section className='PlayingField'>
      {[...Array(11)].map((_, row) =>
        [...Array(22)].map((_, column) => (
          <EmptyTile
            key={countEmptyTile++}
            column={column + 1}
            row={row + 1}
            onDropTile={(tileId) => handleDropTile(tileId, column + 1, row + 1)}
            onDropTileSet={(tileSetId) => handleDropTileSet(tileSetId, column + 1, row + 1)}
            disabled={disabled}
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
            disabled={disabled}
          />
        ));
      })}

      {fieldTileSets.map((tileSet) => (
        <DragTileSet
          key={tileSet.id}
          id={tileSet.id}
          column={tileSet.startCoord - 1}
          row={tileSet.gridRow}
          disabled={disabled}
        />
      ))}
    </section>
  )
}
