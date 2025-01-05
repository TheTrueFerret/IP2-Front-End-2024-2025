import { useNavigate } from "react-router-dom";
import { BackButton } from "../components/BackButton";
import { useGameId } from "../hooks/useGameId";
import { usePlayerId } from "../hooks/usePlayerId";
import { useEffect } from "react";
import { useLeaderboard } from "../hooks/useLeaderboard";
import { NotificationType } from "../models/Notification";
import { NotificationCard } from "../components/notifications/notificationCard/NotificationCard";



export function EndGamePage() {
  const { playerId } = usePlayerId();
  const { getGameId } = useGameId();
  const navigate = useNavigate();
  const { leaderboard, isErrorLeaderboard, isLoadingLeaderboard } = useLeaderboard();


  useEffect(() => {
    // Calling getGameId once on component mount (to make sure when reloading the page everything stays)
    if (playerId)
      getGameId(playerId);
  }, [playerId]);


  const hasError = isErrorLeaderboard || !leaderboard;
  const isLoading = isLoadingLeaderboard;

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br text-black flex flex-col p-6">
        <NotificationCard
          loading={isLoading}
          notification={undefined}
        />
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="bg-gradient-to-br text-black flex flex-col p-6">
        <NotificationCard
          loading={false}
          notification={
            {
              title: 'Failed to Load The Lobby',
              description: 'The Lobby is Empty So no Lobby can be Returned',
              type: NotificationType.Error,
            }
          }
        />
      </div>
    )
  }


  return (
    <section className='relative flex justify-center w-screen h-screen'>
      <BackButton backAction={() => navigate('/')} />
      <div className='flex flex-col justify-center text-white bg-neutral-900/60 backdrop-blur p-32'>
        <h1 className='text-4xl font-bold'>Game has Ended</h1>
      </div>
    </section>
  );
}