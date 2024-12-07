import "./NotificationAlert.css"


interface NotificationAlertProps {
  notification: Notification
  buttons: boolean
}



export function NotificationAlert({notification, buttons}: NotificationAlertProps) {
  return (
    <div>
      Big Floating Notification 
    </div>
  )
}