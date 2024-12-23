import {User} from "../models/User.ts";
import axios from "axios";
import {Friend} from "../models/Friend.ts";


export function getUserById(userId: string): Promise<User> {
    return axios.get(`/api/gameuser/userProfile?userId=${userId}`,)
        .then((response) => response.data)
        .catch((error) => {
            console.error('User Service: Error fetching user:', error);
            throw error;
        });
}

export function getUserFriends(userId: string): Promise<Friend[]> {
    return axios.get(`/api/gameuser/friends?userId=${userId}`)
        .then((response) => response.data)
        .catch((error) => {
            console.error('User Service: Error fetching friends:', error);
            throw error;
        });
}

export function searchUserByName(searchTerm: string, uuid: string): Promise<Friend[]> {
    console.log("Search Term:" + searchTerm);
    return axios.get(`/api/gameuser/users/${searchTerm}?uuid=${uuid}`)
        .then((response) => response.data)
        .catch((error) => {
            console.error('User Service: Error searching users:', error);
            throw error;
        });
}

export function sendFriendRequest(userId: string, friendUsername: string): Promise<void> {
    return axios.post(`/api/gameuser/friendRequest/${friendUsername}?userId=${userId}`)
        .then((response) => response.data)
        .catch((error) => {
            console.error('User Service: Error sending friend request:', error);
            throw error;
        });
}
