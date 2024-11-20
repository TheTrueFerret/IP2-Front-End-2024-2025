import { Tile } from "../tile/Tile"
import "./PlayingField.css"


export function PlayingField() {
  return (
    <section className='PlayingField'>
      <Tile
      tileNumber={7}
      numberColor="blue"
      column={6}
      row={4}
      />
    </section>
  )
}