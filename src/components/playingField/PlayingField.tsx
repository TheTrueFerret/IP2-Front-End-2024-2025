import { useDeckTiles } from "../../hooks/useDeckTiles";
import { useFieldTiles } from "../../hooks/useFieldTiles";
import { EmptyTile } from "../emptyTile/EmptyTile";
import { Tile } from "../tile/Tile"
import "./PlayingField.css"



export function PlayingField() {
  const { fieldTiles, updateFieldTile, addFieldTile } = useFieldTiles()
  const { deckTiles, removeDeckTile } = useDeckTiles()


  if (!fieldTiles || !deckTiles) {
    return (
      <div>tiles not found</div>
    )
  }

  const handleDrop = (id: number, column: number, row: number) => {
    console.log(`Tile ${id} dropped at column ${column}, row ${row}`);

    const tileInField = fieldTiles.find((tile) => tile.id === id);

    console.log(tileInField)

    if (!tileInField) {
      const tileInDeck = deckTiles.find((tile) => tile.id === id);
      console.log(tileInDeck)

      if (tileInDeck) {
        removeDeckTile(tileInDeck)
        
        const newTile = { ...tileInDeck, gridColumn: column, gridRow: row };
        
        addFieldTile(newTile)
      }
    } else {
      updateFieldTile({ id, column, row })
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