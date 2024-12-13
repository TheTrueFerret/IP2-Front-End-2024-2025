import { useContext, useState } from 'react';
import { PlayerList } from "../../components/Player/PlayerList.tsx";
import { SideElements } from '../../components/sideElements/SideElements.tsx';
import { LoginButton } from '../../components/loginButton/LoginButton.tsx';
import { useLobby } from '../../hooks/useLobby.ts';
import { useNavigate } from 'react-router-dom';
import { NotificationCard } from '../../components/notifications/notificationCard/NotificationCard.tsx';
import { NotificationType } from '../../models/Notification.ts';
import { useGameId } from '../../hooks/useGameId.ts';
import { NotificationAlert } from '../../components/notifications/notificationAlert/NotificationAlert.tsx';
import SecurityContext from '../../context/SecurityContext.ts';
import { postExitLobby } from '../../services/lobbyService.ts';

export function LobbyPage() {
    const navigate = useNavigate();
    const { createGame } = useGameId();
    const { lobby, isErrorLobby, isLoadingLobby } = useLobby();
    const [settings, setSettings] = useState({
        timeBetweenTurns: 30,
        //jokersEnabled: false,
        startTileAmount: 7
    });
    const [showNotification, setShowNotification] = useState(false);
    const { loggedUserId } = useContext(SecurityContext);


    const hasError = isErrorLobby || !lobby;
    const isLoading = isLoadingLobby;

    if (hasError || isLoading) {
        return (
            <div className="bg-gradient-to-br text-black flex flex-col p-6">
                <NotificationCard
                    loading={isLoading}
                    notification={
                        hasError
                            ? {
                                title: 'Failed to Load The Lobby',
                                description: 'The Lobby is Empty So no Lobby can be Returned',
                                type: NotificationType.Error,
                            }
                            : undefined
                    }
                />
            </div>
        )
    }

    const handleSettingChange = (key: string, value: number | boolean) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
        console.log(settings);
    };

    const handleStartGame = async () => {
        if (lobby.users.length >= 2) {
            await createGame({lobbyId: lobby.id, roundTime: settings.timeBetweenTurns, startTileAmount: settings.startTileAmount})
        } else {
            alert("You need at least 2 players to start the game.");
        }
    };

    const handleQuitLobby = () => {
        setShowNotification(true);
    };

    const handleCloseNotification = () => {
        setShowNotification(false);
    };

    const handleExecuteExit = () => {
        if (loggedUserId)
        postExitLobby(lobby.id, loggedUserId)
        navigate('/');
    };

    return (
        <div className="bg-gradient-to-br text-black flex flex-col p-6">
            <div className='z-20 absolute top-2 right-2'>
                <LoginButton />
            </div>
            {showNotification && (
                <NotificationAlert
                    notification={{
                        title: 'Are You Quitting?',
                        description: 'Are you Sure, You want to Quit The Lobby?',
                        type: NotificationType.Warning,
                    }}
                    buttons={true}
                    onClose={handleCloseNotification}
                    onExecute={handleExecuteExit}
                    closeButtonText="No"
                    executeButtonText="Yes"
                />
            )}
            <div className="grid grid-cols-2 gap-6 flex-grow">
                <div className="flex flex-col justify-between pb-32">
                    <PlayerList host={lobby.hostUser} players={lobby.users} />

                    <div className="flex gap-10 justify-center text-white font-bold text-3xl">
                        <button
                            onClick={handleQuitLobby}
                            className="w-2/6 py-20 bg-red-600 rounded-xl hover:bg-red-900 transition z-10"
                        >
                            Quit Lobby
                        </button>
                        <button
                            onClick={handleStartGame}
                            className={`w-1/2 py-20 bg-green-500 rounded-xl transition z-10 ${lobby.users.length < 2 ? "opacity-50 cursor-not-allowed" : "hover:bg-green-800"
                                }`}
                            disabled={lobby.users.length < 2}
                        >
                            Start Game
                        </button>
                    </div>
                </div>

                <SideElements upperElement={
                    <>
                        <h3 className="text-3xl font-semibold text-white mb-4">Settings</h3>
                        {/* Time Between Turns */}
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-gray-300">Time Between Turns:</label>
                            <input
                                type="number"
                                value={settings.timeBetweenTurns}
                                onChange={(e) =>
                                    handleSettingChange("timeBetweenTurns", parseInt(e.target.value, 10))
                                }
                                className="w-20 px-2 py-1 bg-gray-700 text-white rounded-md border border-gray-500 focus:ring focus:ring-blue-200"
                            />
                        </div>

                        {/* Jokers Enabled Switch
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-gray-300">Jokers Enabled:</label>
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={settings.jokersEnabled}
                                    onChange={(e) => handleSettingChange("jokersEnabled", e.target.checked)}
                                    className="hidden"
                                />
                                <span
                                    className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${settings.jokersEnabled ? 'bg-gray-500' : 'bg-blue-500'}`}
                                >
                                    <span
                                        className={`w-6 h-6 bg-white rounded-full absolute top-0 left-0 transition-transform duration-300 ${settings.jokersEnabled ? '' : 'translate-x-6'}`}></span>
                                </span>
                            </label>
                        </div>*/}

                        {/* Starting Tile Amount */}
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-gray-300">Starting Tile Amount:</label>
                            <input
                                type="number"
                                value={settings.startTileAmount}
                                onChange={(e) =>
                                    handleSettingChange("startTileAmount", parseInt(e.target.value, 10))
                                }
                                className="w-20 px-2 py-1 bg-gray-700 text-white rounded-md border border-gray-500 focus:ring focus:ring-blue-200"
                            />
                        </div>

                        {/* Lobby Code */}
                        <div className="flex justify-between items-center mb-4">
                            <p>{lobby.joinCode}</p>
                        </div>
                    </>
                } bottemElement={<p className="text-black text-lg">Game Preview</p>} />
            </div>
        </div>
    );
}
