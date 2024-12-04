import { Link } from "react-router-dom";




export function HomePage() {
  return (
    <section className="bg-gradient-to-br bg-neutral-900 w-screen h-screen text-white flex flex-col justify-center items-center">
      <h1 className="text-8xl font-bold tracking-widest drop-shadow-lg">RUMMIKUB</h1>
      <p className="text-xl text-gray-400 mt-4 italic">Integration Project 2 by team Twelve</p>
      <Link
        to="/Game"
        className="mt-12 px-8 py-4 text-4xl font-semibold rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 gradient-button"
        >
        Start Game
      </Link>
        <Link
            to="/Lobby"
            className="mt-12 px-8 py-4 text-4xl font-semibold rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 gradient-button"
        >
            Lobby
        </Link>
    </section>
  )
}

