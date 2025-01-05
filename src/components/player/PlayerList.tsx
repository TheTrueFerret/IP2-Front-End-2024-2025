import { Player } from "../../models/Player";

interface PlayerListProps {
    host: Player;
    players: Player[]; // Specify that 'players' is an array of strings
}

export function PlayerList({ host, players }: PlayerListProps) {
    const filteredPlayers = players.filter(player => player.id !== host.id);

    return (
        <div className="w-[90%] h-3/4 flex flex-col bg-neutral-900/60 backdrop-blur rounded-3xl shadow-md p-4 mx-auto">
            <div className="flex flex-col gap-4 overflow-y-auto">
                <div
                    key={host.id}
                    className="rounded-lg shadow-sm p-3 flex items-start justify-start"
                >
                    <img
                        src="/DefaultPlayerImg.png"
                        alt=""
                        className="rounded-full w-16 h-16 object-cover"
                    />
                    <p className="pl-3 text-red-400 font-medium place-self-center">{host.username}</p>
                </div>
                {filteredPlayers.map((player) => (
                    <div
                        key={player.id}
                        className="rounded-lg shadow-sm p-3 flex items-start justify-start"
                    >
                        <img
                            src="/DefaultPlayerImg.png"
                            alt=""
                            className="rounded-full w-16 h-16 object-cover"
                        />
                        <p className="pl-3 text-white font-medium place-self-center">{player.username}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
