import "./ActionPanel.css";
import { useDeckTiles } from "../../hooks/useDeckTiles";
import { commitTurn } from "../../services/gameService";
import { useGameId } from "../../hooks/useGameId";
import { useFieldTiles } from "../../hooks/useFieldTiles";
import { useScore } from "../../hooks/useScore";
import { usePlayerId } from "../../hooks/usePlayerId";


interface ActionPanelProps {
    disabled: boolean;
}

export function ActionPanel({disabled}: ActionPanelProps) {
    const { drawTile } = useDeckTiles()
    const { getCachedGameId } = useGameId();
    const { deckTiles } = useDeckTiles();
    const { fieldTileSets, getTileSets } = useFieldTiles();
    const { score } = useScore();
    const { getCachedPlayerId } = usePlayerId();

    function drawTileFunction() {
        drawTile()
        getTileSets()
    }

    async function nextTurn() {
        console.log("Next Turn");
        const gameId = getCachedGameId();
        const playerId = getCachedPlayerId();
        if (playerId && gameId && fieldTileSets && deckTiles) {
            console.log("Calling commitTurn...");
            await commitTurn(playerId, gameId, fieldTileSets, deckTiles);
            console.log("commitTurn done");
        } else {
            console.log("Conditions not met for commitTurn", { playerId, gameId, fieldTileSets, deckTiles });
        }
        console.log("Next Turn done");
    }

    return (
        <div className="action-panel">
            <div className="text-white text-2xl font-semibold justify-self-center">Score: {score}</div>
            <div className="flex space-x-4 justify-center items-center flex-grow w-full">
                <button className={`w-[70px] h-[130px] bg-yellow-200 rounded-lg transition-all text-2xl font-semibold
                ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
                    onClick={drawTileFunction}
                    disabled={disabled}>
                    Draw Tile
                </button>s
                <button className={`w-[70px] h-[130px] bg-green-500 rounded-lg transition-all text-2xl font-semibold
                ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
                    onClick={nextTurn}
                    disabled={disabled}>
                    Next Turn
                </button>
            </div>
        </div>
    );
};
