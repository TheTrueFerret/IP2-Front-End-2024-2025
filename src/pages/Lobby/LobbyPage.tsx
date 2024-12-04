import {useState} from 'react';
import PlayerList from "../../components/Player/PlayerList.tsx";
import {useLobby} from "../../hooks/useLobby.ts";
import {Background} from "../../components/background/Background.tsx";

export function LobbyPage() {
    const {createGame} = useLobby();
    const [players, setPlayers] = useState(["Player 1", "Player 2"]);
    const [settings, setSettings] = useState({
        timeBetweenTurns: 30,
        jokersEnabled: false,
        startTileAmount: 7,
    });

    const handleSettingChange = (key: string, value: number | boolean) => {
        setSettings((prev) => ({...prev, [key]: value}));
        console.log(settings);
    };

    const handleStartGame = async () => {
        if (players.length >= 2) {
            await createGame("a1e4c8d3-9f3b-4c8e-85ba-7fcf1eb8d006", settings.timeBetweenTurns, settings.startTileAmount).then(r => {

                }
            );
        } else {
            alert("You need at least 2 players to start the game.");
        }
    };

    const handleQuitLobby = () => {
        alert("You have left the lobby.");
        //TODO: GO BACK TO LOBBY SELECTION
    };

    return (<>
            <Background color={"crimson"}/>
            <div
                className="bg-gradient-to-br bg-neutral-900 w-screen h-screen text-black flex flex-col p-6">
                <div className="grid grid-cols-2 gap-6 flex-grow">
                    <div className="flex flex-col justify-between">
                        <PlayerList players={players}/>

                        <div className="mt-6 flex gap-4 justify-center" style={{marginBottom: "20px"}}>
                            <button
                                onClick={handleQuitLobby}
                                className="w-1/2 px-4 py-3 bg-red-700 text-white rounded-lg hover:bg-red-600 transition z-10"
                            >
                                Quit Lobby
                            </button>
                            <button
                                onClick={handleStartGame}
                                className={`w-1/2 px-4 py-3 bg-green-500 text-white rounded-lg transition z-10 ${
                                    players.length < 2 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                                }`}
                                disabled={players.length < 2}
                            >
                                Start Game
                            </button>
                        </div>
                    </div>

                    {/* Right Side: Settings and Game Preview */}
                    <div className="flex flex-col gap-6">
                        {/* Settings Section */}
                        <div className="bg-gray-600/20 backdrop-blur rounded-lg shadow-md p-4">
                            <h3 className="text-lg font-semibold text-white mb-4">Settings</h3>

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

                            {/* Jokers Enabled Switch */}
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
                className={`w-6 h-6 bg-white rounded-full absolute top-0 left-0 transition-transform duration-300 ${settings.jokersEnabled ? '' : 'translate-x-6'}`}
            ></span>
        </span>
                                </label>
                            </div>


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
                        </div>


                        {/* Game Preview Section */}
                        <div className="flex-grow bg-white rounded-lg shadow-md p-4 flex items-center justify-center z-10">
                            <p className="text-gray-500 text-lg">Game Preview</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
