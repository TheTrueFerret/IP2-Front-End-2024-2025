import { useEffect, useRef, useState } from 'react';
import { PlayerList } from "../../components/Player/PlayerList.tsx";
import { SideElements } from '../../components/sideElements/SideElements.tsx';
import { useCreateLobby } from '../../hooks/useCreateLobby.ts';
import { useCreateGame } from '../../hooks/useCreateGame.ts';
import { LoginButton } from '../../components/loginButton/LoginButton.tsx';

export function LobbyPage() {
    const { createLobby } = useCreateLobby();
    const { createGame } = useCreateGame();
    const [ players, /*setPlayers*/ ] = useState(["Player 1", "Player 2"]);
    const [ lobbyId, /*setLobbyId*/ ] = useState("");
    const isLobbyCreated = useRef(false);
    const [ settings, setSettings ] = useState({
        timeBetweenTurns: 30,
        //jokersEnabled: false,
        startTileAmount: 7
    });


    useEffect(() => {
        if (!isLobbyCreated.current) {
            loadLobby();
            isLobbyCreated.current = true;
        }
    }, []);

    const handleSettingChange = (key: string, value: number | boolean) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
        console.log(settings);
    };

    const handleStartGame = async () => {
        if (players.length >= 2) {
            //TODO: Get lobbyId from user?
            await createGame(lobbyId, settings.timeBetweenTurns, settings.startTileAmount)
        } else {
            alert("You need at least 2 players to start the game.");
        }
    };

    const handleQuitLobby = () => {
        window.history.back();
    };

    const loadLobby = async () => {
        if (!isLobbyCreated.current) {
            createLobby().then((r) => {
                console.log(r);
            });
        }
    }

    return (<>
        <div className="bg-gradient-to-br text-black flex flex-col p-6">
            <LoginButton />
            <div className="grid grid-cols-2 gap-6 flex-grow">
                <div className="flex flex-col justify-between pb-32">
                    <PlayerList players={players} />

                    <div className="flex gap-10 justify-center text-white font-bold text-3xl">
                        <button
                            onClick={handleQuitLobby}
                            className="w-2/6 py-20 bg-red-600 rounded-xl hover:bg-red-900 transition z-10"
                        >
                            Quit Lobby
                        </button>
                        <button
                            onClick={handleStartGame}
                            className={`w-1/2 py-20 bg-green-500 rounded-xl transition z-10 ${players.length < 2 ? "opacity-50 cursor-not-allowed" : "hover:bg-green-800"
                                }`}
                            disabled={players.length < 2}
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
                    </>
                } bottemElement={<p className="text-black text-lg">Game Preview</p>} />
            </div>
        </div>
    </>
    );
}
