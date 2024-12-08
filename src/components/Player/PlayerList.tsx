import { ReactElement, ReactNode, ReactPortal, Key } from "react";

interface PlayerListProps {
    players: string[]; // Specify that 'players' is an array of strings
}

const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
    return (
        <div
            className="bg-neutral-900/60 backdrop-blur rounded-3xl shadow-md p-4 mx-auto"
            style={{height: "75%", width: "90%", display: "flex", flexDirection: "column"}}
        >
            <div className="flex flex-col gap-4 overflow-y-auto">
                {players.map((player: string | number | boolean | ReactElement | Iterable<ReactNode> | ReactPortal | null | undefined, index: Key | null | undefined) => (
                    <div
                        key={index}
                            className=" rounded-lg shadow-sm p-3 flex items-start justify-start"
                    >
                        <img
                            src="../../../public/DefaultPlayerImg.png"
                            alt=""
                            className="rounded-full w-16 h-16 object-cover"
                        />
                        <p className="pl-3 text-white font-medium place-self-center">{player}</p>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default PlayerList;
