import SecurityContext from "../../context/SecurityContext.ts";
import { useContext } from "react";

const Authorization = () => {
    const { loggedInUser, logout, login, isAuthenticated } = useContext(SecurityContext);

    if (isAuthenticated()) {
        return (
            <div>
                <div className="fixed flex gap-2 top-2 right-2 bg-white p-2 rounded-md shadow-md">
                    <p>User: {loggedInUser}</p>
                    <button
                        onClick={logout}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all"
                    >
                        Logout
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <button
                    onClick={login}
                    className="fixed top-2 right-2 mt-12 px-4 py-2 text-xl font-semibold rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105 active:scale-95 transition-transform"
                >
                    Login
                </button>
            </div>
        );
    }
};

export default Authorization;
