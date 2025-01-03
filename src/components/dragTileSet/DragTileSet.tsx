import { useDrag } from "react-dnd";
import { DragTypes } from "../../models/DragTypes";
import './DragTileSet.css';

interface TileProps {
  id: string;
  column: number;
  row: number;
  disabled: boolean;
}

export function DragTileSet({ id, column, row, disabled }: TileProps) {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: DragTypes.TILE_SET,
      item: { id, type: DragTypes.TILE_SET},
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  )

  return (
    <div ref={dragRef}
      className='DragTileSet'
      style={{
        opacity: disabled ? 0.5 : opacity,
        gridColumn: column,
        gridRow: row,
        pointerEvents: disabled ? "none" : "auto", // Disable interaction
      }}>
      :::
    </div>
  )
}

