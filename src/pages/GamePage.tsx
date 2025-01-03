import { DndProvider } from "react-dnd";
import { Deck } from "../components/deck/Deck";
import { PlayingField } from "../components/playingField/PlayingField";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { NotificationType } from "../models/Notification";
import { NotificationAlert } from "../components/notifications/notificationAlert/NotificationAlert";
import { usePlayerId } from "../hooks/usePlayerId";
import { ActionPanel } from "../components/actionPanel/ActionPanel";
import { useCurrentPlayerTurn } from "../hooks/useCurrentPlayerTurn";
import { BackButton } from "../components/BackButton";
import { PlayerTurnList } from "../components/PlayerTurnList";
import { useGameId } from "../hooks/useGameId";
import { NotificationPopup } from "../components/notifications/notificationPopup/NotificationPopup";

const dragOptions = {
  //enableMouseEvents: true
}

export function GamePage() {
  const [showNotification, setShowNotification] = useState(false);
  const [yourTurnNotification, setYourTurnNotification] = useState(false);
  const { playerId } = usePlayerId();
  const { currentPlayerTurn } = useCurrentPlayerTurn();
  const { getGameId } = useGameId();
  const navigate = useNavigate();

  console.log(playerId);
  console.log(currentPlayerTurn);

  useEffect(() => {
    // Calling getGameId once on component mount (to make sure when reloading the page everything stays)
    if (playerId)
    getGameId(playerId);
  }, [playerId]);

  console.log("Current Player Turn: ", currentPlayerTurn);
  const shouldDisable = currentPlayerTurn?.id !== playerId;
  console.log("Should Disable: ", shouldDisable);

  const handleExit = () => {
    setShowNotification(true);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const handleClosePupupNotification = () => {
    setYourTurnNotification(false);
  }

  useEffect(() => {
    if (currentPlayerTurn?.id === playerId) {
      setYourTurnNotification(true);
    }
  }, [currentPlayerTurn]);
  //if (currentPlayerTurn?.id === playerId) {
  //  setYourTurnNotification(true);
  //}

  const handleExecuteExit = () => {
    navigate('/');
  };

  return (
    <div className="relative flex justify-center w-screen h-screen bg-neutral-900">
      <BackButton backAction={handleExit} />
      <PlayerTurnList />
      <DndProvider backend={HTML5Backend} options={dragOptions}>
        <PlayingField disabled={shouldDisable} />
        <Deck/>
        <ActionPanel disabled={shouldDisable} />
      </DndProvider>
      {showNotification && (
        <NotificationAlert
          notification={{
            title: 'Are You Quitting?',
            description: 'Are you Sure, You want to Quit The Game?',
            type: NotificationType.Warning,
          }}
          buttons={true}
          onClose={handleCloseNotification}
          onExecute={handleExecuteExit}
          closeButtonText="No"
          executeButtonText="Yes"
        />
      )}
      {yourTurnNotification && (
        <NotificationPopup
        notification={{
            title: 'IT\'S YOUR TURN!!!!!',
            description: 'Drag Tiles on the Playing Field or Draw a Tile',
            type: NotificationType.Info,
          }}
        onClose={handleClosePupupNotification} />
      )}
    </div>
  )
}

