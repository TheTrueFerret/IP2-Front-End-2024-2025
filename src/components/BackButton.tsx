import { Link } from "react-router-dom";


interface BackButtonProps {
  backLink: string;
}

export function BackButton({ backLink }: BackButtonProps) {
  return (
    <div>
      <Link to={backLink}>Back</Link>
      <Link to='/'>
        <img></img>
      </Link>
    </div>
  )
}


