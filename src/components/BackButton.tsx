import { Link } from "react-router-dom";


interface BackButtonProps {
  backAction: (() => void) | null;
}

export function BackButton({ backAction }: BackButtonProps) {
  return (
    <div className='z-20 absolute top-2 left-4 flex flex-row'>
      {backAction != null ? (
        <button className='bg-neutral-900/60 backdrop-blur rounded-3xl text-4xl font-extrabold text-white pr-5 pl-5 pb-2 hover:scale-110' onClick={backAction}>&lt;</button>
      ) : (
        <div className='p-8'></div>
      )}
      <Link className='p-4' to='/'>
        <img className='w-32' src="/rummikubLogo.png"></img>
      </Link>
    </div>
  )
}


