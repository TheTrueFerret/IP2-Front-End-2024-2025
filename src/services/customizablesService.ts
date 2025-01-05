import {Customizable} from "../models/Customizable.ts";
import axios from "axios";

export function getCustomizables() {
    return axios.get<Customizable[]>(`api/gameuser/customizables`)
        .then((response) => response.data)
        .catch((error) => {
            console.error('Customizables Service: Error fetching customizables:', error);
            throw error;
        });
}