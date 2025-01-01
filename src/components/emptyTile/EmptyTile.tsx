import { useDrop } from "react-dnd";
import "./EmptyTile.css"
import { DragTypes } from "../../models/DragTypes";


interface EmptyTileProps {
  column: number;
  row: number;
  onDropTile: (tileId: string) => void;
  onDropTileSet?: (tileSetId: string) => void;
}

export function EmptyTile({ column, row, onDropTile, onDropTileSet }: EmptyTileProps) {
  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: [DragTypes.TILE, DragTypes.TILE_SET],
      drop: (item: { id: string; type: string }) => {
        if (item.type == DragTypes.TILE) {
          onDropTile(item.id);
        } else if (item.type == DragTypes.TILE_SET && onDropTileSet) {
          onDropTileSet(item.id);
        }
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