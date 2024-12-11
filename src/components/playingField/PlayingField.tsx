import { useDeckTiles } from "../../hooks/useDeckTiles";
import { useFieldTiles } from "../../hooks/useFieldTiles";
import { NotificationType } from "../../models/Notification";
import { EmptyTile } from "../emptyTile/EmptyTile";
import { NotificationCard } from "../notifications/notificationCard/NotificationCard";
import { Tile } from "../tile/Tile"
import "./PlayingField.css"



export function PlayingField() {
  const { isErrorFieldTiles, isLoadingFieldTiles, fieldTiles, updateFieldTile, addFieldTile, isTileInField } = useFieldTiles()
  const { isErrorDeckTiles, isLoadingDeckTiles, deckTiles, removeDeckTile, isTileInDeck } = useDeckTiles()

  const hasError = isErrorDeckTiles || isErrorFieldTiles || !deckTiles || !fieldTiles;
  const isLoading = isLoadingDeckTiles || isLoadingFieldTiles;

  if (hasError || isLoading) {
    return (
      <section className="PlayingField flex items-center justify-center">
        <NotificationCard
          loading={isLoading}
          notification={
            hasError
              ? {
                title: 'FieldTiles / DeckTiles are Zero',
                description: 'description',
                type: NotificationType.Error,
              }
              : undefined
          }
        />
      </section>
    );
  }

  const handleDrop = async (id: number, column: number, row: number) => {
    console.log(`Tile ${id} dropped at column ${column}, row ${row}`);

    try {

      const tileInField = await isTileInField(id);

      console.log(tileInField)

      if (!tileInField) {

        const tileInDeck = await isTileInDeck(id);
        console.log(tileInDeck)

        if (tileInDeck) {
          removeDeckTile(tileInDeck)
          const newTile = { ...tileInDeck, gridColumn: column, gridRow: row };
          addFieldTile(newTile)
        }
      } else {
        updateFieldTile({ id, column, row })
      }

    } catch (error) {
      console.error("Error checking tile in field or deck:", error);
    }
  };


  let count: number = 1;

  return (
    <section className='PlayingField'>
      {[...Array(7)].map((_, row) =>
        [...Array(17)].map((_, column) => (
          <EmptyTile
            key={count++}
            column={column + 1}
            row={row + 1}
            onDrop={(id) => handleDrop(id, column + 1, row + 1)} />
        ))
      )}

      {fieldTiles.map(tile =>
        <Tile
          key={tile.id}
          id={tile.id}
          tileNumber={tile.tileNumber}
          tileColor={tile.tileColor}
          column={tile.gridColumn}
          row={tile.gridRow}
        />
      )}
    </section>
  )
}