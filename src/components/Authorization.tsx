import SecurityContext from "../context/SecurityContext.ts";
import { useContext } from "react";

const Authorization = () => {
    const { loggedInUser, logout, login, isAuthenticated } = useContext(SecurityContext);

    if (isAuthenticated()) {
        return (
            <div className='z-10'>
                <div className="z-10 fixed flex gap-2 top-2 right-2 bg-white p-2 rounded-md shadow-md">
                    <p>User: {loggedInUser}</p>
                    <button
                        onClick={logout}
                        className="z-10 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all"
                    >
                        Logout
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <div className='z-10'>
                <button
                    onClick={login}
                    className="z-10 fixed top-0 right-0 mt-12 px-4 py-2 text-xl font-semibold rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105 active:scale-95 transition-transform"
                >
                    Login
                </button>
            </div>
        );
    }
};

export default Authorization;
