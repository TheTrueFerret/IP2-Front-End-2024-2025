import { useTiles } from "../../hooks/useTiles";
import { EmptyTile } from "../emptyTile/EmptyTile";
import { Tile } from "../tile/Tile"
import "./PlayingField.css"



export function PlayingField() {
  const { tiles, updateTile } = useTiles()

  const handleDrop = (id: number, column: number, row: number) => {
    console.log(`Tile ${id} dropped at column ${column}, row ${row}`);
    updateTile({id, column, row})
  };

  if (!tiles) {
    return (
      <div>TILES NOT FOUND</div>
    )
  }

  var count: number = 1;

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

      {tiles.map(tile =>
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