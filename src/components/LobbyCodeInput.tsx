import { useState } from "react";
import { useLobbyId } from "../hooks/useLobbyId";
import { useNavigate } from "react-router-dom";
import { NotificationType } from "../models/Notification";
import { NotificationCard } from "./notifications/notificationCard/NotificationCard";


export function LobbyCodeInput() {
  const [gameCode, setGameCode] = useState('')
  const { joinLobbyByCode, isJoiningLobbyByCode, isErrorJoiningLobbyByCode } = useLobbyId()
  const navigate = useNavigate();


  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Here you can add the logic to submit the game code
    console.log('Game code:', gameCode);
    joinLobbyByCode(gameCode)
    navigate('/Lobby')
  };


  if (isJoiningLobbyByCode || isErrorJoiningLobbyByCode) {
    return (
      <NotificationCard
        loading={isJoiningLobbyByCode}
        notification={
          isErrorJoiningLobbyByCode ?
            {
              title: 'Failed to Load The Lobby',
              description: 'The Lobby is Empty So no Lobby can be Returned',
              type: NotificationType.Error,
            }
            : undefined
        }
      />
    )
  }


  return (
    <form onSubmit={handleSubmit} className="min-w-fit relative bg-neutral-900/60 backdrop-blur flex flex-col items-center space-y-4 w-2/5">
      <input
        type="text"
        placeholder="Put in Game Code"
        value={gameCode}
        onChange={(e) => setGameCode(e.target.value)}
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Submit
      </button>
    </form>
  );
};