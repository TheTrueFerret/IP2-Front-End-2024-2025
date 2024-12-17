import { useState } from "react";
import "./ActionPanel.css";


export function ActionPanel() {
    const [score, setScore] = useState(2000000);

    function drawTile() {
        console.log("Drawing tile");

    }

    function nextTurn() {
        console.log("Next turn");
    }

    return (
        <div className="action-panel">

            <div className="text-white text-2xl font-semibold justify-self-center">Score: {score.toLocaleString()}</div>

            <div className="flex space-x-4 justify-center items-center flex-grow w-full">
                <button className="w-16 h-16 bg-yellow-200 rounded-lg transition-all hover:scale-110 text-2xl font-semibold"
                onClick={drawTile}>
                    Draw Tile
                </button>s
                <button className="w-16 h-16 bg-green-500 rounded-lg transition-all hover:scale-110 text-2xl font-semibold"
            onClick={nextTurn}>
                    Next Turn
                </button>
            </div>
        </div>
    );
};
