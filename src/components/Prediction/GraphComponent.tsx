import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import usePredictionData from "../../hooks/usePredictionData.ts";
import {NotificationAlert} from "../notifications/notificationAlert/NotificationAlert.tsx";
import {NotificationType} from "../../models/Notification.ts";
import GraphForm from "./GraphForm.tsx";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraphComponent = () => {
    const {isError, isLoading, predictions} = usePredictionData();


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
                description: 'An error occured while fetching the data',
                type: NotificationType.Error,
            }}
            buttons={true}
            closeButtonText='Go Back'
            onClose={() => {
                window.history.back();
            }}/>
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-6">
            <div className="bg-white opacity-95 shadow-md rounded-lg p-6 w-full w-11/12">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Rummikub</h1>
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-700">Optional game changes</h2>
                    <p className="text-gray-500 mb-4">Leave empty for default</p>
                    <GraphForm />
                </div>
                <div className="flex flex-wrap gap-6">
                    <div className="bg-white p-4 rounded-lg shadow-md flex-1 h-96">
                        <Bar data={{
                            labels: predictions.map(game => `(${game.prediction_date})`),
                            datasets: [
                                {
                                    label: 'Rating Average',
                                    data: predictions.map(game => game.rating_average),
                                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                                }
                            ]
                        }}
                             options={{
                                 responsive: true,
                                 plugins: {
                                     legend: {
                                         position: 'top' as const,
                                     },
                                     title: {
                                         display: true,
                                         text: 'Game Statistics By Rating Average',
                                     },
                                 }
                             }}
                        />
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md flex-1 h-96">
                        <Bar data={{
                            labels: predictions.map(game => `(${game.prediction_date})`),
                            datasets: [
                                {
                                    label: 'Complexity Average',
                                    data: predictions.map(game => game.complexity_average),
                                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                                }
                            ]
                        }} options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top' as const,
                                },
                                title: {
                                    display: true,
                                    text: 'Game Statistics by Complexity Average',
                                },
                            }
                        }} />
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md flex-1 h-96">
                        <Bar data={{
                            labels: predictions.map(game => `(${game.prediction_date})`),
                            datasets: [
                                {
                                    label: 'Owned Users',
                                    data: predictions.map(game => game.owned_users),
                                    backgroundColor: 'rgba(255, 159, 64, 0.6)',
                                }
                            ]
                        }} options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top' as const,
                                },
                                title: {
                                    display: true,
                                    text: 'Game Statistics By Owned Users',
                                },
                            }
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GraphComponent;