import "./Tile.css"

interface TileProps {
  tileNumber: number;
  numberColor: string;
  column: number;
  row: number;
}

export function Tile({ tileNumber, numberColor, column, row }: TileProps) {
  return (
    <div
      className='NormalTile'
      style={{
        color: numberColor,
        gridColumn: column,
        gridRow: row,
      }}>
      {tileNumber}
    </div>
  )
}


