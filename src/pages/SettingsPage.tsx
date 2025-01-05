import { BackButton } from "../components/BackButton";
import { useNavigate } from "react-router-dom";
import {LoginButton} from "../components/LoginButton.tsx";


export function SettingsPage() {
    const navigate = useNavigate();

    //if loading: <NotificationCard
    //                 notification={{
    //                     title: 'Its Your Turn!!!',
    //                     description: 'Make Sure to make your move Right NOW!!!!',
    //                     type: NotificationType.Warning,
    //                 }}
    //                 loading={true}
    //                 />
    return (
        <div>
            <BackButton backAction={() => navigate('/')}/>
            <div className='z-20 absolute top-2 right-2'>
                <LoginButton/>
            </div>

        </div>
    )
}
