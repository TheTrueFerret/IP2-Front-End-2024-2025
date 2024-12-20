import {User} from "../models/User.ts";
import axios from "axios";


export function getUserById(userId: string): Promise<User> {
    return axios.get(`/api/gameuser/userProfile?userId=${userId}`,)
        .then((response) => response.data)
        .catch((error) => {
            console.error('User Service: Error fetching user:', error);
            throw error; // Optionally handle the error further
        });
}

export function getUserFriends(userId: string): Promise<User[]> {
    return axios.get(`/api/gameuser/friends?userId=${userId}`)
        .then((response) => response.data)
        .catch((error) => {
            console.error('User Service: Error fetching friends:', error);
            throw error; // Optionally handle the error further
        });
}

export function searchUserByName(searchTerm: string): Promise<User[]> {
    return axios.get(`/api/gameuser/users/${searchTerm}`)
        .then((response) => response.data)
        .catch((error) => {
            console.error('User Service: Error searching users:', error);
            throw error; // Optionally handle the error further
        });
}

export function getAllUsers(): Promise<User[]> {
    //TODO: Implement this function in the backend
    return axios.get(`/api/gameuser/allUsers`)
}