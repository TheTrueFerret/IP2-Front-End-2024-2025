import {FriendRequest} from "../../models/FriendRequest.ts";
import {FriendRequestCard} from "./FriendRequestCard.tsx";
import useUsers from "../../hooks/useUsers.ts";


export function FriendRequestList({requests}: { requests: FriendRequest[] }) {
    const {acceptFriendRequest,rejectFriendRequest} = useUsers();

    function acceptRequest(requestId: string) {
        // Implement accept request
        acceptFriendRequest(requestId);
    }

    function declineRequest(requestId: string) {
        // Implement decline request
        rejectFriendRequest(requestId);
    }

    return (
        <div className={"bg-green-500 rounded w-4/5"}>
            {requests.map((request, index) => (
                <FriendRequestCard key={index} request={request} onAccept={acceptRequest} onDecline={declineRequest}/>
            ))}
        </div>
    );
}