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
        <div className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center justify-between">
            <div>
                <h3 className="text-lg text-black font-semibold">Friend request from: {request.senderName}</h3>
                <p className="text-sm text-gray-600">You have a new friend request</p>
            </div>
            <div className="flex space-x-2">
                <button
                    onClick={acceptRequest}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Accept
                </button>
                <button
                    onClick={declineRequest}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Decline
                </button>
            </div>
        </div>
    );
}