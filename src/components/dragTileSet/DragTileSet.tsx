import { useDrag } from "react-dnd";
import { DragTypes } from "../../models/DragTypes";

interface TileProps {
  id: number;
  column: number;
  row: number;
}

export function DragTileSet({ id, column, row }: TileProps) {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: DragTypes.TILESET,
      item: { id },
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
        opacity: opacity,
        gridColumn: column,
        gridRow: row,
      }}>
      HandleDrag
    </div>
  )
}

