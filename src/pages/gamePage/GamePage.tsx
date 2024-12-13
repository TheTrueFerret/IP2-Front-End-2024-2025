import { DndProvider } from "react-dnd";
import { Deck } from "../../components/deck/Deck";
import { PlayingField } from "../../components/playingField/PlayingField";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { NotificationType } from "../../models/Notification";
import { NotificationAlert } from "../../components/notifications/notificationAlert/NotificationAlert";

const dragOptions = {
  //enableMouseEvents: true
}

export function GamePage() {
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const handleExit = () => {
    setShowNotification(true);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const handleExecuteExit = () => {
    navigate('/');
  };


  return (
    <div className="relative flex justify-center w-screen h-screen bg-neutral-900">
      <Link
        to="#"
        className="z-10 absolute text-white text-2xl font-bold flex justify-center items-center h-10 transition-all duration-200 ease-in-out transform hover:scale-105"
        onClick={handleExit}
      >
        <p>Exit Game</p>
      </Link>
      <DndProvider backend={HTML5Backend} options={dragOptions}>
        <PlayingField />
        <Deck />
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
    </div>
  )
}

