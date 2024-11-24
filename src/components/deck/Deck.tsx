import { useDeckTiles } from "../../hooks/useDeckTiles";
import { useFieldTiles } from "../../hooks/useFieldTiles";
import { EmptyTile } from "../emptyTile/EmptyTile";
import { Tile } from "../tile/Tile";
import './Deck.css'


export function Deck() {
  const { deckTiles, updateDeckTile, addDeckTile } = useDeckTiles()
  const { fieldTiles, removeFieldTile } = useFieldTiles()


  if (!deckTiles || !fieldTiles) {
    return (
      <div>tiles not found</div>
    )
  }

  const handleDrop = (id: number, column: number, row: number) => {
    console.log(`Tile ${id} dropped at column ${column}, row ${row}`);

    const tileInDeck = deckTiles.find((tile) => tile.id === id);

    if (!tileInDeck) {
      const tileInField = fieldTiles.find((tile) => tile.id === id);
      console.log(tileInField)

      if (tileInField) {
        removeFieldTile(tileInField)
        tileInField.gridColumn = column;
        tileInField.gridRow = row;
        addDeckTile(tileInField)
      }
    } else {
      updateDeckTile({ id, column, row })
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

