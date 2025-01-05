import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import usePredictionData from "../../hooks/usePredictionData.ts";
import { NotificationAlert } from "../notifications/notificationAlert/NotificationAlert.tsx";
import { NotificationType } from "../../models/Notification.ts";
import GraphForm from "./GraphForm.tsx";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraphComponent = () => {
    const { isError, isLoading, predictions } = usePredictionData();
    const [selectedChart, setSelectedChart] = useState<number | null>(null);

    const charts = [
        {
            label: 'Rating Average',
            data: predictions?.slice(-10).map(game => game.rating_average) || [],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            title: 'Game Statistics By Rating Average',
        },
        {
            label: 'Complexity Average',
            data: predictions?.slice(-10).map(game => game.complexity_average) || [],
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            title: 'Game Statistics By Complexity Average',
        },
        {
            label: 'Owned Users',
            data: predictions?.slice(-10).map(game => game.owned_users) || [],
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
            title: 'Game Statistics By Owned Users',
        },
    ];

    if (isLoading) {
        return (
            <NotificationAlert
                notification={{
                    title: 'Loading data',
                    description: 'Fetching the data from the server',
                    type: NotificationType.Error,
                }}
                buttons={false}
            />
        );
    }

    if (isError || !predictions) {
        return (
            <NotificationAlert
                notification={{
                    title: 'Error occurred',
                    description: 'An error occurred while fetching the data',
                    type: NotificationType.Error,
                }}
                buttons={true}
                closeButtonText="Go Back"
                onClose={() => {
                    window.history.back();
                }}
            />
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-6">
            <div className="bg-white opacity-95 shadow-md rounded-lg p-6 w-11/12 max-w-screen-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Rummikub</h1>
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-700">Optional Game Changes</h2>
                    <p className="text-gray-500 mb-4">Leave empty for default</p>
                    <GraphForm />
                </div>
                <div className="flex flex-col items-center gap-4">
                    <div className="flex flex-wrap justify-center gap-4">
                        {charts.map((chart, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedChart(index)}
                                className={`px-4 py-2 rounded-lg ${
                                    selectedChart === index
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-800'
                                } hover:bg-blue-500 hover:text-white transition`}
                            >
                                {chart.label}
                            </button>
                        ))}
                    </div>
                    {selectedChart !== null && (
                        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-screen-md">
                            <Bar
                                data={{
                                    labels: predictions.slice(-10).map(game =>
                                        `(${game.prediction_date.slice(0, 9)})`
                                    ),
                                    datasets: [
                                        {
                                            label: charts[selectedChart].label,
                                            data: charts[selectedChart].data,
                                            backgroundColor: charts[selectedChart].backgroundColor,
                                        },
                                    ],
                                }}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: 'top' as const,
                                        },
                                        title: {
                                            display: true,
                                            text: charts[selectedChart].title,
                                        },
                                    },
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GraphComponent;
