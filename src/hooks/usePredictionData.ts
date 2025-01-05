import {GamePrediction} from "../models/GamePrediction.ts";
import {getRummikubPredictions, postNewPrediction} from "../services/predictionService.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

export interface PredictionFormData {
    min_players: string | null;
    max_players: string | null;
    play_time: string | null;
    board_game_honor: string | null;
    mechanics: string | null;
}

interface UsePredictionDataReturn {
    predictions: GamePrediction[] | [] | undefined;
    postPrediction: (formData: PredictionFormData) => void;
    isLoading: boolean;
    isError: boolean;
}

export function usePredictionData(): UsePredictionDataReturn {
    const queryClient = useQueryClient();

    const {isLoading, isError, data} = useQuery(
        {
            queryKey: ['Predictions'],
            queryFn: () => {
                return getRummikubPredictions("Rummikub"); // Fetch player by ID
            },
            retry: false
        }
    )

    const {
        mutate: postPrediction,
        isPending: isPostLoading,
        isError: isPostError,
    } = useMutation({
        mutationFn: async (formData: PredictionFormData) => {
            await postNewPrediction(formData);
            return getRummikubPredictions("Rummikub");
        },
        onSuccess: (newPredictions) => {
            queryClient.setQueryData(['Predictions'], newPredictions);
        },
    });

    return {
        postPrediction,
        predictions: data,
        isLoading: isLoading || isPostLoading,
        isError: isError || isPostError
    }
}

export default usePredictionData;