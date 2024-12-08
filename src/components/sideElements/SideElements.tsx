import React from 'react'

interface SideElementsProps {
  upperElement: React.ReactNode; // Content for the upper element
  bottemElement: React.ReactNode; // Content for the bottem element
}


export function SideElements({ upperElement, bottemElement }: SideElementsProps) {
  return (
    <div className='flex flex-col gap-20 min-h-screen pr-48'>
      <div className='flex-grow flex-col text-white bg-neutral-900/60 backdrop-blur p-20 rounded-3xl shadow-md'>
        {upperElement}
      </div>
      <div className='flex-grow bg-game-gradient text-white backdrop-blur p-20 rounded-3xl mt-auto rounded-b-none shadow-md'>
        {bottemElement}
      </div>
    </div>
  )
}
