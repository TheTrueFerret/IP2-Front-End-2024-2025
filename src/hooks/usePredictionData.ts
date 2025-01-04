import {useEffect, useState} from "react";
import {GamePrediction} from "../models/GamePrediction.ts";
import {getRummikubPredictions, postNewPrediction} from "../services/predictionService.ts";

interface UsePredictionDataReturn {
    predictions: GamePrediction[] | [];
    postPrediction: () => void
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
            return await getRummikubPredictions('Rummikub');
        } catch (error) {
            console.error('Failed to fetch predictions:', error);
            setIsError(true);
            return [];
        } finally {
            setIsLoading(false);
            setPredictions(predictions);
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