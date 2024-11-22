import { DndProvider } from "react-dnd";
import { Deck } from "../../components/deck/Deck";
import { PlayingField } from "../../components/playingField/PlayingField";
import { HTML5Backend } from "react-dnd-html5-backend";

const dragOptions = {
  //enableMouseEvents: true
}

export function GamePage() {
  return (
    <div className='flex justify-center w-screen h-screen bg-gray-800'>
      <DndProvider backend={HTML5Backend} options={dragOptions}>
        <PlayingField />
        <Deck />
      </DndProvider>
    </div>
  )
}

