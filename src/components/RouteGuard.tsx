import { useContext } from "react"
import SecurityContext from "../context/SecurityContext"
import { NotificationCard } from "./notifications/notificationCard/NotificationCard"
import { NotificationType } from "../models/Notification"


interface RouteGuardProps {
  children: React.ReactNode
}


export function RouteGuard({ children }: RouteGuardProps) {
  const { isAuthenticated } = useContext(SecurityContext)

  if (isAuthenticated()) {
    return children
  } else {
    return <NotificationCard loading={false} isLogin={true} notification={
      {
        title: 'You are not Logged in!',
        description: 'Please click this loging button to login or.. make an account!',
        type: NotificationType.Info,
      }
    } />
  }
}

