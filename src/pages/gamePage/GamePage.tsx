import { DndProvider } from "react-dnd";
import { Deck } from "../../components/deck/Deck";
import { PlayingField } from "../../components/playingField/PlayingField";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Link } from "react-router-dom";

const dragOptions = {
  //enableMouseEvents: true
}

export function GamePage() {
  return (
    <div className='relative flex justify-center w-screen h-screen bg-neutral-900'>
      <Link to='/' className='absolute text-white text-2xl font-bold flex justify-center items-center h-10 transition-all duration-200 ease-in-out transform hover:scale-105'><p>Exit Game</p></Link>
      <DndProvider backend={HTML5Backend} options={dragOptions}>
        <PlayingField />
        <Deck />
      </DndProvider>
    </div>
  )
}

