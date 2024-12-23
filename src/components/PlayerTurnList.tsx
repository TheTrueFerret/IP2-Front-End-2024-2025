import { useCurrentPlayerTurn } from "../hooks/useCurrentPlayerTurn"
import { usePlayers } from "../hooks/usePlayers"
import { NotificationType } from "../models/Notification"
import { NotificationCard } from "./notifications/notificationCard/NotificationCard"



export function PlayerTurnList() {
  const { players, isError, isLoading } = usePlayers()
  const { currentPlayerTurn } = useCurrentPlayerTurn();

  if (!currentPlayerTurn || !players || isLoading || isError) {
    return (
      <div className='absolute flex flex-row justify-center'>
        <NotificationCard loading={isLoading} notification={
          isError
            ? {
              title: 'Failed to Load players',
              description: 'players object is Empty',
              type: NotificationType.Error,
            }
            : undefined
        } />
      </div>
    )
  }

  return (
    <div className='absolute flex flex-row justify-center text-white'>
      {players.map((player) => (
        <div key={player.id} className='flex flex-col items-center'>
          <h3 className={`p-4 ${currentPlayerTurn.id === player.id ? 'text-yellow-400' : ''}`}>{player.username}</h3>
        </div>
      ))}
    </div>
  )
}