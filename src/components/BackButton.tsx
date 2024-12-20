import { Link } from "react-router-dom";


interface BackButtonProps {
  backLink: string | null;
}

export function BackButton({ backLink }: BackButtonProps) {
  return (
    <div className='z-20 absolute top-2 left-4 flex flex-row'>
      {backLink != null ? (
        <Link className='text-4xl font-extrabold text-white pr-4 pl-4 hover:scale-110' to={backLink}>&lt;</Link>
      ) : (
        <div className='p-7'></div>
      )}
      <Link className='p-4' to='/'>
        <img className='w-32' src="../../../public/rummikubLogo.png"></img>
      </Link>
    </div>
  )
}


