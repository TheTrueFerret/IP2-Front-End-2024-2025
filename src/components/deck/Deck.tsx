import { useDeckTiles } from "../../hooks/useDeckTiles";
import { useFieldTiles } from "../../hooks/useFieldTiles";
import { NotificationType } from "../../models/Notification";
import { EmptyTile } from "../emptyTile/EmptyTile";
import { InfoCard } from "../infoCard/InfoCard";
import { Tile } from "../tile/Tile";
import './Deck.css'


export function Deck() {
  const { isErrorDeckTiles, isLoadingDeckTiles, deckTiles, updateDeckTile, addDeckTile, isTileInDeck } = useDeckTiles()
  const { isErrorFieldTiles, isLoadingFieldTiles, fieldTiles, removeFieldTile, isTileInField } = useFieldTiles()

  const hasError = isErrorDeckTiles || isErrorFieldTiles || !deckTiles || !fieldTiles;
  const isLoading = isLoadingDeckTiles || isLoadingFieldTiles;

  if (hasError || isLoading) {
    return (
      <div className='deck'>
        <InfoCard loading={isLoading} notification={
          hasError
              ? {
                title: 'FieldTiles / DeckTiles are Zero',
                description: 'description',
                type: NotificationType.Error,
              }
              : undefined
        } />
      </div>
    )
  }

  const handleDrop = async (id: number, column: number, row: number) => {
    console.log(`Tile ${id} dropped at column ${column}, row ${row}`);

    try {
      const tileInDeck = await isTileInDeck(id);

      console.log(tileInDeck)

      if (!tileInDeck) {
        const tileInField = await isTileInField(id);
        console.log(tileInField)

        if (tileInField) {
          removeFieldTile(tileInField)
          const newTile = { ...tileInField, gridColumn: column, gridRow: row };
          addDeckTile(newTile)
        }
      } else {
        updateDeckTile({ id, column, row })
      }
    } catch (error) {

    }

  };



  let count: number = 1;

  return (
    <div className='deck'>
      {[...Array(2)].map((_, row) =>
        [...Array(10)].map((_, column) => (
          <EmptyTile
            key={count++}
            column={column + 1}
            row={row + 1}
            onDrop={(id) => handleDrop(id, column + 1, row + 1)} />
        ))
      )}

      {deckTiles.map(tile =>
        <Tile
          key={tile.id}
          id={tile.id}
          tileNumber={tile.tileNumber}
          tileColor={tile.tileColor}
          column={tile.gridColumn}
          row={tile.gridRow}
        />
      )}
    </div>
  )
}

