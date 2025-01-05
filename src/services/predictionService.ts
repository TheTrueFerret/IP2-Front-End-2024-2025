import axios from "axios";
import {GamePrediction} from "../models/GamePrediction.ts";
import {PredictionFormData} from "../hooks/usePredictionData.ts";


export async function getRummikubPredictions(gameName: string): Promise<GamePrediction[] | []> {
    try {
        const response = await axios.get<GamePrediction[]>(`/api/predictions/${gameName}`);
        return response.data;
    } catch (error) {
        console.error('Prediction Service: Error fetching predictions:', error);
        return [];
    }
}

export async function postNewPrediction(data: PredictionFormData): Promise<void> {
    try {
        await axios.post(`/api/predictions/Rummikub`, data);
    } catch (error) {
        console.error('Prediction Service: Error posting prediction:', error);
        throw error;
    }
}