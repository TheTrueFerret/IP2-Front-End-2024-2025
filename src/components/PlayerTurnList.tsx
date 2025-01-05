import { useEffect, useRef } from "react";
import { useCurrentPlayerTurn } from "../hooks/useCurrentPlayerTurn"
import { usePlayers } from "../hooks/usePlayers"
import { NotificationType } from "../models/Notification"
import { NotificationCard } from "./notifications/notificationCard/NotificationCard"
import { useFieldTiles } from "../hooks/useFieldTiles";
import { usePlayerId } from "../hooks/usePlayerId";
import { useDeckTiles } from "../hooks/useDeckTiles";



export function PlayerTurnList() {
  const { players, isError, isLoading } = usePlayers();
  const { currentPlayerTurn } = useCurrentPlayerTurn();
  const { getTileSets } = useFieldTiles();
  const { playerId } = usePlayerId();
  const { getDeckTiles } = useDeckTiles();

  // Reference to store the previous player turn
  const previousPlayerTurnRef = useRef(currentPlayerTurn);

  useEffect(() => {
    // Check if currentPlayerTurn has changed
    if (previousPlayerTurnRef.current && currentPlayerTurn && previousPlayerTurnRef.current.id !== currentPlayerTurn.id) {
      console.log('Player turn has changed from:', previousPlayerTurnRef.current.id, 'to:', currentPlayerTurn.id);

      getTileSets();
      if (currentPlayerTurn.id === playerId) {
        getDeckTiles();
      }

      // Update the previous player turn reference
      previousPlayerTurnRef.current = currentPlayerTurn;
    }
    // Set the initial previousPlayerTurnRef if it's the first render
    if (!previousPlayerTurnRef.current && currentPlayerTurn) {
      previousPlayerTurnRef.current = currentPlayerTurn;
    }
  }, [currentPlayerTurn]);


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
        <div key={player.id} className='flex flex-col items-center text-xl font-bold'>
          <h3 className={`p-4 ${currentPlayerTurn.id === player.id ? 'text-yellow-400' : ''}`}>{player.username}</h3>
        </div>
      ))}
    </div>
  )
}