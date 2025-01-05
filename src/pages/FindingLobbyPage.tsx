import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLobbyId } from "../hooks/useLobbyId";
import { NotificationCard } from "../components/notifications/notificationCard/NotificationCard";
import { NotificationType } from "../models/Notification";

export function FindingLobbyPage() {
    const navigate = useNavigate();
    const {
        joinOpenLobby,
        isJoiningOpenLobby,
        isErrorJoiningOpenLobby,
        findingLobbyResponse,
        errorJoiningOpenLobby,
    } = useLobbyId();


    useEffect(() => {
        if (!isJoiningOpenLobby && !findingLobbyResponse && !isErrorJoiningOpenLobby) {
            joinOpenLobby();
        }
    }, []);

    useEffect(() => {
        if (findingLobbyResponse && typeof findingLobbyResponse !== "string") {
            navigate("/Lobby");
        }
    }, [findingLobbyResponse, navigate]);

    if (isJoiningOpenLobby) {
        return <NotificationCard loading={true} />;
    }

    if (isErrorJoiningOpenLobby) {
        return (
            <NotificationCard
                loading={false}
                notification={{
                    title: "Failed to find open Lobby",
                    description: errorJoiningOpenLobby?.message || "Unknown error occurred",
                    type: NotificationType.Info,
                }}
            />
        );
    }

    return null;
}
