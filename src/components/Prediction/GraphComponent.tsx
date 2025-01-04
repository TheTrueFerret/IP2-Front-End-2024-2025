import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import {GamePrediction} from "../../models/GamePrediction.ts";
import usePredictionData from "../../hooks/usePredictionData.ts";
import {NotificationAlert} from "../notifications/notificationAlert/NotificationAlert.tsx";
import {NotificationType} from "../../models/Notification.ts";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data: GamePrediction[] = [
    {
        gameName: "Rummikub",
        prediction_date: "2023-01-01",
        rating_average: 8.523,
        complexity_average: 3.221,
        owned_users: 1000
    },
    {
        gameName: "Rummikub",
        prediction_date: "2023-02-01",
        rating_average: 7.823,
        complexity_average: 2.921,
        owned_users: 850
    },
    {
        gameName: "Rummikub",
        prediction_date: "2023-03-01",
        rating_average: 9.023,
        complexity_average: 4.121,
        owned_users: 700
    }
];

const GraphComponent = () => {
    const {isError,isLoading,predictions,postPrediction} = usePredictionData();
    const ratingData = {
        labels: predictions.map(game => `(${game.prediction_date})`),
        datasets: [
            {
                label: 'Rating Average',
                data: data.map(game => game.rating_average),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            }
        ]
    };

    const complexityData = {
        labels: predictions.map(game => `(${game.prediction_date})`),
        datasets: [
            {
                label: 'Complexity Average',
                data: data.map(game => game.complexity_average),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
            }
        ]
    };

    const ownedUsersData = {
        labels: predictions.map(game => `(${game.prediction_date})`),
        datasets: [
            {
                label: 'Owned Users',
                data: data.map(game => game.owned_users),
                backgroundColor: 'rgba(255, 159, 64, 0.6)',
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Game Statistics',
            },
        },
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
                description: 'An error occured while fetching the data',
                type: NotificationType.Error,
            }}
            buttons={true}
            closeButtonText='Go Back'
            onClose={() => {window.history.back();}}/>
    }

    console.log(predictions);

    return (
        <div className={"bg-gray-600"}>
            <div>
                <h1 className="text-2xl font-bold">Rummikub</h1>
                <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"} onClick={postPrediction}>Predict</button>
            </div>
            <div className="z-20 flex flex-row gap-6 p-4 w-full">
                <div className="bg-white p-4 rounded-lg shadow-md flex-1 w-1/2">
                    <Bar data={ratingData} options={options}/>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex-1 w-1/2">
                    <Bar data={complexityData} options={options}/>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex-1 w-1/3">
                    <Bar data={ownedUsersData} options={options}/>
                </div>
            </div>
        </div>
    );
};

export default GraphComponent;