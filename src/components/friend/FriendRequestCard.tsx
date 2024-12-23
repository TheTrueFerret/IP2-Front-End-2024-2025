import {FriendRequest} from "../../models/FriendRequest.ts";

interface FriendRequestCardProps {
    request: FriendRequest;
    onAccept: (requestId: string) => void;
    onDecline: (requestId: string) => void;
}

export function FriendRequestCard({request, onAccept, onDecline}: FriendRequestCardProps) {

    function acceptRequest() {
        onAccept(request.requestId);
    }

    function declineRequest() {
        onDecline(request.requestId);
    }

    return (
        <div className={""}>
            <h3>{request.senderName}</h3>
            <button onClick={acceptRequest}>Accept</button>
            <button onClick={declineRequest}>Decline</button>
        </div>
    );
}