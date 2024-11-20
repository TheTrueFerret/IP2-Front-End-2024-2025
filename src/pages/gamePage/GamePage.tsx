import { Deck } from "../../components/deck/Deck";
import { PlayingField } from "../../components/playingField/PlayingField";



export function GamePage() {
  return (
    <div className='flex justify-center w-screen h-screen bg-gray-800'>
      <PlayingField />
      <Deck />
    </div>
  )
}

