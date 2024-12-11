import {User} from "../models/User.ts";
import axios from "axios";


export function getUserById(userId: string): Promise<User> {

    const token = localStorage.getItem('token');
    console.log('Token:', token);

    console.log('Axios headers:', axios.defaults.headers);

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.get(`/api/gameuser/userProfile?userId=${userId}`)
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching user:', error);
            throw error; // Optionally handle the error further
        });
}

export function getAllUsers(): Promise<User[]> {
    //TODO: Implement this function in the backend
    return axios.get(`/api/gameuser/allUsers`)
}