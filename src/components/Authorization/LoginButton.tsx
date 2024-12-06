import SecurityContext from "../../context/SecurityContext.ts";
import { useContext } from "react";

export function LoginButton() {
    const { loggedInUser, logout, login, isAuthenticated } = useContext(SecurityContext);

    if (isAuthenticated()) {
        return (
            <button
                onClick={logout}
                className=""
            >
                <p>User: {loggedInUser}</p>
                <div className=''>
                    Logout
                </div>
            </button>
        );
    } else {
        return (
            <button
                onClick={login}
                className='bg-neutral-900/60 backdrop-blur px-10 py-6 rounded-3xl shadow-md hover:scale-105 transition-all duration-100'
            >
                <div className='text-xl text-white font-bold'>
                    Login
                </div>
            </button>
        );
    }
};
