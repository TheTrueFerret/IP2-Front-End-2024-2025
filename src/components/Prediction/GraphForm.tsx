import {ChangeEvent, useState} from "react";
import usePredictionData from "../../hooks/usePredictionData.ts";
import {NotificationAlert} from "../notifications/notificationAlert/NotificationAlert.tsx";
import {NotificationType} from "../../models/Notification.ts";

const GraphForm = () => {
    const {isError, isLoading, postPrediction} = usePredictionData();

    const [formData, setFormData] = useState({
        min_players: '',
        max_players: '',
        play_time: '',
        board_game_honor: '',
        mechanics: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        postPrediction(formData);
    };

    if (isLoading) {
        return <NotificationAlert
            notification={{
                title: 'Loading data',
                description: 'Fetching the data from the server',
                type: NotificationType.Error,
            }}
            buttons={false}/>
    }

    if (isError) {
        return <NotificationAlert
            notification={{
                title: 'Error occured',
                description: 'An error occured while fetching the form',
                type: NotificationType.Error,
            }}
            buttons={true}
            closeButtonText='Go Back'
            onClose={() => {
                window.history.back();
            }}/>
    }

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 bg-gray-200 p-4 rounded-lg">
            <label className="flex flex-col">
                <span className="text-gray-700">Min Players</span>
                <input
                    type="number"
                    name="min_players"
                    placeholder="2"
                    value={formData.min_players}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
            </label>
            <label className="flex flex-col">
                <span className="text-gray-700">Max Players</span>
                <input
                    type="number"
                    name="max_players"
                    placeholder="6"
                    value={formData.max_players}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
            </label>
            <label className="flex flex-col">
                <span className="text-gray-700">Play Time</span>
                <input
                    type="number"
                    name="play_time"
                    placeholder="60"
                    value={formData.play_time}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
            </label>
            <label className="flex flex-col">
                <span className="text-gray-700">Board Game Honor</span>
                <input
                    type="number"
                    name="board_game_honor"
                    placeholder="12"
                    value={formData.board_game_honor}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
            </label>
            <label className="flex flex-col">
                <span className="text-gray-700">Mechanics</span>
                <input
                    type="text"
                    name="mechanics"
                    placeholder="'Tile Placement,Strategy'"
                    value={formData.mechanics}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
            </label>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-end"
                    type={"submit"}>
                Predict Data
            </button>
        </form>
    );
}

export default GraphForm;