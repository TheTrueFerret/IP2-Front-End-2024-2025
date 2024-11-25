import { useDrop } from "react-dnd";
import "./EmptyTile.css"
import { DragTypes } from "../../models/DragTypes";


interface EmptyTileProps {
  column: number;
  row: number;
  onDrop: (id: number) => void;
}

export function EmptyTile({ column, row, onDrop }: EmptyTileProps) {
  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: DragTypes.TILE,
      drop: (item: { id: number }) => {
        onDrop(item.id);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    []
  );
  

  return (
    <div
      ref={dropRef}
      className='EmptyTile'
      style={{
        gridColumn: column,
        gridRow: row,
        backgroundColor: isOver ? "lightblue" : "transparent",
        borderRadius: 10
      }}>
    </div>
  )
}