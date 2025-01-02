import {User} from "../models/User.ts";
import axios from "axios";
import {Friend} from "../models/Friend.ts";
import {FriendRequest} from "../models/FriendRequest.ts";


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
            return [];
        });
}

export function searchUserByName(searchTerm: string, uuid: string): Promise<Friend[]> {
    console.log("Search Term:" + searchTerm);
    return axios.get(`/api/gameuser/users/${searchTerm}?uuid=${uuid}`)
        .then((response) => response.data)
        .catch((error) => {
            console.error('User Service: Error searching users:', error);
            return [];
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

export function getFriendRequests(userId: string): Promise<FriendRequest[]> {
    return axios.get(`/api/gameuser/friendRequests?userId=${userId}`)
        .then((response) => response.data)
        .catch((error) => {
            console.error('User Service: Error getting friend requests:', error);
            return [];
        });
}

export function acceptRequest(requestId: string, userId: string): Promise<void> {
    return axios.post(`/api/gameuser/friendRequest/accept/${requestId}?userId=${userId}`).then((response) => response.data)
        .catch((error) => {
            console.error('User Service: Error accepting friend request:', error);
            throw error;
        });
}

export function declineRequest(requestId: string, userId: string): Promise<void> {
    return axios.post(`/api/gameuser/friendRequest/decline/${requestId}?userId=${userId}`).then((response) => response.data)
        .catch((error) => {
            console.error('User Service: Error rejecting friend request:', error);
            throw error;
        });
}

export function removeFromFriendList(userId: string, friendId: string): Promise<void> {
    return axios.post(`/api/gameuser/friend/remove/${userId}?friendId=${friendId}`).then((response) => response.data)
        .catch((error) => {
            console.error('User Service: Error removing friend:', error);
            throw error;
        });
}
