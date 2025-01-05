import {useEffect, useState} from "react";
import {GamePrediction} from "../models/GamePrediction.ts";
import {getRummikubPredictions, postNewPrediction} from "../services/predictionService.ts";

interface FormData {
    min_players: string | null;
    max_players: string | null;
    play_time: string | null;
    board_game_honor: string | null;
    mechanics: string | null;
}

interface UsePredictionDataReturn {
    predictions: GamePrediction[] | [];
    postPrediction: (data:FormData) => void
    isLoading: boolean;
    isError: boolean;
}

export function usePredictionData(): UsePredictionDataReturn {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [predictions, setPredictions] = useState<GamePrediction[] | []>([]);

    const postPrediction = async () => {
        setIsLoading(true);
        setIsError(false);
        try {
            console.log('Posting prediction');
            await postNewPrediction();
            await getPredictions();
        } catch (error) {
            console.error('Failed to post prediction:', error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const getPredictions = async () => {
        setIsLoading(true);
        setIsError(false);
        try {
            console.log('Fetching predictions');
            const result =  await getRummikubPredictions('Rummikub');
            if  (!result) {
                return [];
            }
            const formatted =  result.map(game => ({
                ...game,
                rating_average: parseFloat(game.rating_average.toFixed(2)),
                complexity_average: parseFloat(game.complexity_average.toFixed(2)),
                prediction_date: game.prediction_date.split('T')[0]
            }));
            setPredictions(formatted);
        } catch (error) {
            console.error('Failed to fetch predictions:', error);
            setIsError(true);
            return [];
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getPredictions();
    }, []);

    return {
        postPrediction,
        predictions: predictions ?? [],
        isLoading: isLoading,
        isError: isError
    }
}

export default usePredictionData