import { Notification } from "../../../models/Notification";
import { LoginButton } from "../../loginButton/LoginButton";


interface NotificationCardProps {
  loading: boolean;
  isLogin?: boolean;
  notification?: Notification;
}


export function NotificationCard({ loading, isLogin, notification }: NotificationCardProps) {
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-blue-100"></div>
            <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          </div>
          <span className="text-white font-bold text-3xl">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (!loading && notification) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/20">
        <div className={`${notification.type} border-black rounded-xl shadow-lg max-w-2xl mx-8 p-20`}>
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold text-white">{notification.type}: {notification.title}</h3>
            <p className="text-white text-lg mt-4">{notification.description}</p>
            {isLogin && (
              <div className='pt-10'>
                <LoginButton />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg p-4">
      {/* Default content when not loading and no error */}
      <p className="text-gray-600">No data to display</p>
    </div>
  );
}