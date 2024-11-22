import { useDrag } from "react-dnd";
import "./Tile.css"
import { DragTypes } from "../../models/DragTypes";


interface TileProps {
  id: number;
  tileNumber: number;
  tileColor: string;
  column: number;
  row: number;
}

export function Tile({ id, tileNumber, tileColor, column, row }: TileProps) {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: DragTypes.TILE,
      item: { id },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  )

  return (
    <div ref={dragRef}
      className='NormalTile'
      style={{
        opacity: opacity,
        color: tileColor,
        gridColumn: column,
        gridRow: row,
      }}>
      {tileNumber}
    </div>
  )
}


