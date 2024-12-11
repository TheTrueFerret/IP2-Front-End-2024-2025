import { useContext } from "react"
import SecurityContext from "../context/SecurityContext"


interface RouteGuardProps {
  children: React.ReactNode
}


export function RouteGuard({ children }: RouteGuardProps) {
  const { isAuthenticated, login } = useContext(SecurityContext)

  if (isAuthenticated()) {
    return children
  } else {
    return <button onClick={login}> Login </button>
  }
}

