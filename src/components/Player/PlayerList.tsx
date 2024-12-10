import { Player } from "../../models/Player";

interface PlayerListProps {
    players: Player[]; // Specify that 'players' is an array of strings
}

export function PlayerList({ players }: PlayerListProps) {
    return (
        <div className="w-[90%] h-3/4 flex flex-col bg-neutral-900/60 backdrop-blur rounded-3xl shadow-md p-4 mx-auto">
            <div className="flex flex-col gap-4 overflow-y-auto">
                {players.map((player) => (
                    <div
                        key={player.playerId}
                        className="rounded-lg shadow-sm p-3 flex items-start justify-start"
                    >
                        <img
                            src="../../../public/DefaultPlayerImg.png"
                            alt=""
                            className="rounded-full w-16 h-16 object-cover"
                        />
                        <p className="pl-3 text-white font-medium place-self-center">{player.userName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
