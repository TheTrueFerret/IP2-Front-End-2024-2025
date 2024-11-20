import { Link } from "react-router-dom";




export function HomePage() {
  return (
    <div className='bg-gray-800'>
      <h1>RUMMIKUB</h1>
      <Link to='/Game'>Start Game</Link>
    </div>
  )
}

