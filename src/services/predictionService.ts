import axios from "axios";
import {GamePrediction} from "../models/GamePrediction.ts";


export async function getRummikubPredictions(gameName: string): Promise<GamePrediction[] | []> {
    try {
        const response = await axios.get<GamePrediction[]>(`/api/ai/predictions//${gameName}`);
        return response.data;
    } catch (error) {
        console.error('Prediction Service: Error fetching predictions:', error);
        return [];
    }

}

export async function postNewPrediction(): Promise<void> {
    try {
        const response = await axios.post(`/api/ai/prediction/Rummikub`);
        return response.data;
    } catch (error) {
        console.error('Prediction Service: Error posting prediction:', error);
        throw error;
    }
}