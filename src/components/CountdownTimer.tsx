import { useEffect, useState } from "react";
import { useDeckTiles } from "../hooks/useDeckTiles";
import { useFieldTiles } from "../hooks/useFieldTiles";

interface CountdownTimerProps {
  initialTime: number | null | undefined;
  disabled: boolean;
}

export function CountdownTimer({ initialTime, disabled }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(0);
  const { drawTile } = useDeckTiles();
  const { getTileSets, removingAllFieldTiles } = useFieldTiles();

  useEffect(() => {
    if (!initialTime || disabled) {
      setTimeLeft(0); // Reset the time if disabled
      return;
    }

    setTimeLeft(initialTime);

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 2) {
          drawTile();
          updatePlayingFieldAndDeck();
        }
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [initialTime, disabled, drawTile]);


  async function updatePlayingFieldAndDeck() {
    const updatedTileSets = await getTileSets();
    if (updatedTileSets.length > 0) {
      console.log('TileSets:', updatedTileSets);
      return updatedTileSets;
    }
    if (updatedTileSets.length === 0) {
      await removingAllFieldTiles();
    }
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div
      className="text-2xl font-bold text-white"
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
}