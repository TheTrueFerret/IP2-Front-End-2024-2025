import axios from "axios";
import {GamePrediction} from "../models/GamePrediction.ts";


export async function getRummikubPredictions(gameName: string): Promise<GamePrediction[] | []> {
    try {
        const response = await axios.get<GamePrediction[]>(`/api/ai/predictions/${gameName}`);
        console.log('repsonse: ', response);
        console.log('Prediction Service: Fetched predictions:', response.data);
        return response.data;
    } catch (error) {
        console.error('Prediction Service: Error fetching predictions:', error);
        return [];
    }
}

export async function postNewPrediction(data: FormData): Promise<void> {
    try {
        const response = await axios.post(`/api/ai/prediction/Rummikub`,data);
        return response.data;
    } catch (error) {
        console.error('Prediction Service: Error posting prediction:', error);
        throw error;
    }
}