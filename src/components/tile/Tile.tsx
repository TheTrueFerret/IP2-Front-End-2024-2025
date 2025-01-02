import { useDrag } from "react-dnd";
import "./Tile.css"
import { DragTypes } from "../../models/DragTypes";


interface TileProps {
  id: string;
  tileNumber: number;
  tileColor: string;
  column: number;
  row: number;
  disabled: boolean;
}

export function Tile({ id, tileNumber, tileColor, column, row, disabled }: TileProps) {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: DragTypes.TILE,
      item: { id, type: DragTypes.TILE },
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
        opacity: opacity || disabled ? 0.5 : 1,
        color: tileColor,
        gridColumn: column,
        gridRow: row,
        pointerEvents: disabled ? "none" : "auto", // Disable interaction
      }}>
      {tileNumber}
    </div>
  )
}


